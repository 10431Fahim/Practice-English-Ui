import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReloadService} from "../../../../services/core/reload.service";

@Component({
  selector: 'app-home-step-one',
  templateUrl: './home-step-one.component.html',
  styleUrls: ['./home-step-one.component.scss']
})
export class HomeStepOneComponent implements OnInit, OnChanges {

  selectedMenu = 0;
  // moduleBenefitArray: any;
  @Input() data: any;

  transformedData: any[] = [];

  constructor(
    private reloadService: ReloadService,
    private router: Router,
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
    this.transformedData = this.data?.courseModules.map(item => ({
      ...item,
      benefit: item.benefit.split(',').map(benefit => benefit.trim()),
      videoDuration: item.videoDuration.split(','),
      videoTitle: item.videoTitle.split(','),
      videoUrl: item.videoUrl.split(',')
    }));
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
}
