import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentStatusRoutingModule} from './payment-status-routing.module';
import {PaymentStatusComponent} from './payment-status.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {PaymentFailComponent} from './payment-fail/payment-fail.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductPaymentSuccessComponent } from './product-payment-success/product-payment-success.component';
import {ProductPaymentFailComponent} from './product-payment-fail/product-payment-fail.component';


@NgModule({
  declarations: [
    PaymentStatusComponent,
    PaymentSuccessComponent,
    PaymentFailComponent,
    ProductPaymentSuccessComponent,
    ProductPaymentFailComponent
  ],
  imports: [
    CommonModule,
    PaymentStatusRoutingModule,
    FontAwesomeModule
  ]
})
export class PaymentStatusModule {
}
