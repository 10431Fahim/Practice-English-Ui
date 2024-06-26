import {Component, ViewChild} from '@angular/core';
import {ShippingChargeService} from "../../../services/common/shipping-charge.service";
import {UiService} from "../../../services/core/ui.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/common/user.service";
import {ReloadService} from "../../../services/core/reload.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderStatus} from "../../../enum/order.enum";
import {UtilsService} from "../../../services/core/utils.service";
import {Subscription} from "rxjs";
import {ProductOrderService} from "../../../services/common/product-order.service";
import {ConfirmOrderComponent} from "./confirm-order/confirm-order.component";

@Component({
  selector: 'app-book-confirm-order',
  templateUrl: './book-confirm-order.component.html',
  styleUrls: ['./book-confirm-order.component.scss']
})
export class BookConfirmOrderComponent {
  @ViewChild('confirm') confirm: ConfirmOrderComponent;
  selectedQty: number = 1;
  //Form Group
  formData!: FormGroup;
  selectedPaymentMethod: string = 'cash_on_delivery';
  private subDataFour: Subscription;


  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private orderService: ProductOrderService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    private userService: UserService,
    private shippingChargeService: ShippingChargeService,
    private uiService: UiService,
  ) { }

  ngOnInit() {
    //Base Data
    this.initForm()
  }

  /**
   * FORM CONTROLL METHODS
   * initForm()
   * onSubmit()
   * onShow()
   */
  initForm() {
    this.formData = this.fb.group({
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
      address: [null],
      paymentMethod: ['cash_on_delivery', Validators.required],
      deliveryOptions: ['1', Validators.required],
    })
  }
  onIncrementQtySimple(event?: MouseEvent, url?: string) {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedQty === 6) {
      this.uiService.warn('Maximum quantity are 6');
      return;
    }
    this.selectedQty += 1;
  }

  onDecrementQtySimple(event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedQty === 1) {
      this.uiService.warn('Minimum quantity is 1');
      return;
    }
    this.selectedQty -= 1;
  }


  public onConfirmOrder() {
    if (this.formData.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.formData.value.phoneNo) {
      this.uiService.warn('Please enter phone')
      return;
    }

    // Product Info
    const products = {
      _id: "65d39dbd518b059441073c97",
      name: 'Practice English',
      image: null,
      category: null,
      subCategory: null,
      // discountType: (m.product as Product).discountType,
      // discountAmount: (m.product as Product).discountAmount,
      regularPrice: 500,
      unitPrice: 500,
      salePrice: 500,
      quantity: this.selectedQty,
      orderType: 'regular',
    } as any;

    const orderData: any = {
      name: this.formData.value.name,
      phoneNo: this.formData.value.phoneNo,
      shippingAddress: this.formData.value.address,
      city: this.formData.value?.city,
      paymentType: this.formData.value.paymentMethod,
      country: this.formData.value.country,
      paymentStatus: 'unpaid',
      orderStatus: OrderStatus.PENDING,
      orderedItems: products,
      subTotal: 500 * this.selectedQty,
      deliveryCharge: 90,
      discount: 0,
      totalSave: 0,
      grandTotal: (500 * this.selectedQty) + 90,
      discountTypes: null,
      checkoutDate: this.utilsService.getDateString(new Date()),
      hasOrderTimeline: true,
      orderTimeline: {
        pending: {
          success: true,
          date:
            new Date(),

          expectedDate: new Date(),
        },
        confirmed: {
          success:
            this.formData?.value?.orderStatus === OrderStatus?.CONFIRM,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.CONFIRM
              ? new Date()
              : null,
          expectedDate: null,
        },
        processed: {
          success:
            this.formData?.value?.orderStatus === OrderStatus?.PROCESSING,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.PROCESSING
              ? new Date()
              : null,
          expectedDate: this.formData?.value?.processingDate,
        },
        shipped: {
          success:
            this.formData?.value?.orderStatus === OrderStatus?.SHIPPING,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.SHIPPING
              ? new Date()
              : null,
          expectedDate: this.formData?.value?.shippingDate,
        },
        delivered: {
          success:
            this.formData?.value?.orderStatus === OrderStatus?.DELIVERED,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.DELIVERED
              ? new Date()
              : null,
          expectedDate: this.formData?.value?.deliveringDate,
        },
        canceled: {
          success: this.formData?.value?.orderStatus === OrderStatus?.CANCEL,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.CANCEL
              ? new Date()
              : null,
          expectedDate: null,
        },
        refunded: {
          success: this.formData?.value?.orderStatus === OrderStatus?.REFUND,
          date:
            this.formData?.value?.orderStatus === OrderStatus?.REFUND
              ? new Date()
              : null,
          expectedDate: null,
        },
      },
    }
    console.log('orderData', orderData)

    if (this.selectedQty > 0) {
      this.addOrder(orderData);
    } else {
      this.uiService.warn('Please product add to cart then order ');
    }
  }

  private addOrder(data: any) {
    this.subDataFour = this.orderService.addOrder(data).subscribe({
      next: (res => {
        switch (this.selectedPaymentMethod) {
          case 'online_payment': {
            this.sslInitWithOrder(res.data.orderId, res.data._id);
            break;
          }
          case 'cash_on_delivery': {
            if (res.success) {
              this.uiService.success(res.message);
              this.reloadService.needRefreshCart$(false);
              this.onShow(res.data.orderId);
            } else {
              this.uiService.warn(res.message);
            }
            break;
          }
        }

      }),
      error: (error => {
        console.log(error);
      })
    })
  }

  /**
   * CONFIRMATION POPUP
   */
  onShow(orderId) {
    if (orderId) {
      this.confirm.onShowPop(orderId);
    }
  }
  /**
   * PAYMENT API
   * sslInitWithOrder()
   * updateOrderSessionKey
   */
  private sslInitWithOrder(orderId: string, _id: string) {
    // const baseHost = this.utilsService.getHostBaseUrl();
    // const sslPaymentInit: SslInit = {
    //   store_id: null,
    //   store_passwd: null,
    //   total_amount: this.grandTotal,
    //   currency: this.currency,
    //   tran_id: orderId,
    //   success_url: baseHost + '/callback/payment/success',
    //   fail_url: baseHost + '/callback/payment/fail',
    //   cancel_url: baseHost + '/callback/payment/cancel',
    //   ipn_url: environment.sslIpnUrl,
    //   shipping_method: 'Courier',
    //   product_name: 'default product',
    //   product_category: 'default category',
    //   product_profile: 'general',
    //   cus_name: this.formData?.value?.name ? this.formData?.value?.name : 'Unknown',
    //   cus_email: this.user?.email ? this.user?.email : 'guardianpubs@gmail.com',
    //   cus_add1: this.formData?.value?.address ?? 'Dhaka',
    //   cus_add2: '',
    //   cus_city: this.selectDivisionData?.name ?? 'Dhaka',
    //   cus_state: '',
    //   cus_postcode: this.selectAreaData?.name ?? 'Dhaka',
    //   cus_country: 'Bangladesh',
    //   cus_phone: this.formData.value?.phoneNo ?? '01700000000',
    //   cus_fax: '',
    //   ship_name: this.formData?.value?.name ? this.formData?.value?.name : 'Unknown',
    //   ship_add1: this.formData?.value?.address ?? 'Dhaka',
    //   ship_add2: '',
    //   ship_city: this.selectDivisionData?.name ?? 'Dhaka',
    //   ship_state: '',
    //   ship_postcode: this.selectAreaData?.name ?? 'Dhaka',
    //   ship_country: 'Bangladesh',
    // };
    //
    // // console.log('sslPaymentInit',sslPaymentInit);
    //
    // this.paymentService.initSslPayment(sslPaymentInit)
    //   .subscribe({
    //     next: res => {
    //       console.log('res', res)
    //       if (res.success) {
    //         const sslInitResponse: SslInitResponse = res.data;
    //         const sslSessionId = sslInitResponse.sessionkey;
    //         this.updateOrderSessionKey(_id, {sslSessionId: sslSessionId}, sslInitResponse.GatewayPageURL)
    //       } else {
    //         this.orderBtnTxt = 'Complete Order';
    //         this.uiService.warn('Something went wrong! Please try again.')
    //       }
    //
    //     }, error: error => {
    //       console.log(error);
    //     }
    //   });
  }


  private updateOrderSessionKey(_id: string, data: object, url: string) {
    // this.subDataSix = this.orderService.updateOrderSessionKey(_id, data)
    //   .subscribe({
    //     next: res => {
    //       this.orderBtnTxt = 'Complete Order';
    //       if (res.success) {
    //         this.document.location.href = url;
    //       } else {
    //         this.uiService.warn(res.message);
    //       }
    //     },
    //     error: err => {
    //       console.log(err)
    //     }
    //   });
  }

}
