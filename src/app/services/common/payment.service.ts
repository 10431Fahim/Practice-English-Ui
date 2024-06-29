import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from "../../interfaces/core/response-payload.interface";

const API_URL = environment.apiBaseLink + '/api/payment/';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // Inject
  private readonly httpClient = inject(HttpClient);


  /**
   * Aamarpay Payment
   * createAamarpayPayment()
   * createAamarpayPaymentProduct()
   */

  createAamarpayPayment(data: any) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'create-aamarpay-payment', data);
  }

  createAamarpayPaymentProduct(data: any) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'create-aamarpay-payment-product', data);
  }

}
