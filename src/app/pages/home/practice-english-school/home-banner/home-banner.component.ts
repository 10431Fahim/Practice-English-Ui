import {Component, Input} from '@angular/core';
import {ReloadService} from "../../../../services/core/reload.service";

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent {
  selectedMenu = 0;
  // Store Data
  videoStart: boolean = false;

  @Input() data: any;

  constructor(
    private reloadService: ReloadService,
  ) {

  }

  /**
   * onVideoStart()
   */
  onVideoStart() {
    this.videoStart = true;
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
