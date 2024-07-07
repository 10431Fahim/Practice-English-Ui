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
  socialLists: any[] = [];

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

  private getSocialLists() {
    this.shopInformation.socialLinks.forEach(m => {
      if (m.type === 0) {
        const obj = {
          urL: m.value,
          icon: 'fab fa-facebook-f',
        }
        this.socialLists.push(obj);
      }
    })
  }

  getSocialLink(type: string): string {
    switch (type) {
      case 'facebook':
        return this.shopInformation?.socialLinks.find(f => f.type === 0)?.value ?? null;

      case 'youtube':
        return this.shopInformation?.socialLinks.find(f => f.type === 1)?.value ?? null;

      case 'twitter':
        return this.shopInformation?.socialLinks.find(f => f.type === 2)?.value ?? null;

      case 'instagram':
        return this.shopInformation?.socialLinks.find(f => f.type === 3)?.value ?? null;

      case 'linkedin':
        return this.shopInformation?.socialLinks.find(f => f.type === 4)?.value ?? null;


      case 'tiktok':
        return this.shopInformation?.socialLinks.find(f => f.type === 5)?.value ?? null;


      default:
        return null;
    }
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
