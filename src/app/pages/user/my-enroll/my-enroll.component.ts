import {Component, inject, OnInit} from '@angular/core';
import {Order} from '../../../interfaces/common/order.interface';
import {FilterData} from '../../../interfaces/core/filter-data.interface';
import {OrderService} from '../../../services/common/order.service';
import {UiService} from '../../../services/core/ui.service';
import {UtilsService} from '../../../services/core/utils.service';
import {faAngleRight, faFilePdf, faPlay, faVideoCamera} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-enroll',
  templateUrl: './my-enroll.component.html',
  styleUrls: ['./my-enroll.component.scss'],
})
export class MyEnrollComponent implements OnInit {
  // Font Awesome Icon
  faAngleRight = faAngleRight;
  faVideoCamera = faVideoCamera;
  faFilePdf = faFilePdf;
  faPlay = faPlay;

  // Store Data
  private filter: any;
  orders: Order[] = [];

  // Loader
  loader: boolean = false;

  // Inject
  private readonly orderService = inject(OrderService);
  private readonly utilsService = inject(UtilsService);
  private readonly uiService = inject(UiService);

  ngOnInit() {
    // Base Data
    this.getAllOrdersByUser();
  }

  /**
   * HTTP REQ HANDLE
   * getAllOrdersByUser()
   * filterOrderList()
   * checkExpireDay()
   * onCopyCode()
   * onPostName()
   */

  private getAllOrdersByUser() {
    this.loader = true;

    const mSelect = {
      orderItem: 1,
      orderType: 1,
      orderStatus: 1,
      expiredIn: 1,
      liveCourseCode: 1,
      specifications: 1,
      liveGroupLink: 1,
    };
    const filterData: FilterData = {
      filter: {
        ...this.filter,
        ...{orderStatus: 'Delivered'},
      },
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1},
    };
    this.orderService.getAllOrdersByUser(filterData).subscribe({
      next: (res) => {
        this.orders = res.data;

        this.loader = false;
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
    });
  }


  checkExpireDay(expiredIn: any) {
    if (!expiredIn) {
      return null;
    }
    return this.utilsService.getDateDifference(
      new Date(expiredIn),
      new Date(),
      'days'
    );
  }

  onCopyCode(event: any) {
    event.stopPropagation();
    this.uiService.success('Code copied.');
  }


}
