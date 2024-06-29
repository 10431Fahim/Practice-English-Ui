import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgParticlesModule } from 'ng-particles';
import { SuccessVideoModule } from 'src/app/shared/components/success-video/success-video.module';
import { UpcomingDialogModule } from 'src/app/shared/dialog-view/upcoming-dialog/upcoming-dialog.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SwiperModule } from 'swiper/angular';
import { BatchCardLoaderModule } from '../../shared/loader/batch-card-loader/batch-card-loader.module';
import { CarouselLoaderModule } from '../../shared/loader/carousel-loader/carousel-loader.module';
import { ImgCtrlPipe } from '../../shared/pipes/img-ctrl.pipe';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeBannerComponent } from './practice-english-school/home-banner/home-banner.component';
import { HomeCourseContentComponent } from './practice-english-school/home-course-content/home-course-content.component';
import { HomeCourseStepComponent } from './practice-english-school/home-course-step/home-course-step.component';
import { HomeMembershipComponent } from './practice-english-school/home-membership/home-membership.component';
import { HomeStepOneComponent } from './practice-english-school/home-step-one/home-step-one.component';
import { HomeZeroToSuccessComponent } from './practice-english-school/home-zero-to-success/home-zero-to-success.component';
import { HomeRightDecisionComponent } from './practice-english-school/home-right-decision/home-right-decision.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeStepOneComponent,
    HomeCourseContentComponent,
    HomeCourseStepComponent,
    HomeMembershipComponent,
    HomeZeroToSuccessComponent,
    HomeRightDecisionComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    NgParticlesModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselLoaderModule,
    BatchCardLoaderModule,
    UpcomingDialogModule,
    NgOptimizedImage,
    ImgCtrlPipe,
    FontAwesomeModule,
    MatMenuModule,
    SuccessVideoModule,
  ],
})
export class HomeModule {}
