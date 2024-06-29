import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentStatusComponent} from './payment-status.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {PaymentFailComponent} from './payment-fail/payment-fail.component';
import {ProductPaymentSuccessComponent} from "./product-payment-success/product-payment-success.component";
import {ProductPaymentFailComponent} from './product-payment-fail/product-payment-fail.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentStatusComponent,
    children: [
      {path: '', redirectTo: 'success', pathMatch: 'full'},
      {path: 'success', component: PaymentSuccessComponent},
      {path: 'fail', component: PaymentFailComponent},
      {path: 'product-payment-success', component: ProductPaymentSuccessComponent},
      {path: 'product-payment-fail', component: ProductPaymentFailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentStatusRoutingModule { }
