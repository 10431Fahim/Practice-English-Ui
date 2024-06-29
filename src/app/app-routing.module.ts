import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthStateGuard } from './auth-guard/user-auth-state.guard';
import { UserAuthGuard } from './auth-guard/user-auth.guard';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./pages/books/books.module').then((m) => m.BooksModule),
      },
      {
        path: 'login',
        canActivate: [UserAuthStateGuard],
        loadChildren: () =>
          import('./pages/user/user-login/user-login.module').then(
            (m) => m.UserLoginModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./pages/user/reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: 'account',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import('./pages/user/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'course-play-list',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import(
            './pages/user/course-playlist-view/course-playlist-view.module'
          ).then((m) => m.CoursePlaylistViewModule),
      },
      {
        path: 'my-course',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import('./pages/user/my-enroll/my-enroll.module').then(
            (m) => m.MyEnrollModule
          ),
      },

      {
        path: 'quiz-result',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import('./pages/user/quiz-result/quiz-result.module').then(
            (m) => m.QuizResultModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/payment-status/payment-status.module').then(
            (m) => m.PaymentStatusModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import(
            './pages/additional-page-view/additional-page-view.module'
          ).then((m) => m.AdditionalPageViewModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./pages/all-blogs/all-blogs.module').then(
            (m) => m.AllBlogsModule
          ),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./pages/user/quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
