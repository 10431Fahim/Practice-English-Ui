import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../../interfaces/common/quiz.interface';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {Course} from '../../../../interfaces/common/course.interface';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../interfaces/common/user.interface';
import {PricePipe} from '../../../../shared/pipes/price.pipe';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
  providers: [PricePipe],
})
export class QuizResultComponent implements OnInit {
  // Font Awesome Icon
  faAngleDown = faAngleDown;

  @Input() quiz: Quiz;
  @Input() result: any = false;
  @Input() course: Course;

  @Output() onReQuiz = new EventEmitter();

  // quiz result show variable
  quizRes: boolean = false;
  @Input() user: User;
  courseId: string;
  // Loader
  isLoading: boolean = false;

  private readonly activatedRoute = inject(ActivatedRoute);


  // Subscriptions
  private subAddData1!: Subscription;
  private subAddData2!: Subscription;
  private subRouteTwo!: Subscription;

  ngOnInit() {
    this.subRouteTwo = this.activatedRoute.queryParamMap.subscribe(qParam => {
      this.courseId = qParam.get('course');
    })
  }

  /**
   * SHOW QUIZ RESULT
   * onQuizRes()
   */
  onQuizRes() {
    this.quizRes = !this.quizRes;
  }

  onClickReQuiz() {
    this.onReQuiz.emit(true);
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    if (this.subAddData1) {
      this.subAddData1.unsubscribe();
    }
    if (this.subAddData2) {
      this.subAddData2.unsubscribe();
    }
  }


}
