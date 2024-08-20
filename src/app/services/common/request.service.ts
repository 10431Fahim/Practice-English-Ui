import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import {Request} from "../../interfaces/common/request.interface";
import {FilterData} from "../../interfaces/core/filter-data.interface";
import {Order} from "../../interfaces/common/order.interface";


const API_FAQ = environment.apiBaseLink + '/api/request/';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addRequest
   * insertManyRequest
   * getAllRequests
   * getRequestById
   * updateRequestById
   * updateMultipleRequestById
   * deleteRequestById
   * deleteMultipleRequestById
   */

  addRequest(data: Request):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_FAQ + 'add-by-user', data);
  }

  getAllRequestByUser(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Request[], count: number, success: boolean }>(API_FAQ + 'get-all-by-user/', filterData, { params });
  }


  getAllRequests(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Request[], count: number, success: boolean }>(API_FAQ + 'get-all/', filterData, {params});
  }

  getRequestById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Request, message: string, success: boolean }>(API_FAQ + 'get-by/' + id, {params});
  }

  updateRequestById(id: string, data: Request) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_FAQ + 'update/' + id, data);
  }

  deleteRequestById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_FAQ + 'delete/' + id, {params});
  }

  deleteMultipleRequestById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_FAQ + 'delete-multiple', {ids: ids}, {params});
  }



}
