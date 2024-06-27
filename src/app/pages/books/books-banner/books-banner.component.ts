import {Component, Input} from '@angular/core';
import {ReloadService} from "../../../services/core/reload.service";

@Component({
  selector: 'app-books-banner',
  templateUrl: './books-banner.component.html',
  styleUrls: ['./books-banner.component.scss']
})
export class BooksBannerComponent {
  selectedMenu = 0;
  // Store Data
  videoStart: boolean = false;

  constructor(
    private reloadService: ReloadService,
  ) {

  }
  public onScrollWithNavigate(type: string) {
    switch (true) {
      case type === "order":
        this.selectedMenu = 1;
        this.reloadService.needRefreshFeature$(true);
        break;
      default:
        this.selectedMenu = 0;
    }
  }
}
