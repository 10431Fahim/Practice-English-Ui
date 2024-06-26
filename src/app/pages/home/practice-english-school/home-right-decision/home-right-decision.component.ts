import {Component, ElementRef, inject, Input, OnChanges, ViewChild} from '@angular/core';
import {ReloadService} from "../../../../services/core/reload.service";
import {PricePipe} from "../../../../shared/pipes/price.pipe";
import {DiscountTypeEnum} from "../../../../enum/discount.enum";
import {Coupon} from "../../../../interfaces/common/coupon.interface";
import {UserService} from "../../../../services/common/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../../services/core/utils.service";
import {OrderService} from "../../../../services/common/order.service";
import {UserDataService} from "../../../../services/common/user-data.service";
import {CouponService} from "../../../../services/common/coupon.service";
import {PaymentService} from "../../../../services/common/payment.service";
import {UiService} from "../../../../services/core/ui.service";
import {Price} from "../../../../interfaces/common/course.interface";
import {Subscription} from "rxjs";
import {User} from "../../../../interfaces/common/user.interface";
import {environment} from "../../../../../environments/environment";
import {Order} from "../../../../interfaces/common/order.interface";
import {DOCUMENT} from "@angular/common";
import {CourseService} from "../../../../services/common/course.service";

@Component({
  selector: 'app-home-right-decision',
  templateUrl: './home-right-decision.component.html',
  styleUrls: ['./home-right-decision.component.scss'],
  providers: [PricePipe],
})
export class HomeRightDecisionComponent implements OnChanges{
  @Input() data:any;
  coupon: Coupon = null;
  url: string = ' ';
  user: User;
  isLoading: boolean = false;
  couponCode: string = null;
  couponDiscount: number = 0;
  isEnrolled: boolean = false;
  selectedPriceData: Price = null;
  isOnlySheet?: any;
  isUser: boolean = false;
  @ViewChild('feature') mainEl!: ElementRef;

  // Subscriptions
  private subGetData1!: Subscription;
  private subGetData2!: Subscription;
  private subGetData3!: Subscription;
  private subGetData4!: Subscription;
  private subAddData1!: Subscription;
  private subRoute1!: Subscription;
  private subRoute2: Subscription;
  private subDataFive: Subscription;
  // Inject
  private readonly reloadService = inject(ReloadService);
  private readonly userService = inject(UserService);
  private readonly userDataService = inject(UserDataService);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);
  private readonly uiService = inject(UiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly orderService = inject(OrderService);
  private readonly couponService = inject(CouponService);
  private readonly utilService = inject(UtilsService);
  private readonly pricePipe = inject(PricePipe);
  private readonly document = inject(DOCUMENT);
  ngOnInit(): void {
    this.url = window.location.href;
    this.isUser = this.userService.getUserStatus();
    this.userService.getUserStatusListener().subscribe((res) => {
      this.isUser = res;
      if (this.isUser) {
        this.getLoggedUserData();
      }
    });
    this.reloadService.refreshFeature$.subscribe((res) => {
      if (res) {
        this.onScrollSection();
      }
    });

  }

  ngOnChanges() {
    if (this.isUser) {
      this.getCourseEnrollStatusByUser(this.data?._id);
    }

  }

  private getLoggedUserData() {
    const select = 'name phone email';
    this.subGetData4 = this.userDataService
      .getLoggedInUserData(select)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.user = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  public onBuyCourse() {
    this.isLoading = true;

    const mData: any = {
      name: this.user?.name,
      email: this.user?.email,
      phoneNo: this.user?.phone,
      approveStatus: 'not-approved',
      paymentStatus:
        this.pricePipe.transform(
          this.data,
          'salePrice',
          this.selectedPriceData
        ) > 0
          ? 'unpaid'
          : 'paid',
      orderStatus:
        this.pricePipe.transform(
          this.data,
          'salePrice',
          this.selectedPriceData
        ) > 0
          ? 'Pending'
          : 'Delivered',
      subTotal: this.pricePipe.transform(
        this.data,
        'regularPrice',
        this.selectedPriceData
      ),
      discount: this.pricePipe.transform(
        this.data,
        'discountAmount',
        this.selectedPriceData
      ),

      grandTotal: this.coupon ? this.pricePipe.transform(
        this.data,
        'regularPrice',
        this.selectedPriceData
      ) - this.couponDiscount : this.pricePipe.transform(
        this.data,
        'salePrice',
        this.selectedPriceData
      ),
      paidAmount: 0,
      coupon: this.coupon ? this.coupon._id : null,
      couponDiscount: this.couponDiscount,
      checkoutDate: this.utilService.getDateString(new Date()),
      note: null,
      user: this.userService.getUserId(),
      orderType: this.isOnlySheet ? 'lecture-sheet' : this.data?.type,
      liveCourseCode: null,
      orderItem: {
        _id: this.data._id,
        name: this.data?.name,
        slug: this.data?.slug,
        type: this.isOnlySheet ? 'lecture-sheet' : this.data?.type,
        image: this.data?.bannerImage
          ? this.data?.bannerImage
          : this.data?.image,
        category: this.data?.category,
        subCategory: this.data?.subCategory,
        childCategory: this.data?.childCategory,
        specifications: this.data?.specifications,
        salePrice: this.pricePipe.transform(
          this.data,
          'salePrice',
          this.selectedPriceData
        ),
        discountType: this.data.isMultiplePrice
          ? this.selectedPriceData?.discountType
          : this.data.discountType,
        discountAmount: this.data.isMultiplePrice
          ? this.selectedPriceData?.discountAmount
          : this.data.discountAmount,
        unit: this.selectedPriceData
          ? {
            name: this.selectedPriceData?.name,
            duration: this.selectedPriceData?.duration,
          }
          : null,
      },
    };

    if (this.userService.getUserStatus()) {

      this.addOrderByUser(mData);
    } else {
      this.isLoading = false;
      this.router
        .navigate(['/login'], {
          queryParams: { navigateFrom: this.router.url },
        })
        .then();
    }
  }


  private addOrderByUser(data: Order) {
    this.subAddData1 = this.orderService.addOrderByUser(data).subscribe({
      next: (res) => {
        if (res.success) {
          if (data.grandTotal > 0) {
            this.bKashCreatePayment(data, res.data?._id);
          } else {
            this.uiService.success('Course added to your enroll list');
            this.router.navigate(['/my-course']);
          }
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  private getCourseEnrollStatusByUser(id: string) {
    this.subGetData2 = this.courseService
      .getCourseEnrollStatusByUser(id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            if (res.data.orderType === 'lecture-sheet') {
              this.isEnrolled = !this.isOnlySheet;
            } else {
              this.isEnrolled = true;
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /**
   * PAYMENT API
   * bKashCreatePayment()
   */

  private bKashCreatePayment(orderData: Order, _id: string) {
    this.isLoading = true;

    const reqData = {
      mode: '0011',
      payerReference: ' ',
      callbackURL: environment.bkashCallbackUrl,
      amount: orderData.grandTotal,
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: _id, // Must be unique
    };

    this.paymentService.createBkashPayment(reqData).subscribe({
      next: (res) => {
        if (res.success) {
          const updateData = {
            paymentMethod: 'bKash',
            paymentApiType: 'bKash',
            paymentRefId: res.data.paymentID,
          };
          this.updateOrderByUserId(_id, updateData, res.data.bkashURL);
        } else {
          this.isLoading = false;
          this.uiService.warn('Something went wrong! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  private updateOrderByUserId(
    _id: string,
    data: any,
    paymentRedirectUrl: string
  ) {
    this.subAddData1 = this.orderService
      .updateOrderByUserId(_id, data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.document.location.href = paymentRedirectUrl;
          } else {
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
  /**
   * COUPON HANDLE
   * checkCouponAvailability()
   * calculateCouponDiscount()
   * onRemoveCoupon()
   */

  public checkCouponAvailability() {
    if (!this.couponCode?.trim()) {
      this.uiService.warn('Please enter your vouchers code.');
      return;
    }
    if(this.userService.getUserStatus()){
      this.subDataFive = this.couponService
        .checkCouponAvailability({
          couponCode: this.couponCode,
          course: this.data._id,
          subTotal: this.pricePipe.transform(
            this.data,
            'regularPrice',
            this.selectedPriceData
          ),
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uiService.success(res.message);
              this.coupon = res.data;
              // console.log(this.coupon);
              if (this.coupon) {
                this.calculateCouponDiscount();
              }
            } else {
              this.uiService.warn(res.message);
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }else{
      this.router.navigate(['/login'], {queryParams: {navigateFrom: this.router.url}, queryParamsHandling: 'merge'})
    }

  }

  private calculateCouponDiscount() {
    if (this.coupon.discountType === DiscountTypeEnum.PERCENTAGE) {
      this.couponDiscount = Math.floor(
        (this.coupon.discountAmount / 100) * this.pricePipe.transform(
          this.data,
          'regularPrice',
          this.selectedPriceData
        ),
      );
    } else {
      this.couponDiscount = Math.floor(this.coupon.discountAmount);
    }
  }

  onRemoveCoupon() {
    this.couponDiscount = 0;
    this.couponCode = null;
    this.coupon = null;
  }
  dummyData: any[] = [
    {
      id: '1',
      name: 'Listing',
      price: '10000',
    },
    {
      id: '2',
      name: 'Speaking',
      price: '3000',
    },
    {
      id: '3',
      name: 'Reading',
      price: '2000',
    },
    {
      id: '4',
      name: 'Writing',
      price: '2000',
    },
    {
      id: '5',
      name: 'Grammar',
      price: '2000',
    },
    {
      id: '6',
      name: 'Pronounciation',
      price: '2000',
    },
    {
      id: '7',
      name: 'Vocabulary',
      price: '5000',
    },
    {
      id: '8',
      name: 'Conversation',
      price: '10000',
    },
    {
      id: '9',
      name: 'Communication',
      price: '10000',
    },
    {
      id: '10',
      name: 'Presentation',
      price: '15000',
    },
    {
      id: '11',
      name: 'Weekly Live with  Teacher',
      price: '15000',
    },
    {
      id: '12',
      name: 'Speaking Club',
      price: '15000',
    },
    {
      id: '13',
      name: 'Advance Tips',
      price: '15000',
    },
    {
      id: '14',
      name: '24/7  Supports',
      price: '15000',
    },
  ];

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
}
