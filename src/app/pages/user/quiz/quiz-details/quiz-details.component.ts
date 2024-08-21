import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../../../../interfaces/common/quiz.interface';
import { QuizService } from '../../../../services/common/quiz.service';
import {CourseService} from '../../../../services/common/course.service';
import {Course} from '../../../../interfaces/common/course.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserService } from 'src/app/services/common/user.service';
import {UtilsService} from '../../../../services/core/utils.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit, OnDestroy {

  // Store Data
  id: string;
  quiz: Quiz;
  quizAnswer: any[] = [];
  progress: number = 0;
  isFinish: boolean = false;
  timeInSec?: number;
  holdTimeInSec?: number;
  iterable: any;
  result: any = null;
  courseId: string;
  stepId: string;
  module: string;
  course: Course;
  user: User;
  private subRouteTwo: Subscription;

  // ConvertTime Data
  convertMin?: number = 0;
  convertSec?: number = 0;
  parentage?: number = 100;

  // Subscriptions
  private subGetData: Subscription;
  private subAddData1: Subscription;
  private subGetData2: Subscription;
  private subRouteOne: Subscription;
  private subGetData4!: Subscription;

  // Inject
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly userDataService = inject(UserDataService);
  private readonly userService = inject(UserService);
  private readonly utilsService = inject(UtilsService);


  ngOnInit() {
    // GET ID FROM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getQuizById();
      }
    });

    this.subRouteTwo = this.activatedRoute.queryParamMap.subscribe(qParam => {
      this.courseId = qParam.get('course');
      this.module = qParam.get('module');
      this.stepId = qParam.get('step');
      if(this.courseId) {
        this.getCourseById()
      }
    })

    if(this.userService.getUserStatus()) {
      this.getLoggedUserData();
    }
  }


  /**
   * HTTP REQ HANDLE
   * getQuizById()
   * timeSet()
   */
  private getQuizById() {
    const select =
      'name questionCount timeInSec passMark isNegativeMark negativeMark questions';
    this.subGetData = this.quizService.getQuizById(this.id, select).subscribe({
      next: (res) => {
        if (res.success) {
          this.quiz = res.data;
          this.timeInSec = Number(this.quiz.timeInSec);

          this.convertMin = this.timeInSec / 60;

          this.holdTimeInSec = Number(this.quiz.timeInSec);

          this.iterable = setInterval(() => {
            this.timeInSec = this.timeInSec - 1;
            this.timeSet(this.timeInSec);
          }, 1000);
        }
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private getCourseById() {
    this.subGetData2 = this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        this.course = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getLoggedUserData() {
    const select = 'name phone email';
    this.subGetData4 = this.userDataService
      .getLoggedInUserData(select)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.user = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  timeSet(time: number) {
    if (time === 0) {
      this.onFinish();
      clearInterval(this.iterable);
      this.convertMin = 0;
      this.convertSec = 0;
    } else {
      let totalTime = time;
      this.parentage = Math.floor((time / this.holdTimeInSec) * 100);
      this.convertMin = Math.floor(totalTime / 60);
      this.convertSec = totalTime % 60;
    }
  }

  /**
   * QUIZ LOGIC
   * onSelectOption()
   * onFinish()
   * onReQuiz()
   */
  onSelectOption(event: any) {
    const fIndex = this.quizAnswer.findIndex((f) => f.name === event.name);
    if (fIndex === -1) {
      this.quizAnswer.push(event);
    } else {
      if (event.isSelect) {
        this.quizAnswer[fIndex] = event;
      } else {
        this.quizAnswer.splice(fIndex, 1);
      }
    }

    this.progress = Math.floor(
      (this.quizAnswer.length / this.quiz?.questionCount) * 100
    );
  }

  onFinish() {
    let correct: number = 0;
    let inCorrect: number = 0;
    this.quiz?.questions.forEach((ques) => {
      const fAns = this.quizAnswer.find((f) => f.name === ques.name);
      const fOption = ques.options.find((f) => f.name === fAns.answer);

      if (fOption.isCorrect) {
        correct += 1;
      } else {
        inCorrect += 1;
      }
    });
    const obtainMark = Math.floor((correct / this.quiz?.questionCount) * 100);

    clearInterval(this.iterable);
    let getFinishTime = Math.floor(this.holdTimeInSec / 60);
    let getFinishTimeMin = getFinishTime - this.convertMin;
    let getFinishTimeSec = 60 - this.convertSec;
    let totalFinishTime =
      '0' +
      (getFinishTimeMin === 0 ? getFinishTime : getFinishTimeMin - 1) +
      ':' +
      (getFinishTimeSec > 10 ? getFinishTimeSec : '0' + getFinishTimeSec);

    const isPass = obtainMark >= this.quiz?.passMark;

    //
    let resultQuestionAns: any[] = [];
    this.quiz?.questions.forEach(ques => {
      const fQuizAns = this.quizAnswer.find(f => f.name === ques.name);
      const mOptions = ques.options.map(m => {
        return {
          ...m,
          ...{
            isSelect: fQuizAns.answer === m.name
          }
        }
      })

      resultQuestionAns.push({
        ...ques,
        ...{
          options: mOptions
        }
      })
    });

    this.result = {
      passMark: this.quiz?.passMark,
      obtainMark: obtainMark,
      isPass: isPass,
      totalFinishTime: totalFinishTime,
      correct: correct,
      inCorrect: inCorrect,
      questions: resultQuestionAns
    }

    this.isFinish = true;

    const mData: any = {
      course: this.course._id,
      moduleId: this.module,
      isCompleteQuiz: true,
      isModuleComplete: true,
    }
    this.updateModuleTracker(mData);
  }

  private updateModuleTracker(data: any) {
    this.subAddData1 = this.courseService.updateModuleTracker(data).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  onReQuiz() {
    this.isFinish = false;
    this.quizAnswer = [];
    this.getQuizById();
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subGetData) {
      this.subGetData.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
  }

}
