import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from "./components/ui/confirm-dialog/confirm-dialog.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SocialShareComponent} from "./dialog-view/social-share/social-share.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PdfViewerComponent} from "./dialog-view/pdf-viewer/pdf-viewer.component";
import {NgModelChangeDebouncedDirective} from "./directives/ng-model-change.directive";




@NgModule({
  declarations: [ConfirmDialogComponent,SocialShareComponent,
    PdfViewerComponent,NgModelChangeDebouncedDirective],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FontAwesomeModule,
    PdfViewerModule,

  ],
  exports: [ConfirmDialogComponent,NgModelChangeDebouncedDirective],
  providers: [],
})
export class SharedModule {}
