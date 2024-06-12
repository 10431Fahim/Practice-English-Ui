import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { ShopInformation } from 'src/app/interfaces/common/shop-information.interface';
import { ShopInformationService } from 'src/app/services/common/shop-information.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  //Font Awesome Icon
  faTiktok = faTiktok;
  faYoutube = faYoutube;
  faLinkedinIn = faLinkedinIn;
  faInstagram = faInstagram;
  faFacebookF = faFacebookF;

  // Store Data
  shopInformation: ShopInformation;

  // Subscriptions
  private subGetData: Subscription;

  constructor(private shopInfoService: ShopInformationService) { }

  ngOnInit(): void {
    this.getShopInformation();
  }

  /**
   * HTTP REQUEST HANDLE
   * getShopInformation()
   */

  private getShopInformation() {
    this.subGetData = this.shopInfoService.getShopInformation().subscribe(
      (res) => {
        if (res.success) {
          this.shopInformation = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
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
