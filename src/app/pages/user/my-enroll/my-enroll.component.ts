import {Component, inject, OnInit} from '@angular/core';
import {Order} from '../../../interfaces/common/order.interface';
import {FilterData} from '../../../interfaces/core/filter-data.interface';
import {OrderService} from '../../../services/common/order.service';
import {UiService} from '../../../services/core/ui.service';
import {UtilsService} from '../../../services/core/utils.service';
import {faAngleRight, faFilePdf, faPlay, faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import {Course} from "../../../interfaces/common/course.interface";
import {CourseService} from "../../../services/common/course.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-enroll',
  templateUrl: './my-enroll.component.html',
  styleUrls: ['./my-enroll.component.scss'],
})
export class MyEnrollComponent implements OnInit {
  // Font Awesome Icon
  faAngleRight = faAngleRight;
  faVideoCamera = faVideoCamera;
  faFilePdf = faFilePdf;
  faPlay = faPlay;


  // Store Data
  course: any;
  // transformedData: any[] = [];
  selectedType: string;
  selectedVideo: string;
  selectedAttachment: string;
  // id: string | any;
  expendedIndex: number = 0;

  // Store Data
  private filter: any;
  orders: any[] = [];

  // Loader
  loader: boolean = false;

  videoStart: boolean = false;
  transformedData: any[] = [];
  courseModules: any[] = [];

  // Subscriptions
  private subGetData1: Subscription;
  private subGetData2: Subscription;

  // Inject
  private readonly orderService = inject(OrderService);
  private readonly utilsService = inject(UtilsService);
  private readonly uiService = inject(UiService);
  private readonly courseService = inject(CourseService);
  ngOnInit() {
    // Base Data
    this.getAllOrdersByUser();

    // this.transformBenefitToArray();
  }

  /**
   * HTTP REQ HANDLE
   * getAllOrdersByUser()
   * filterOrderList()
   * checkExpireDay()
   * onCopyCode()
   * onPostName()
   */

  private getAllOrdersByUser() {
    this.loader = true;

    const mSelect = {
      orderItem: 1,
      orderType: 1,
      orderStatus: 1,
      expiredIn: 1,
      liveCourseCode: 1,
      specifications: 1,
      liveGroupLink: 1,
    };
    const filterData: FilterData = {
      filter: {
        ...this.filter,
        ...{orderStatus: 'Delivered'},
      },
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1},
    };
    this.orderService.getAllOrdersByUser(filterData).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.getCourseForPreviewByUser(this.orders[0]?.orderItem?._id);
        this.loader = false;
        // console.log('this.orders',this.orders[0]?.orderItem?._id);
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
    });
  }


  private getCourseForPreviewByUser(id: string) {
    console.log('this.id',id)
    const select = 'courseModules';
    this.subGetData2 = this.courseService
      .getCourseForPreviewByUser(id, select)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.course = res.data;
            // console.log('this.course',this.course)
            this.transformBenefitToArray();
          //   this.transformedData = this.course?.courseModules.map(item => ({
          //     ...item,
          //     // benefit: item.benefit.split(',').map(benefit => benefit.trim()),
          //     videoDuration: item.videoDuration.split(','),
          //     videoTitle: item.videoTitle.split(','),
          //     videoUrl: item.videoUrl.split(',')
          //   }));
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
      this.courseModules = finalModules;
      console.log(' this.courseModules11', this.courseModules)
    }
    // this.transformedData = this.data?.courseModules.map(item => ({
    //   ...item,
    //   benefit: item.benefit.split(',').map(benefit => benefit.trim()),
    //   videoDuration: item.videoDuration.split(','),
    //   videoTitle: item.videoTitle.split(','),
    //   videoUrl: item.videoUrl.split(',')
    // }));
  }

  checkExpireDay(expiredIn: any) {
    if (!expiredIn) {
      return null;
    }
    return this.utilsService.getDateDifference(
      new Date(expiredIn),
      new Date(),
      'days'
    );
  }

  onCopyCode(event: any) {
    event.stopPropagation();
    this.uiService.success('Code copied.');
  }


}
