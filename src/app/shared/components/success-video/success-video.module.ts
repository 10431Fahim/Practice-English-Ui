import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuccessVideoComponent } from './success-video.component';



@NgModule({
  declarations: [
    SuccessVideoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SuccessVideoComponent
  ]
})
export class SuccessVideoModule { }
