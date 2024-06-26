import {Component, Input} from '@angular/core';
import {YoutubeVideoShowComponent} from "../../dialog-view/youtube-video-show/youtube-video-show.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-success-video',
  templateUrl: './success-video.component.html',
  styleUrls: ['./success-video.component.scss']
})
export class SuccessVideoComponent {
@Input() data:any;


  constructor(
    private dialog: MatDialog,
  ) { }
  /**
   * DIALOG VIEW COMPONENT
   * openYoutubeVideoDialog()
   * getDiscountCourses()
   */
  public openYoutubeVideoDialog(event: MouseEvent, url: string) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(YoutubeVideoShowComponent, {
      data: {url: url},
      panelClass: ['theme-dialog', 'no-padding-dialog'],
      width: '98%',
      maxWidth: '700px',
      height: 'auto',
      maxHeight: '100vh',
      autoFocus: false,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.data) {
      }
    });
  }
}
