import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../interfaces/common/user.interface';
import {UserService} from '../../../services/common/user.service';
import {OtpService} from '../../../services/common/otp.service';
import {UiService} from '../../../services/core/ui.service';
import {UtilsService} from '../../../services/core/utils.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  dataForm!: FormGroup;
  hasUser: boolean = null;
  isLoading = false;
  isOtpSent: boolean = false;
  isOtpValid: boolean = false;
  sendVerificationCode: boolean = false;
  isPasswordShow = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public otpService: OtpService,
    public uiService: UiService,
    private utilsService: UtilsService,
  ) {

  }

  ngOnInit() {
    this.onFormInit();
  }

  /**
   * FORM INITIALIZE
   * onFormInit()
   * onSubmit()
   */
  onFormInit() {
    this.dataForm = this.fb.group({
      username: [null, [Validators.required]],
      otp: [null],
      password: [null],
    })
  }

  onSubmit() {
    if (this.dataForm.valid) {
      if (!this.isOtpSent) {
        this.checkUserForRegistration(this.dataForm.value)
      } else {
        const isEmail = this.utilsService.validateEmail(this.dataForm.value.username);
        if (isEmail) {
          this.validateOtpWithEmail({
            email: this.dataForm.value.username,
            code: this.dataForm.value.otp,
            password: this.dataForm.value.password,
          });
        } else {
          this.validateOtpWithPhoneNo({
            phoneNo: this.dataForm.value.username,
            code: this.dataForm.value.otp,
            password: this.dataForm.value.password,
          });
        }

      }

    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  onShowPassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  /**
   * HTTP REQ HANDLE
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */

  generateOtpWithPhoneNo(phoneNo: string) {
    this.isLoading = true;
    this.otpService.generateOtpWithPhoneNo(phoneNo)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.uiService.success(res.message);
            this.isLoading = false;
            this.sendVerificationCode = true;
          } else {
            this.isOtpSent = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpSent = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }

  generateOtpWithEmail(email: string) {
    this.isLoading = true;
    this.otpService.generateOtpWithEmail(email)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.uiService.success(res.message);
            this.isLoading = false;
            this.sendVerificationCode = true;
          } else {
            this.isOtpSent = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpSent = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }

  validateOtpWithPhoneNo(data: { phoneNo: string, code: string, password: string }) {
    this.isLoading = true;
    this.otpService.validateOtpWithPhoneNo(data)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;

            const user: any = {
              username: data.phoneNo,
              password: data.password,
            }
            this.resetUserPassword(user)


          } else {
            this.isOtpValid = false;
            this.isLoading = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpValid = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }


  validateOtpWithEmail(data: { email: string, code: string, password: string }) {
    this.isLoading = true;
    this.otpService.validateOtpWithEmail(data)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;

            const user: any = {
              username: data.email,
              password: data.password,
            }
            this.resetUserPassword(user)


          } else {
            this.isOtpValid = false;
            this.isLoading = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpValid = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }


  private checkUserForRegistration(data: User) {
    this.userService.checkUserForRegistration(data.username).subscribe({
      next: res => {
        this.hasUser = res.data.hasUser
        if (res.data.hasUser) {
          this.hasUser = res.data.hasUser
          const isEmail = this.utilsService.validateEmail(data.username);
          if (isEmail) {
            this.generateOtpWithEmail(data.username)
          } else {
            this.generateOtpWithPhoneNo(data.username)
          }

        } else {
          this.uiService.warn('No user data found!')
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private resetUserPassword(data: any) {
    this.userService.resetUserPassword(data).subscribe({
      next: res => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.warn('Success! Please login again');
          this.router.navigate(['/login']).then();
        } else {
          this.uiService.warn('Sorry! Something went wrong.');
        }
      },
      error: err => {
        this.isLoading = false;
        console.log(err)
      }
    })
  }


}
