import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { User } from 'src/app/interfaces/common/user.interface';
import { FileData } from 'src/app/interfaces/gallery/file-data.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { GENDERS } from "../../../../core/utils/app-data";
import { Select } from "../../../../interfaces/core/select.interface";
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  // Font Awesome Icon
  faPen = faPen;

  // Store Data
  user: User | any = null;
  genders: Select[] = GENDERS;

  // Loader
  isLoading = false;

  // DATA FORM
  dataForm?: FormGroup | any;

  // Image Upload
  imageChangedEvent: any = null;
  imgPlaceHolder = 'assets/images/brand/jpg/images.jpg';
  pickedImage?: any;
  file: any = null;
  newFileName: string | any;
  imgBlob: any = null;

  // Subscriptions
  private subReloadOne!: Subscription;
  private subGetData1!: Subscription;
  private subAddData1!: Subscription;
  private subAddData2!: Subscription;
  private subDeleteData1!: Subscription;

  // Inject
  private readonly reloadService = inject(ReloadService);
  private readonly dialog = inject(MatDialog);
  private readonly fileUploadService = inject(FileUploadService);
  private readonly uiService = inject(UiService);
  private readonly fb = inject(FormBuilder);
  protected readonly userDataService = inject(UserDataService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  // Breakpoints
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 599px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    // Reload
    this.subReloadOne = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserInfo();
    });

    // Base Data
    this.getLoggedInUserInfo();

    // Form Initialize
    this.initialForm();
  }

  /**
   * FORM SUBMIT FUNCTION
   * initialForm()
   * onSubmit();
   */
  initialForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      gender: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Invalid Form');
    } else {
      this.updateLoggedInUserInfo(this.dataForm.value);
    }
  }

  /**
   * HTTP REQ HANDLE
   * getLoggedInUserInfo()
   * updateLoggedInUserInfo()
   * imageUploadOnServer()
   * removeOldImageFromServer()
   */

  private getLoggedInUserInfo() {
    this.subGetData1 = this.userDataService.getLoggedInUserData().subscribe({
      next: (res) => {
        this.user = res.data;
        this.dataForm.patchValue(this.user);
        // this.dataForm.patchValue(this.user);
        this.userDataService.passUserData(this.user);
        if (this.user.profileImg) {
          this.imgPlaceHolder = this.user.profileImg;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateLoggedInUserInfo(data: any) {
    this.isLoading = true;
    this.subAddData1 = this.userDataService
      .updateLoggedInUserInfo(data)
      .subscribe({
        next: (res) => {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  private imageUploadOnServer() {
    const data: FileData = {
      fileName: this.newFileName,
      file: this.imgBlob,
      folderPath: 'admins',
    };
    this.subAddData2 = this.fileUploadService
      .uploadSingleImage(data)
      .subscribe({
        next: (res) => {
          this.removeImageFiles();
          if (this.user?.profileImg) {
            this.removeOldImageFromServer(this.user?.profileImg);
          }
          this.updateLoggedInUserInfo({ profileImg: res?.url });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private removeOldImageFromServer(imgUrl: string) {
    this.subDeleteData1 = this.fileUploadService
      .removeSingleFile(imgUrl)
      .subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * ON IMAGE PICK
   * fileChangeEvent()
   * removeImageFiles()
   */

  fileChangeEvent(event: any) {
    this.file = (event.target as HTMLInputElement | any).files[0];
    const originalNameWithoutExt = this.file.name
      .toLowerCase()
      .split(' ')
      .join('-')
      .split('.')
      .shift();
    const fileExtension = this.file.name.split('.').pop();
    this.newFileName = `${Date.now().toString()}_${originalNameWithoutExt}.${fileExtension}`;

    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.imgPlaceHolder = reader.result as string;
    };

    // Open Upload Dialog
    if (event.target.files[0]) {
      this.openComponentDialog(event);
    }

    // NGX Image Cropper Event..
    this.imageChangedEvent = event;
  }

  private removeImageFiles() {
    this.file = null;
    this.newFileName = null;
    this.pickedImage = null;
    this.imgBlob = null;
  }

  /**
   * OPEN COMPONENT DIALOG
   * openComponentDialog()
   */
  public openComponentDialog(data?: any) {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      data,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      width: '680px',
      minHeight: '400px',
      maxHeight: '600px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.imgBlob) {
          this.imgBlob = dialogResult.imgBlob;
          this.imageUploadOnServer();
        }
        if (dialogResult.croppedImage) {
          this.pickedImage = dialogResult.croppedImage;
          this.imgPlaceHolder = this.pickedImage;
          if (this.pickedImage) {
            this.imageUploadOnServer();
          }
        }
      }
    });
  }

  /***
   * On Destroy
   */

  ngOnDestroy(): void {
    if (this.subGetData1) {
      this.subGetData1.unsubscribe();
    }
    if (this.subAddData1) {
      this.subAddData1.unsubscribe();
    }
    if (this.subAddData2) {
      this.subAddData2.unsubscribe();
    }
    if (this.subDeleteData1) {
      this.subDeleteData1.unsubscribe();
    }
    if (this.subReloadOne) {
      this.subReloadOne.unsubscribe();
    }
  }
}
