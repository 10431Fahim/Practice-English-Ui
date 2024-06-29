import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-home-course-content',
  templateUrl: './home-course-content.component.html',
  styleUrls: ['./home-course-content.component.scss'],
})
export class HomeCourseContentComponent implements OnChanges{
  @Input() data:any;
  // dropdown toggle
  isToggleActive: number = 0;
  transformedData: any[] = [];
  // dropdown toggle method
  onToggleActive(num: number) {
    this.isToggleActive = num;
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


}
