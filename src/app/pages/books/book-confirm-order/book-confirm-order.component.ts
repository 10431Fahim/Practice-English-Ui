import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {UiService} from "../../../services/core/ui.service";
import {ReloadService} from "../../../services/core/reload.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderStatus} from "../../../enum/order.enum";
import {UtilsService} from "../../../services/core/utils.service";
import {Subscription} from "rxjs";
import {ProductOrderService} from "../../../services/common/product-order.service";
import {ConfirmOrderComponent} from "./confirm-order/confirm-order.component";
import {PaymentMethod} from "../../../core/utils/app-data";
import {environment} from '../../../../environments/environment';
import {PaymentService} from '../../../services/common/payment.service';
import {DOCUMENT} from '@angular/common';
import {OtpService} from "../../../services/common/otp.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-confirm-order',
  templateUrl: './book-confirm-order.component.html',
  styleUrls: ['./book-confirm-order.component.scss']
})
export class BookConfirmOrderComponent {
  isLoading: boolean = false;
  otp: any;
  @ViewChild('confirm') confirm: ConfirmOrderComponent;
  selectedQty: number = 1;
  sentOtp: boolean | any = false;
  // Store Data
  isOtpSent: boolean = false;
  isOtpValid: boolean = false;
  countDown = 0;
  isCountDownEnd = false;
  timeInstance = null;
  // isLoading = false;
  public sendVerificationCode = false;
  //Form Group
  formData!: FormGroup;
  selectedPaymentMethod: string = 'cash_on_delivery';
  paymentMethods: any[] = PaymentMethod;
  private subDataFour: Subscription;
  @ViewChild('order') mainEl!: ElementRef;

  private readonly otpService = inject(OtpService);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  private subOtpGenerate: Subscription;
  private subOtpValidate: Subscription;

  constructor(
    private fb: FormBuilder,
    private orderService: ProductOrderService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    private uiService: UiService,
  ) {
  }

  ngOnInit() {
    this.reloadService.refreshFeature$.subscribe((res) => {
      if (res) {
        this.onScrollSection();
      }
    });
    //Base Data
    this.initForm()

    this.checkUrlForPaymentOpt();
  }

  private checkUrlForPaymentOpt() {
    if (this.router.url === '/bookpay') {
      this.selectedPaymentMethod = 'online_payment';
      this.paymentMethods = PaymentMethod.filter(f => f.id === '2');
    } else if (this.router.url === '/bookcash') {
      this.selectedPaymentMethod = 'cash_on_delivery';
      this.paymentMethods = PaymentMethod.filter(f => f.id === '1');
    }
  }


  /**
   * FORM CONTROLL METHODS
   * initForm()
   * onSubmit()
   * onShow()
   */
  initForm() {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(11)]],
      paymentMethod: [''],
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

  get name() {
    return this.formData.get('name');
  }

  get address() {
    return this.formData.get('address');
  }

  get phoneNo() {
    return this.formData.get('phoneNo');
  }


  /**
   * HTTP REQ HANDLE
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */

  public onConfirm() {
    if (this.formData.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.formData.value.phoneNo) {
      this.uiService.warn('Please enter phone')
      return;
    }

    if (this.selectedQty > 0) {
      this.generateOtpWithPhoneNo(this.formData?.value?.phoneNo)
    }
  }

  // CountDown...
  countTime(time?) {
    const count = (num) => () => {
      this.countDown = num;
      num = num === 0 ? 0 : num - 1;
      if (num <= 0) {
        clearInterval(this.timeInstance);
        this.countDown = 0;
        this.isCountDownEnd = true;
      }
    };
    this.timeInstance = setInterval(count(time), 1000);
  }


  generateOtpWithPhoneNo(phoneNo: string) {
    this.sentOtp = true;
    this.isLoading = true;
    this.countTime(60);
    this.subOtpGenerate = this.otpService.generateOtpWithPhoneNo(phoneNo)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.uiService.success(res.message);
            this.isLoading = false;
            // this.isPass = true;
            this.sendVerificationCode = true;
          } else {
            this.isOtpSent = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpSent = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }


  public onSubmit() {
    if (this.formData.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.formData.markAllAsTouched();
      return;
    }
    if (!this.formData.value.phoneNo) {
      this.uiService.warn('Please enter phone')
      return;
    }
    if (this.selectedQty > 0) {
      this.validateOtpWithPhoneNo({
        phoneNo: this.formData.value.phoneNo,
        code: this.otp,
        // password: this.dataForm.value.password,
      })
    }
  }


  validateOtpWithPhoneNo(data: { phoneNo: string, code: string }) {
    this.isLoading = true;
    this.subOtpValidate = this.otpService.validateOtpWithPhoneNo(data)
      .subscribe({
        next: (async (res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;
            this.isLoading = false;
            try {
              this.onConfirmOrder();
              this.isLoading = false;
            } catch (e) {
              this.isLoading = false;
            }

          } else {
            this.isOtpValid = false;
            this.isLoading = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpValid = false;
          this.isLoading = false;
          console.log(error);
        })
      });
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
      image: 'https://practiceenglishschool.com/wp-content/uploads/2024/03/1EimwxeckucGnFuusTs7r791bTGmy41fG6r6oXKbM7L5HJWktt97tbDFP785s3m0-300x300.webp',
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
      paymentType: this.selectedPaymentMethod,
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
            this.createAamarpayPayment(data, res.data.orderId, res.data._id);
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

  onSelectPaymentMethod(data: any) {
    this.selectedPaymentMethod = data.paymentType;
  }


  /**
   * PAYMENT API
   * createAamarpayPayment()
   */

  private createAamarpayPayment(orderData: any, _id: string, orderId: string) {
    this.isLoading = true;

    const reqData = {
      name: orderData.name ?? 'PracticeEng User',
      email: orderData.email ?? 'peschoolpersonal@gmail.com',
      phoneNo: orderData.phoneNo ?? '01716299426',
      desc: `Order Id: ${_id}. Order_id: ${orderId}`,
      address: orderData.shippingAddress ?? 'Dhaka',
      city: 'Dhaka',
      amount: orderData.grandTotal,
      orderId: _id,
      order_id: orderId,
      callbackUrl: environment.aamarpayProductCallbackUrl
    };

    this.paymentService.createAamarpayPaymentProduct(reqData)
      .subscribe({
        next: res => {
          this.isLoading = false;
          if (res.success) {
            this.document.location.href = res.data.url;
          } else {
            this.uiService.warn('Something went wrong! Please try again.');
          }
        },
        error: err => {
          this.isLoading = false;
          console.log(err)
        }
      })
  }


  /**
   * SCROLL WITH NAVIGATE
   */

  onScrollSection() {
    const el = this.mainEl.nativeElement as HTMLDivElement;
    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'end',
    });
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
