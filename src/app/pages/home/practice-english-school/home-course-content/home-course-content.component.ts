import {Component, Input, OnChanges} from '@angular/core';
import {
  YoutubeVideoShowComponent
} from "../../../../shared/dialog-view/youtube-video-show/youtube-video-show.component";
import {MatDialog} from "@angular/material/dialog";
import {UiService} from "../../../../services/core/ui.service";

@Component({
  selector: 'app-home-course-content',
  templateUrl: './home-course-content.component.html',
  styleUrls: ['./home-course-content.component.scss'],
})
export class HomeCourseContentComponent implements OnChanges {
  @Input() data: any[];
  // dropdown toggle
  isToggleActive: number = 0;
  transformedData: any[] = [];


  constructor(
    private dialog: MatDialog,
    private uiService: UiService,
  ) {
  }

  // dropdown toggle method
  onToggleActive(num: number) {
    if(this.isToggleActive === num) {
      this.isToggleActive = null;
    } else {
      this.isToggleActive = num;
    }

  }


  ngOnChanges() {
    // this.transformBenefitToArray();
    // // const str: any = this.data?.courseModules;
    // // let arrayData = str?.split(",");
    // // this.moduleBenefitArray = arrayData;
    // console.log('this.moduleBenefitArray',this.data)
  }

  // transformBenefitToArray() {
  //   this.transformedData = this.data?.courseModules.map(item => ({
  //     ...item,
  //     benefit: item.benefit.split(',').map(benefit => benefit.trim()),
  //     videoDurationArray: item.videoDuration.split(','),
  //     videoTitleArray: item.videoTitle.split(','),
  //     videoUrlArray: item.videoUrl.split(',')
  //   }));
  //
  // }

  /**
   * DIALOG VIEW COMPONENT
   * openYoutubeVideoDialog()
   * getDiscountCourses()
   */
  public openYoutubeVideoDialog(event: MouseEvent, url: string,data:any) {
    event.stopPropagation();
    if(data == 'isFree'){
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
    }else{
      this.uiService.warn('Please enroll first');
    }
    }

}
