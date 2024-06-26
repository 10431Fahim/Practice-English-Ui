import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { YoutubeVideo } from '../../interfaces/common/youtube-video.interface';
import { Observable } from 'rxjs';
import {FilterData} from "../../interfaces/core/filter-data.interface";

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/youtubeVideo/';

@Injectable({
  providedIn: 'root',
})
export class YoutubeVideoService {
  constructor(private httpClient: HttpClient) {}

  /**
   * addYoutubeVideo
   * insertManyYoutubeVideo
   * getAllYoutubeVideos
   * getYoutubeVideoById
   * updateYoutubeVideoById
   * updateMultipleYoutubeVideoById
   * deleteYoutubeVideoById
   * deleteMultipleYoutubeVideoById
   */

  addYoutubeVideo(data: YoutubeVideo): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  }

  getAllYoutubeVideo(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: YoutubeVideo[];
      count: number;
      success: boolean;
      calculation: any;
    }>(API_NEW_EXPENSE + 'get-all/', filterData, { params });
  }

  getYoutubeVideoById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: YoutubeVideo;
      message: string;
      success: boolean;
    }>(API_NEW_EXPENSE + id, { params });
  }

  updateYoutubeVideoById(id: string, data: YoutubeVideo) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_NEW_EXPENSE + 'update/' + id,
      data
    );
  }

  // deleteYoutubeVideoById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteYoutubeVideoById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(
      API_NEW_EXPENSE + 'delete/' + id,
      { params }
    );
  }

  deleteMultipleYoutubeVideoById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(
      API_NEW_EXPENSE + 'delete-multiple',
      { ids: ids },
      { params }
    );
  }

  //  youtubeVideoGroupByField<T>(dataArray: T[], field: string): YoutubeVideoGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});
  //
  //   const final = [];
  //
  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //
  //   return final as YoutubeVideoGroup[];

  // }
}
