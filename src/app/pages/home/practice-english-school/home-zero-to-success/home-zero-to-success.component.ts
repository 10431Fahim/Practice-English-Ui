import {Component, OnInit} from '@angular/core';
import {Pagination} from "../../../../interfaces/core/pagination.interface";
import {ActivatedRoute} from "@angular/router";
import {FilterData} from "../../../../interfaces/core/filter-data.interface";
import {Subscription} from "rxjs";
import {YoutubeVideo} from "../../../../interfaces/common/youtube-video.interface";
import {YoutubeVideoService} from "../../../../services/common/youtube-video.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-zero-to-success',
  templateUrl: './home-zero-to-success.component.html',
  styleUrls: ['./home-zero-to-success.component.scss']
})
export class HomeZeroToSuccessComponent implements OnInit {

  // Loading
  isLoading = true;
  totalVideo = 0;
  videoCurrentPage = 1;
  videoPageSize = 6;
  isLoading1:boolean = false;
  isLoadMore = false;

  // Store Data
  // seoPage: SeoPage;
  language: string;
  video: YoutubeVideo[] = [];
  private subDataFive: Subscription;


  constructor(
    private youtubeVideoService: YoutubeVideoService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(qPram => {
      this.language = qPram.get('language');
    })
    this.getAllVideo();
  }


  private getAllVideo(loadMore?: boolean) {
    const pagination: Pagination = {
      pageSize: Number(this.videoPageSize),
      currentPage: Number(this.videoCurrentPage) - 1
    };
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      url: 1,
      createdAt: 1
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: null,
      select: mSelect,
      sort: { createdAt: -1 }
    }
    this.isLoading1 = true
    this.subDataFive = this.youtubeVideoService.getAllYoutubeVideo(filterData, null)
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.isLoadMore = false;
          if (loadMore) {
            this.video = [...this.video, ...res.data];


            setTimeout(() => {
              this.isLoading1 = false;
            },2000)

          } else{
            this.video  = res.data;
          }
          this.totalVideo = res.count;
        },
        error: error => {
          this.isLoading = false;
          console.log(error);
        }
      });
  }


  onLoadMore() {
    if (this.totalVideo > this.video.length) {
      this.isLoadMore = true;
      this.videoCurrentPage += 1;
      this.getAllVideo(true);
    }
  }



}
