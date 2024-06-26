import { Component, OnInit, inject } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import { ShopInformation } from 'src/app/interfaces/common/shop-information.interface';
import { ShopInformationService } from 'src/app/services/common/shop-information.service';
import {UserService} from "../../../services/common/user.service";

@Component({
  selector: 'app-header-second',
  templateUrl: './header-second.component.html',
  styleUrls: ['./header-second.component.scss'],
})
export class HeaderSecondComponent implements OnInit {
  private countdownStart: number = 3 * 24 * 60 * 60; // 3 days in seconds
  public countdown: number;
  private timerSubscription: Subscription;

  // store data
  shopInformation: ShopInformation;

  // subscriptions
  private subGetData3: Subscription;

  // services inject
  private readonly shopInfoService = inject(ShopInformationService);
  public readonly userService = inject(UserService);
  constructor() {
    this.countdown = this.countdownStart;
  }

  ngOnInit(): void {
    this.getShopInformation();
    this.startTimer();
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


  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.resetTimer();
      }
    });
  }

  resetTimer(): void {
    this.countdown = this.countdownStart;
  }

  get days(): number {
    return Math.floor(this.countdown / (24 * 60 * 60));
  }

  get hours(): number {
    return Math.floor((this.countdown % (24 * 60 * 60)) / (60 * 60));
  }

  get minutes(): number {
    return Math.floor((this.countdown % (60 * 60)) / 60);
  }

  get seconds(): number {
    return this.countdown % 60;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
