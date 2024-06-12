import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data.interface';
import { Banner } from 'src/app/interfaces/common/banner.interface';

const API_URL = environment.apiBaseLink + '/api/banner/';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private bannerResponse: any;

  // Inject
  private readonly httpClient = inject(HttpClient);

  /**
   * getAllBanners()
   * getAllBannersWithCache()
   */

  getAllBanners(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Banner[], count: number, success: boolean }>(API_URL + 'get-all/', filterData, { params });
  }

  getAllBannersWithCache(filterData: FilterData, searchQuery?: string, refresh?: boolean) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }

    return new Observable<{ data: Banner[]; count: number; success: boolean }>((observer) => {
      if (this.bannerResponse && !refresh) {
        observer.next(this.bannerResponse);
        observer.complete()
      } else {
        this.httpClient.post<{ data: Banner[], count: number, success: boolean }>(API_URL + 'get-all/', filterData, { params })
          .subscribe({
            next: res => {
              this.bannerResponse = res;
              observer.next(res);
              observer.complete();
            },
            error: err => {
              console.log(err);
            }
          })
      }
    });
  }

}
