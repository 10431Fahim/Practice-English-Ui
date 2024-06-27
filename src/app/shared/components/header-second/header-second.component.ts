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
  private countdownStart: number = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  public countdown: number;
  private timerSubscription: Subscription;
  private startDate: number = new Date('2024-06-27T00:00:00').getTime(); // Set the specific start date

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
    this.updateCountdown();
    this.subscribeToTimer();
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
  updateCountdown(): void {
    const now = Date.now();
    const elapsedTime = now - this.startDate;
    const cyclesPassed = Math.floor(elapsedTime / this.countdownStart);
    const cycleStartTime = this.startDate + cyclesPassed * this.countdownStart;
    const remainingTime = this.countdownStart - (now - cycleStartTime);

    if (remainingTime > 0) {
      this.countdown = remainingTime;
    } else {
      this.resetTimer();
    }
  }

  subscribeToTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  formatDays(days: number): string {
    return days < 10 ? `0${days}` : `${days}`;
  }

  formatHours(hours: number): string {
    return hours < 10 ? `0${hours}` : `${hours}`;
  }

  resetTimer(): void {
    this.countdown = this.countdownStart;
  }

  get days(): number {
    return Math.floor(this.countdown / (24 * 60 * 60 * 1000));
  }

  get hours(): number {
    return Math.floor((this.countdown % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  }

  get minutes(): number {
    return Math.floor((this.countdown % (60 * 60 * 1000)) / (60 * 1000));
  }

  get seconds(): number {
    return Math.floor((this.countdown % (60 * 1000)) / 1000);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
