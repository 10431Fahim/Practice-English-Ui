import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-payment-fail',
  templateUrl: './product-payment-fail.component.html',
  styleUrls: ['./product-payment-fail.component.scss'],
})
export class ProductPaymentFailComponent implements OnInit {
  // Font Awesome Icon
  faExclamation = faExclamation;

  // Store Data
  message: string = null;

  // Inject
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // GET DATA FORM PARAM
    this.activatedRoute.queryParamMap.subscribe((qParam) => {
      this.message = qParam.get('message');
    });
  }
}
