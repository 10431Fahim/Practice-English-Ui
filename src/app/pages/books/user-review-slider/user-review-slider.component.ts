import { Component } from '@angular/core';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';

@Component({
  selector: 'app-user-review-slider',
  templateUrl: './user-review-slider.component.html',
  styleUrls: ['./user-review-slider.component.scss'],
})
export class UserReviewSliderComponent {
  constructor(private carouselControl: CarouselCntrlService) {}
}
