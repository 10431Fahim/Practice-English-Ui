import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { Review } from '../../interfaces/common/review.interface';
import { FilterData } from '../../interfaces/core/filter-data.interface';

const API_URL = environment.apiBaseLink + '/api/review/';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // Inject
  private readonly httpClient = inject(HttpClient);

  /**
   * addReviewByUser()
   * getAllReviews()
   * getReviewById()
   * updateReviewByIdByUser()
   */

  addReviewByUser(data: any) {
    return this.httpClient.post<ResponsePayload>
      (API_URL + 'add-by-user', data);
  }

  addReview(data: Review) {
    return this.httpClient.post<{ message: string }>(API_URL + 'add', data);
  }

  getAllReviews(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    return this.httpClient.post<{ data: Review[], count: number, success: boolean }>(API_URL + 'get-all', filterData, { params });
  }

  getReviewById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Review, message: string, success: boolean }>(API_URL + 'get-by/' + id, { params });
  }

  updateReviewByIdByUser(id: string, data: any) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update-by-user/' + id, data);
  }


  getAllReviewsByQuery(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Review[], count: number, success: boolean }>(API_URL + 'get-all-review-by-query', filterData, {params});
  }

}
