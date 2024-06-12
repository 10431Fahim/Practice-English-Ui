import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SubCategory } from '../../interfaces/common/sub-category.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data.interface';

const API_URL = environment.apiBaseLink + '/api/subCategory/';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  // Inject
  private readonly httpClient = inject(HttpClient);

  /**
   * getAllSubCategory()
   * getSubCategoriesByCategorySlug()
   */


  getAllSubCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SubCategory[], count: number, success: boolean }>(API_URL + 'get-all/', filterData, { params });
  }

  getSubCategoriesByCategorySlug(categorySlug: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_URL + 'get-all-by-parent-by-slug/' + categorySlug, { params });
  }

}
