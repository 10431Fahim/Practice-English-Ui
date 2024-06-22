import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgCtrlPipe } from '../../pipes/img-ctrl.pipe';
import { PipesModule } from '../../pipes/pipes.module';
import { HeaderSecondComponent } from './header-second.component';

@NgModule({
  declarations: [HeaderSecondComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    ImgCtrlPipe,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  exports: [HeaderSecondComponent],
})
export class HeaderSecondModule {}
