import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CourseService} from '../../../services/common/course.service';
import {UiService} from '../../../services/core/ui.service';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-playlist-view',
  templateUrl: './course-playlist-view.component.html',
  styleUrls: ['./course-playlist-view.component.scss'],
})
export class CoursePlaylistViewComponent implements OnInit {
  // Font Awesome Icon
  faAngleRight = faAngleRight;

  // Store Data
  course: any;
  transformedData: any[] = [];
  selectedType: string;
  selectedVideo: string;
  selectedAttachment: string;
  id: string | any;
  stepId: string | any;
  expendedIndex: number = 0;

  // Subscriptions
  private subGetData1: Subscription;
  private subGetData2: Subscription;
  private subQparamOne: Subscription;
  courseModules: any;
  // Inject
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly uiService = inject(UiService);

  ngOnInit() {
    this.subQparamOne = this.activatedRoute.queryParams.subscribe(qParam => {
      this.stepId = qParam['step'];
    });

    this.subGetData1 = this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
        if (this.id) {
          this.getCourseForPreviewByUser(this.id);
        }
      },
    });
  }

  /**
   * HTTP REQUEST HANDLE
   * getCourseForPreviewByUser()
   */
  private getCourseForPreviewByUser(id: string) {
    const select = 'courseModules';
    this.subGetData2 = this.courseService
      .getCourseForPreviewByUser(id, select)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.course = res.data;
            this.transformBenefitToArray();
            this.transformedData = this.course?.courseModules.map(item => ({
              ...item,
              // benefit: item.benefit.split(',').map(benefit => benefit.trim()),
              videoDuration: item.videoDuration.split(','),
              videoTitle: item.videoTitle.split(','),
              videoUrl: item.videoUrl.split(',')
            }));
            console.log('transformedData', this.transformedData)
            if (this.course?.orderType === 'video-course') {
              this.selectedType = 'video-course';
              this.selectedVideo = this.transformedData[0].videoUrl[0];

            } else if (this.course?.orderType === 'lecture-sheet') {
              this.selectedType = 'lecture-sheet';
              this.selectedAttachment = this.course.courseModules[0].attachment;
            }
          } else {
            this.uiService.wrong(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // transformBenefitToArray() {
  //   this.transformedData = this.course?.courseModules.map(item => ({
  //     ...item,
  //     benefit: item.benefit.split(',').map(benefit => benefit.trim()),
  //     videoDurationArray: item.videoDuration.split(','),
  //     videoTitleArray: item.videoTitle.split(','),
  //     videoUrlArray: item.videoUrl.split(',')
  //   }));
  //
  // }


  transformBenefitToArray() {
    const finalModules = [];
    if (this.course) {
      console.log('this.course',this.course)
      this.course.courseModules.forEach(item => {
        const fIndex = finalModules.findIndex(f => f.step._id === item.step._id);
        const videoTitleArr = item.videoTitle.trim().split(',');
        const videoUrlArr = item.videoUrl.trim().split(',');
        const isFreeVideo = item.isFreeVideo ? item.isFreeVideo.trim().split(',') : [];
        const videoDurationArr = item.videoDuration.trim().split(',');
        if (fIndex === -1) {
          const g = {
            step: item.step,
            contents: [
              {
                _id: item._id,
                name: item.name,
                modules: videoTitleArr.map((m, i) => {
                  return {
                    type: 'video',
                    videoTitle: m,
                    videoUrl: videoUrlArr[i],
                    isFreeVideo: isFreeVideo[i],
                    videoDuration: videoDurationArr[i],
                  }
                })
              }
            ]
          }
          if (item.isFreePdf) {
            g.contents[0].modules.push({
              type: 'attachment',
              videoTitle: null,
              videoUrl: null,
              isFreeVideo: null,
              videoDuration: null,
              attachment: item.attachment,
              attachmentTitle: item.attachmentTitle,
            })
          }
          finalModules.push(g);
        } else {
          const mContent =  {
            _id: item._id,
            name: item.name,
            modules: videoTitleArr.map((m, i) => {
              return {
                type: 'video',
                videoTitle: m,
                videoUrl: videoUrlArr[i],
                isFreeVideo: isFreeVideo[i],
                videoDuration: videoDurationArr[i],
              }
            })
          }

          if (item.isFreePdf) {
            mContent.modules.push({
              type: 'attachment',
              videoTitle: null,
              videoUrl: null,
              isFreeVideo: null,
              videoDuration: null,
              attachment: item.attachment,
              attachmentTitle: item.attachmentTitle,
            })
          }

          finalModules[fIndex].contents.push(mContent);
        }
      })
      this.courseModules = finalModules.find(f=> f.step?._id === this.stepId);

      console.log(' this.courseModules44', this.courseModules)
    }
    // this.transformedData = this.data?.courseModules.map(item => ({
    //   ...item,
    //   benefit: item.benefit.split(',').map(benefit => benefit.trim()),
    //   videoDuration: item.videoDuration.split(','),
    //   videoTitle: item.videoTitle.split(','),
    //   videoUrl: item.videoUrl.split(',')
    // }));
  }

  /**
   * ON CHANGE VIDEO
   * onChangeVideo()
   * onChangeAttachment()
   * onOpenPanel()
   */
  onChangeVideo(url: string) {
    this.selectedType = 'video-course';
    this.selectedVideo = url;
  }

  onChangeAttachment(url: string) {
    this.selectedType = 'lecture-sheet';
    this.selectedAttachment = url;
  }

  onOpenPanel(event: any, index: number) {
    this.expendedIndex = index;
  }

  /**
   * Download pdf functionality
   * onDownloadPdf()
   */
  async onDownloadPdf(url: string) {
    // const data = await fetch(url);
    const data = await fetch(url,{
      method: 'GET',
      headers: {
        'accept': 'application/blob'
      }
    })
    const blob = await data.blob();
    // console.log('blob',data)
    const objectUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', objectUrl)
    link.download = `Tee-${Date.now()}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  }
  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subGetData1) {
      this.subGetData1.unsubscribe();
    }
    if (this.subGetData2) {
      this.subGetData2.unsubscribe();
    }
  }
}
