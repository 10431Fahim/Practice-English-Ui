import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopInformation } from 'src/app/interfaces/common/shop-information.interface';
import { ShopInformationService } from 'src/app/services/common/shop-information.service';

@Component({
  selector: 'app-header-second',
  templateUrl: './header-second.component.html',
  styleUrls: ['./header-second.component.scss'],
})
export class HeaderSecondComponent implements OnInit {
  // store data
  shopInformation: ShopInformation;

  // subscriptions
  private subGetData3: Subscription;

  // services inject
  private readonly shopInfoService = inject(ShopInformationService);

  ngOnInit(): void {
    this.getShopInformation();
  }

  private getShopInformation() {
    this.subGetData3 = this.shopInfoService.getShopInformation().subscribe({
      next: (res) => {
        if (res.success) {
          this.shopInformation = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
