import { Pipe, PipeTransform } from '@angular/core';
import { SubCategory } from 'src/app/interfaces/common/sub-category.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: SubCategory[], categoryId:string): any[] {

    if(value && categoryId ){
       return value.filter((m) => m.category._id === categoryId);
    }else{
      return null;
    }

  }

}
