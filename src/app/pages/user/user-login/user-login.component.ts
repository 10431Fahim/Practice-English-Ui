import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {OtpService} from "../../../services/common/otp.service";
import {UiService} from "../../../services/core/ui.service";
import {UserService} from "../../../services/common/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {User} from "../../../interfaces/common/user.interface";
import {UtilsService} from "../../../services/core/utils.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  // Google and fb login
  @ViewChild('googleLoginRef', {static: true}) loginElement!: ElementRef;
  // Store Data
  navigateFrom: string | undefined;
  phoneNo: string | any = null;
  password: string | any = null;
  sentOtp: boolean | any = false;
  otpCode: string | any;
  hasUser: boolean = null;
  isPass: boolean = null;
  showBtn: boolean = null;
  isPasswordShow = false;
  // Store Data
  isOtpSent: boolean = false;
  isOtpValid: boolean = false;
  // isLoading = false;
  public sendVerificationCode = false;
  dataForm!: FormGroup;
  // Loader
  isLoading: boolean = false;
  private subOtpGenerate: Subscription;
  private subOtpValidate: Subscription;
  // Inject
  private readonly otpService = inject(OtpService);
  private readonly uiService = inject(UiService);
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly utilsService = inject(UtilsService);


  ngOnInit(): void {
    this.onFormInit();
    // GET DATA FORM PARAM
    this.activatedRoute.queryParamMap.subscribe(qParam => {
      if (qParam.get('navigateFrom')) {
        this.navigateFrom = qParam.get('navigateFrom') as string;
      }
    })
  }


  /**
   * FORM INITIALIZE
   * onFormInit()
   * onSubmit()
   */
  onFormInit() {
    this.dataForm = this.fb.group({
      phoneNo: [null],
      name: [null],
      username: [null],
      password: [null],
      otp: [null],
    })
  }

  /**
   * INPUT METHODS
   * onSubmitData()
   * onEnterOtp()
   * onChangePhoneNo()
   */

  onSubmitData() {
    const isEmail = this.utilsService.validateEmail(this.dataForm.value.username);
    if (isEmail) {
      this.validateOtpWithEmail({
        email: this.dataForm.value.username,
        code: this.dataForm.value.otp,
        // password: this.dataForm.value.password,
      });
    } else {
      this.validateOtpWithPhoneNo({
        phoneNo: this.dataForm.value.username,
        code: this.dataForm.value.otp,
        // password: this.dataForm.value.password,
      });
    }
  }

  onShowPassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.checkUserForRegistration(this.dataForm.value)
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  private checkUserForRegistration(data: User) {
    this.userService.checkUserForRegistration(data.username).subscribe({
      next: async res => {
        this.hasUser = res.data.hasUser
        if (res.data.hasUser) {
          this.hasUser = res.data.hasUser;
          this.isPass = true;
          try {
            if (this.dataForm.value.password) {
              await this.userService.userLogin(this.dataForm.value);
              this.isLoading = false;
            }
          } catch (e) {
            this.isLoading = false;
          }
        } else {
          if (!this.otpCode && !this.sentOtp) {
            const isEmail = this.utilsService.validateEmail(data.username);
            this.showBtn = true;
            if (isEmail) {
              this.generateOtpWithEmail(data.username)
            } else {
              this.generateOtpWithPhoneNo(data.username)
            }
          }
          // this.uiService.warn('No user data found!')
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }


  validateOtpWithPhoneNo(data: { phoneNo: string, code: string }) {
    this.isLoading = true;
    this.subOtpValidate = this.otpService.validateOtpWithPhoneNo(data)
      .subscribe({
        next: (async (res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;
            this.isLoading = false;

            const user: User = {
              phoneNo: data.phoneNo,
              username: data.phoneNo,
              name: this.dataForm.value.name,
              password: this.dataForm.value.password,
              registrationType: 'phone',
              hasAccess: true,
            }

            try {
              await this.userService.userSignupAndLogin(user, this.navigateFrom);
              this.isLoading = false;
            } catch (e) {
              this.isLoading = false;
            }


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

  validateOtpWithEmail(data: { email: string, code: string }) {
    this.isLoading = true;
    this.subOtpValidate = this.otpService.validateOtpWithEmail(data)
      .subscribe({
        next: (async (res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;
            this.isLoading = false;

            const user: User = {
              phoneNo: null,
              email: data.email,
              username: data.email,
              name: this.dataForm.value.name,
              password: this.dataForm.value.password,
              registrationType: 'email',
              hasAccess: true,
            }

            try {
              await this.userService.userSignupAndLogin(user, this.navigateFrom);
              this.isLoading = false;
            } catch (e) {
              this.isLoading = false;
            }


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


  /**
   * HTTP REQ HANDLE
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */

  generateOtpWithPhoneNo(phoneNo: string) {
    this.isLoading = true;
    // this.countTime(60);
    this.subOtpGenerate = this.otpService.generateOtpWithPhoneNo(phoneNo)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.uiService.success(res.message);
            this.isLoading = false;
            this.isPass = true;
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
    // this.countTime(60);
    this.subOtpGenerate = this.otpService.generateOtpWithEmail(email)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.isPass = true;
            this.showBtn = true;
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

  /**
   * USER LOGIN OR SIGNUP METHODS
   * userSignupOrLogin()
   */
  async userSignupOrLogin() {
    try {
      const data = {
        phone: this.phoneNo,
        registrationType: 'phone',
        hasAccess: true,
        isPasswordLess: true
      }
      await this.userService.userSignupOrLogin(data, this.navigateFrom);
      this.isLoading = false;
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  }
}
