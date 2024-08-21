import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  moduleTracker: any;
  transformedData: any[] = [];
  selectedType: string;
  selectedVideo: string;
  selectedAttachment: string;
  id: string | any;
  stepId: string | any;
  expendedIndex: number = 0;
  currentIndex: number = 0;

  // Subscriptions
  private subGetData1: Subscription;
  private subGetData2: Subscription;
  private subQparamOne: Subscription;
  courseModules: any;
  // Inject
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly uiService = inject(UiService);
  private readonly router = inject(Router);

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
            this.moduleTracker = res.tracker;
            this.currentIndex = res.tracker.currentModuleIndex ?? 0;
            this.expendedIndex = res.tracker.currentModuleIndex ?? 0;
            this.transformBenefitToArray();
            //   this.transformedData = this.course?.courseModules.map(item => ({
            //     ...item,
            //     // benefit: item.benefit.split(',').map(benefit => benefit.trim()),
            //     videoDuration: item.videoDuration.split(','),
            //     videoTitle: item.videoTitle.split(','),
            //     videoUrl: item.videoUrl.split(',')
            //   }));
            //   console.log('transformedData', this.transformedData)
            //   if (this.course?.orderType === 'video-course') {
            //     this.selectedType = 'video-course';
            //     this.selectedVideo = this.transformedData[0].videoUrl[0];
            //
            //   } else if (this.course?.orderType === 'lecture-sheet') {
            //     this.selectedType = 'lecture-sheet';
            //     this.selectedAttachment = this.course.courseModules[0].attachment;
            //   }
            // } else {
            //   this.uiService.wrong(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private updateModuleTracker(data: any) {
    this.courseService.updateModuleTracker(data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            function pushUniqueValue(arr, value) {
              if (!arr.includes(value)) {
                arr.push(value);
              }
            }

            const fIndex = this.moduleTracker.module.findIndex(f => f.moduleId === data.moduleId)
            if (data.video) {
              pushUniqueValue( this.moduleTracker.module[fIndex].video, data.video);
            }
            if (data.isCompleteAttachment) {
              this.moduleTracker.module[fIndex].isCompleteAttachment = true;
            }

          }
        },
        error: (err) => {
          console.log(err);
        }
      })
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
                    length: videoTitleArr.length
                  }
                })
              }
            ]
          }

          g.contents[0].modules.push({
            type: 'attachment',
            videoTitle: null,
            videoUrl: null,
            isFreeVideo: null,
            videoDuration: null,
            attachment: item.attachment,
            attachmentTitle: item.attachmentTitle,
          })
          g.contents[0].modules.push({
            type: 'quiz',
            videoTitle: null,
            videoUrl: null,
            isFreeVideo: null,
            videoDuration: null,
            attachment: null,
            attachmentTitle: null,
            quiz: item.quiz,
          })
          finalModules.push(g);
        } else {
          const mContent = {
            _id: item._id,
            name: item.name,
            modules: videoTitleArr.map((m, i) => {
              return {
                type: 'video',
                videoTitle: m,
                videoUrl: videoUrlArr[i],
                isFreeVideo: isFreeVideo[i],
                videoDuration: videoDurationArr[i],
                length: videoTitleArr.length
              }
            })
          }

          mContent.modules.push({
            type: 'attachment',
            videoTitle: null,
            videoUrl: null,
            isFreeVideo: null,
            videoDuration: null,
            attachment: item.attachment,
            attachmentTitle: item.attachmentTitle,
          })

          mContent.modules.push({
            type: 'quiz',
            videoTitle: null,
            videoUrl: null,
            isFreeVideo: null,
            videoDuration: null,
            attachment: null,
            attachmentTitle: null,
            quiz: item.quiz,
          })

          finalModules[fIndex].contents.push(mContent);
        }
      })
      this.courseModules = finalModules.find(f => f.step?._id === this.stepId);

      console.log(' this.courseModules44', this.courseModules)
    }
  }

  /**
   * ON CHANGE VIDEO
   * onChangeVideo()
   * onChangeAttachment()
   * onOpenPanel()
   */
  onChangeVideo(url: string, moduleId: string, index: number, videoLength: number) {
    if (!this.isVideoComplete(moduleId, index)) {
      this.uiService.warn('Please complete previous item');
      return;
    }
    this.selectedType = 'video-course';
    this.selectedVideo = url;

    const fModule = this.courseModules?.contents.find(f => f._id === moduleId);
    const fAttachment = fModule.modules.find(f => f.type === 'attachment');

    let mData: any;
    if (fAttachment) {
      mData = {
        course: this.course._id,
        moduleId: moduleId,
        video: index,
      }
    } else {
      if (videoLength === (index + 1)) {
        mData = {
          course: this.course._id,
          moduleId: moduleId,
          video: index,
          isModuleComplete: true,
        }
      } else {
        mData = {
          course: this.course._id,
          moduleId: moduleId,
          video: index,
        }
      }

    }
    this.updateModuleTracker(mData);
  }

  onChangeAttachment(url: string, moduleId: string,) {

    if (!this.isAllVideoDone(moduleId)) {
      this.uiService.warn('Please complete previous item');
      return;
    }

    this.selectedType = 'lecture-sheet';
    this.selectedAttachment = url;

    const fModule = this.courseModules?.contents.find(f => f._id === moduleId);
    const fQuiz = fModule.modules.find(f => f.type === 'quiz');

    let mData: any;
    if (fQuiz) {
      mData = {
        course: this.course._id,
        moduleId: moduleId,
        isCompleteAttachment: true,
      }
    } else {
      mData = {
        course: this.course._id,
        moduleId: moduleId,
        isCompleteAttachment: true,
        isModuleComplete: true,
      }
    }
    this.updateModuleTracker(mData);
  }

  onClickQuiz(quizId: any, moduleId: string) {
    if (!this.isAttachmentDone(moduleId)) {
      this.uiService.warn('Please complete previous item');
      return;
    }

    this.router.navigate(['/', 'quiz', quizId], {queryParams: { course: this.course?._id, module:  moduleId, step: this.stepId}})
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
    const data = await fetch(url, {
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
   * LOGIC
   * isVideoComplete()
   */

  private isVideoComplete(moduleId: string, videoIndex: number) {

    if (this.currentIndex === this.expendedIndex && videoIndex === 0) {
      return true;
    }

    const fModule = this.moduleTracker.module.find(f => f.moduleId === moduleId);
    if (fModule?.video && fModule?.video.length) {
      const fIndex = fModule.video.findIndex(f => f === videoIndex - 1);
      if (fIndex === -1) {
        return false;
      } else {
        return true
      }
    } else {
      return false;
    }
  }

  isAllVideoDone(moduleId: string) {
    const fModule = this.courseModules?.contents.find(f => f._id === moduleId);
    const fVideo = fModule.modules.filter(f => f.type === 'video');
    const fModuleTrack = this.moduleTracker.module.find(f => f.moduleId === moduleId);

    if (fVideo.length === fModuleTrack?.video.length) {
      return true;
    } else {
      return false;
    }

  }

  isAttachmentDone(moduleId: string) {
    const fModule = this.courseModules?.contents.find(f => f._id === moduleId);
    const fModuleTrack = this.moduleTracker.module.find(f => f.moduleId === moduleId);
    if( fModuleTrack && fModuleTrack.isCompleteAttachment) {
      return true;
    } else {
      return false;
    }
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
