import {Component} from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  // Font Awesome Icon
  faPen = faPen

  // Static Data
  imgPlaceHolder = "assets/images/brand/jpg/images.jpg";

}
