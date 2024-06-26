import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home-membership',
  templateUrl: './home-membership.component.html',
  styleUrls: ['./home-membership.component.scss']
})
export class HomeMembershipComponent {
@Input() data:any;
}
