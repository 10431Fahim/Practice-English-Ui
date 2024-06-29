import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberMinDigitPipe} from './number-min-digit.pipe';
import {PricePipe} from './price.pipe';
import {SafeHtmlCustomPipe} from './safe-html.pipe';
import {SafeUrlPipe} from "./safe-url.pipe";


@NgModule({
  declarations: [
    NumberMinDigitPipe,
    PricePipe,
    SafeHtmlCustomPipe,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberMinDigitPipe,
    PricePipe,
    SafeHtmlCustomPipe,
    SafeUrlPipe,
  ]
})
export class PipesModule {
}
