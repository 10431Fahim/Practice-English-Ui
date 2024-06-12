import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ShopInformation } from "../../../interfaces/common/shop-information.interface";
import { Subscription } from "rxjs";
import { ShopInformationService } from "../../../services/common/shop-information.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  // Store Data
  shopInformation: ShopInformation;

  // Subscriptions
  private subGetData: Subscription;

  // Inject
  private readonly shopInfoService = inject(ShopInformationService);


  ngOnInit(): void {
    // Base Data
    this.getShopInformation();
  }

  /**
   * HTTP REQUEST HANDLE
   * getShopInformation()
   */

  private getShopInformation() {
    this.subGetData = this.shopInfoService.getShopInformation()
      .subscribe({
        next: res => {
          this.shopInformation = res.data;
        },
        error: err => {
          console.log(err)
        }
      })
  }


  /**
  * On Destroy
  */
  ngOnDestroy(): void {
    if (this.subGetData) {
      this.subGetData.unsubscribe();
    }
  }
}
