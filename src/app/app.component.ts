import {Component, inject} from '@angular/core';
import {UserService} from './services/common/user.service';
import {registerLocaleData} from '@angular/common';
import localeBn from '@angular/common/locales/bn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Inject
  private readonly userService = inject(UserService);

  ngOnInit() {
    registerLocaleData(localeBn, 'bn');
    this.userService.autoUserLoggedIn();
  }

}
