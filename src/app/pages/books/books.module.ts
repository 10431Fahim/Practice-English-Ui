import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuccessVideoModule } from 'src/app/shared/components/success-video/success-video.module';
import { SwiperModule } from 'swiper/angular';
import { BooksBannerComponent } from './books-banner/books-banner.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { GrantedBookComponent } from './granted-book/granted-book.component';
import { LearnBookComponent } from './learn-book/learn-book.component';
import { UserReviewSliderComponent } from './user-review-slider/user-review-slider.component';
import { BookConfirmOrderComponent } from './book-confirm-order/book-confirm-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmOrderComponent} from "./book-confirm-order/confirm-order/confirm-order.component";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [
    BooksComponent,
    BooksBannerComponent,
    GrantedBookComponent,
    LearnBookComponent,
    UserReviewSliderComponent,
    BookConfirmOrderComponent,
    ConfirmOrderComponent
  ],
    imports: [CommonModule, BooksRoutingModule, SwiperModule, SuccessVideoModule, ReactiveFormsModule, FormsModule, DigitOnlyModule,MaterialModule],
})
export class BooksModule {}
