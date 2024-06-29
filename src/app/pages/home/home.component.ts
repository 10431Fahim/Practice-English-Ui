import { isPlatformBrowser } from '@angular/common';
import {Component, inject, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Popup } from 'src/app/interfaces/common/popup.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data.interface';
import { PopupService } from 'src/app/services/common/popup.service';
import { StorageService } from 'src/app/services/core/storage.service';
import { UpcomingDialogComponent } from 'src/app/shared/dialog-view/upcoming-dialog/upcoming-dialog.component';
import {Course} from "../../interfaces/common/course.interface";
import {Pagination} from "../../interfaces/core/pagination.interface";
import {CourseService} from "../../services/common/course.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  //Store Variables
  isBrowser:boolean;
  popups: Popup[] = [];
  courses: Course;

  // Pagination
  private currentPage: number = 0;
  private productsPerPage = 1;
  totalProducts = 0;
  isLoadMore = false;
  // Loader
  isLoading: boolean = true;
  // Subscriptions
  private subDataOne: Subscription;
  private subGetData1: Subscription;

  private readonly courseService = inject(CourseService);

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private popupService: PopupService,
    private router: Router,
    @Inject(PLATFORM_ID) public platformId:any
  ) {
     this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    // Base Data
    this.getAllPopup();
    this.getAllCourses();
  }


  private openDialogData() {
    const dialogData = this.storageService.getDataFromSessionStorage('DIALOG');
    if (!dialogData && this.isBrowser) {
      setTimeout(() => {
        this.openDialog();
      }, 2000)
    }
  }

  openDialog() {
    this.dialog.open(UpcomingDialogComponent, {
      data:  this.popups,
      maxWidth: '1030px',
      width: '100%',
      maxHeight: '450px',
      height: '100%',
      panelClass: ['theme-dialog', 'offer-popup-dialog'],
    })
  }

  /**
   * HTTP REQ HANDLE
   * getAllPopup()
   */

  private getAllPopup() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      url:1,
      urlLink:1,
      enableVideo:1,
      enableImage:1,
      createdAt: 1,
      description: 1,
    };

    const filter: FilterData = {
      filter: {status: 'publish'},
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.popupService.getAllPopups(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.popups = res.data;
          // console.log("this.popups",this.popups)
          if(this.popups.length){
            this.openDialogData();
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  private getAllCourses(loadMore?: boolean) {
    this.isLoading = true;

    const mSelect = {
      name: 1,
      slug: 1,
      bannerImage: 1,
      shortDescription: 1,
      courseForTitle: 1,
      learningScopes: 1,
      courseForImage: 1,
      salePrice: 1,
      discountAmount: 1,
      introYoutubeVideo: 1,
      thumbnailImage: 1,
      discountType: 1,
      totalUsers: 1,
      benefits: 1,
      courseModules: 1,
      userStarted: 1,
      type: 1,
      isMultiplePrice: 1,
      membershipBenefits: 1,
      courseSpecifications: 1,
      prices: 1,
      canSaleAttachment: 1,
      attachmentSalePrice: 1,
      attachmentDiscountAmount: 1,
      attachmentDiscountType: 1,
      category: 1,
      subCategory: 1,
      childCategory: 1,
    };

    const pagination: Pagination = {
      pageSize: this.productsPerPage,
      currentPage: this.currentPage,
    };

    const filterData: FilterData = {
      select: mSelect,
      pagination: pagination,
      filter: {...{ status: 'publish' }},
      sort: { createdAt: -1 },
    };

    this.subGetData1 = this.courseService
      .getAllCourses(filterData, null)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.isLoadMore = false;
          // if (loadMore) {
          //   this.courses = [...this.courses, ...res.data];
          // } else {
            this.courses = res.data[0];

          // }
          // this.totalProducts = res.count;


        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }


  /**
   * NG ON DESTROY
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}
