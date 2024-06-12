import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    FontAwesomeModule
  ],
  exports:[
    FooterComponent
  ]
})
export class FooterModule { }
