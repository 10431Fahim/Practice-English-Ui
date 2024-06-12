import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {QuizOption, QuizQuestion} from '../../../interfaces/common/quiz.interface';
import {GalleryComponent} from "../gallery/gallery.component";

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @ViewChild('galleryPop', { static: false }) galleryPop!: GalleryComponent;
  selectedOption: QuizOption;
  @Input({required: true}) data: QuizQuestion;
  @Input() showCorrectAnswer: boolean;
  @Output() onSelectOption = new EventEmitter();

  onClickOption(data: QuizOption) {
    const isSame = this.selectedOption?.name === data?.name;
    this.selectedOption = !isSame ? data : null;
    this.onSelectOption.emit({
      name: this.data?.name,
      answer: this.selectedOption?.name,
      isSelect:  !isSame
    })
  }

  getResultOpt(data: QuizOption) {
    if(data.isSelect && !data.isCorrect) {
      return 'wrong'
    } if (data.isCorrect) {
      return 'correct'
    } else
      return '';
  }

  /**
   * SHOW GALLERY
   */
  onShowPop(index: any) {
    if (index > -1) {
      this.galleryPop.onShowGallery(index);
    }
  }

}
