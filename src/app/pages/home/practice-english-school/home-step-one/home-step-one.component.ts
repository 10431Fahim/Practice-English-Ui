import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReloadService} from "../../../../services/core/reload.service";
import {
  YoutubeVideoShowComponent
} from "../../../../shared/dialog-view/youtube-video-show/youtube-video-show.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-step-one',
  templateUrl: './home-step-one.component.html',
  styleUrls: ['./home-step-one.component.scss']
})
export class HomeStepOneComponent implements OnInit, OnChanges {

  selectedMenu = 0;
  selectedVideo:any;
  // moduleBenefitArray: any;
  @Input() data: any;
  // Store Data
  videoStart: boolean = false;
  transformedData: any[] = [];
  courseModules: any[] = [];

  constructor(
    private reloadService: ReloadService,
    private router: Router,
    private dialog: MatDialog,

  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.transformBenefitToArray();
    // // const str: any = this.data?.courseModules;
    // // let arrayData = str?.split(",");
    // // this.moduleBenefitArray = arrayData;
    // console.log('this.moduleBenefitArray',this.data)
  }

  transformBenefitToArray() {
    const finalModules = [];
    if (this.data) {
      this.data.courseModules.forEach(item => {
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

    }
    // this.transformedData = this.data?.courseModules.map(item => ({
    //   ...item,
    //   benefit: item.benefit.split(',').map(benefit => benefit.trim()),
    //   videoDuration: item.videoDuration.split(','),
    //   videoTitle: item.videoTitle.split(','),
    //   videoUrl: item.videoUrl.split(',')
    // }));
  }


  public onScrollWithNavigate(type: string) {
    switch (true) {
      case type === "feature":
        this.selectedMenu = 1;
        this.reloadService.needRefreshFeature$(true);
        break;
      default:
        this.selectedMenu = 0;
    }
  }

  getBenefitArr(data: string) {
    if (data) {
      return data.trim().split(',')
    } else {
      return [];
    }
  }


  /**
   * onVideoStart()
   */
  onVideoStart(data) {
    this.selectedVideo = data;
    this.videoStart = true;
  }


  /**
   * DIALOG VIEW COMPONENT
   * openYoutubeVideoDialog()
   * getDiscountCourses()
   */
  public openYoutubeVideoDialog(event: MouseEvent, url: string) {
    event.stopPropagation();
      const dialogRef = this.dialog.open(YoutubeVideoShowComponent, {
        data: {url: url},
        panelClass: ['theme-dialog', 'no-padding-dialog'],
        width: '98%',
        maxWidth: '700px',
        height: 'auto',
        maxHeight: '100vh',
        autoFocus: false,
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult && dialogResult.data) {
        }
      });
  }

}
