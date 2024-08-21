import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../../interfaces/common/course.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data.interface';

const API_URL = environment.apiBaseLink + '/api/course/';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Inject
  private readonly httpClient = inject(HttpClient);


  /**
   * getAllCourses()
   * getCourseById()
   * getCourseForPreviewByUser()
   * getCourseEnrollStatusByUser()
   */

  getAllCourses(filterData: FilterData, searchQuery?: string | any) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Course[], count: number, success: boolean }>(API_URL + 'get-all/', filterData, { params });
  }

  getCourseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Course, message: string, success: boolean }>(API_URL + 'get-by-public/' + id, { params });
  }

  getCourseForPreviewByUser(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Course, message: string, success: boolean, tracker: any }>(API_URL + 'get-by-user-for-preview/' + id, { params });
  }

  getCourseEnrollStatusByUser(id: string) {
    return this.httpClient.get<{ data: { orderType: string }, message: string, success: boolean }>(API_URL + 'get-enroll-status-by-user/' + id);
  }


  updateModuleTracker(data: any) {
    return this.httpClient.post<{ data: Course[], count: number, success: boolean }>(API_URL + 'update-module-tracker', data);
  }

}
