import { Component } from '@angular/core';

@Component({
  selector: 'app-home-course-content',
  templateUrl: './home-course-content.component.html',
  styleUrls: ['./home-course-content.component.scss'],
})
export class HomeCourseContentComponent {
  // dropdown toggle
  isToggleActive: number = 1;

  // dropdown toggle method
  onToggleActive(num: number) {
    this.isToggleActive = num;
  }
}
