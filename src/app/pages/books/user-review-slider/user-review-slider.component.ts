import { Component } from '@angular/core';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';

@Component({
  selector: 'app-user-review-slider',
  templateUrl: './user-review-slider.component.html',
  styleUrls: ['./user-review-slider.component.scss'],
})
export class UserReviewSliderComponent {
  allReview=[
    {
    image: '/assets/images/temp/png/review01.png',
    url: '/assets/images/temp/png/Mamuns-Review-Video-1.mp4',
   },
    {
      image: '/assets/images/temp/png/2.jpg',
      url: 'https://www.youtube.com/embed/MPSPOhe5i_g',
    },
    {
      image: '/assets/images/temp/png/7.jpg',
      url: 'https://www.youtube.com/embed/vZhmqV5F1Ug',
    },
    {
      image: '/assets/images/temp/png/8.jpg',
      url: 'https://www.youtube.com/embed/MPSPOhe5i_g',
    },
    {
      image: '/assets/images/temp/png/432709748_2054128484961314_7480521898118707638_n.jpg',
      url: 'https://www.youtube.com/embed/MPSPOhe5i_g',
    },
  ]
  constructor(private carouselControl: CarouselCntrlService) {}
}
