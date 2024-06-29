import { NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';

import { IMAGE_CONFIG, provideImgixLoader } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SwiperModule } from 'swiper/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthUserInterceptor } from './auth-interceptor/auth-user.interceptor';
import { PagesComponent } from './pages/pages.component';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderSecondModule } from './shared/components/header-second/header-second.module';

@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderSecondModule,
    FooterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SwiperModule,
    DigitOnlyModule,
    MatSnackBarModule,
  ],
  providers: [
    Title,
    Meta,
    { provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true },
    provideImgixLoader(environment.ftpPrefixPath),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
