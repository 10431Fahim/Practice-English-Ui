import { Component } from '@angular/core';
import {ReloadService} from "../../../services/core/reload.service";

@Component({
  selector: 'app-learn-book',
  templateUrl: './learn-book.component.html',
  styleUrls: ['./learn-book.component.scss']
})
export class LearnBookComponent {
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
