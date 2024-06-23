import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgParticlesModule } from 'ng-particles';
import { SuccessVideoModule } from 'src/app/shared/components/success-video/success-video.module';
import { UpcomingDialogModule } from 'src/app/shared/dialog-view/upcoming-dialog/upcoming-dialog.module';
import { ProductCardOneModule } from 'src/app/shared/lazy-components/product-card-one/product-card-one.module';
import { ProductCardTwoModule } from 'src/app/shared/lazy-components/product-card-two/product-card-two.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SwiperModule } from 'swiper/angular';
import { CourseCardModule } from '../../shared/lazy-components/course-card/course-card.module';
import { BatchCardLoaderModule } from '../../shared/loader/batch-card-loader/batch-card-loader.module';
import { CarouselLoaderModule } from '../../shared/loader/carousel-loader/carousel-loader.module';
import { ImgCtrlPipe } from '../../shared/pipes/img-ctrl.pipe';
import { BannerComponent } from './banner/banner.component';
import { BatchComponent } from './batch/batch.component';
import { CommunityAreaComponent } from './community-area/community-area.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DeshSheraCoursesComponent } from './desh-shera-courses/desh-shera-courses.component';
import { FeaturedCategoryComponent } from './featured-category/featured-category.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { JoinOurTeamComponent } from './join-our-team/join-our-team.component';
import { LectureShitComponent } from './lecture-shit/lecture-shit.component';
import { LiveCourseComponent } from './live-course/live-course.component';
import { HomeBannerComponent } from './practice-english-school/home-banner/home-banner.component';
import { HomeCourseContentComponent } from './practice-english-school/home-course-content/home-course-content.component';
import { HomeCourseStepComponent } from './practice-english-school/home-course-step/home-course-step.component';
import { HomeMembershipComponent } from './practice-english-school/home-membership/home-membership.component';
import { HomeStepOneComponent } from './practice-english-school/home-step-one/home-step-one.component';
import { HomeZeroToSuccessComponent } from './practice-english-school/home-zero-to-success/home-zero-to-success.component';
import { SscHscCourseComponent } from './ssc-hsc-course/ssc-hsc-course.component';
import { HomeRightDecisionComponent } from './practice-english-school/home-right-decision/home-right-decision.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SscHscCourseComponent,
    FeaturedCategoryComponent,
    LiveCourseComponent,
    DeshSheraCoursesComponent,
    LectureShitComponent,
    JoinOurTeamComponent,
    CommunityAreaComponent,
    ContactUsComponent,
    BatchComponent,
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
    ProductCardOneModule,
    SwiperModule,
    NgParticlesModule,
    ProductCardTwoModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselLoaderModule,
    CourseCardModule,
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
