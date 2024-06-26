import {Component, Input} from '@angular/core';
import {ReloadService} from "../../../../services/core/reload.service";

@Component({
  selector: 'app-home-course-step',
  templateUrl: './home-course-step.component.html',
  styleUrls: ['./home-course-step.component.scss']
})
export class HomeCourseStepComponent {
  selectedMenu = 0;

  constructor(
    private reloadService: ReloadService,
  ) {
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
