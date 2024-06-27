import { Component } from '@angular/core';
import {ReloadService} from "../../../services/core/reload.service";

@Component({
  selector: 'app-granted-book',
  templateUrl: './granted-book.component.html',
  styleUrls: ['./granted-book.component.scss']
})
export class GrantedBookComponent {
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
