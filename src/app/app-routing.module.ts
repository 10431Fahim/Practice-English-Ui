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
        path: 'course-details',
        loadChildren: () =>
          import('./pages/course-details/course-details.module').then(
            (m) => m.CourseDetailsModule
          ),
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
        path: 'courses',
        loadChildren: () =>
          import('./pages/all-course/all-course.module').then(
            (m) => m.AllCourseModule
          ),
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
        path: 'my-order',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import('./pages/user/order-list/order-list.module').then(
            (m) => m.OrderListModule
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
        path: 'my-review',
        canActivate: [UserAuthGuard],
        loadChildren: () =>
          import('./pages/user/my-review/my-review.module').then(
            (m) => m.MyReviewModule
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
        path: 'offline-course',
        loadChildren: () =>
          import(
            './pages/offline-course-details/offline-course-details.module'
          ).then((m) => m.OfflineCourseDetailsModule),
      },
      {
        path: 'notice',
        loadChildren: () =>
          import('./pages/all-notice/all-notice.module').then(
            (m) => m.AllNoticeModule
          ),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./pages/user/quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'partial-payment',
        loadChildren: () =>
          import('./pages/partial-payment/partial-payment.module').then(
            (m) => m.PartialPaymentModule
          ),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./pages/product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./pages/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./pages/user/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        canActivate: [UserAuthGuard],
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/user/cart/cart.module').then((m) => m.CartModule),
        canActivate: [UserAuthGuard],
      },
      {
        path: 'order-details',
        loadChildren: () =>
          import('./pages/user/order-details/order-details.module').then(
            (m) => m.OrderDetailsModule
          ),
      },
      {
        path: 'order-track',
        loadChildren: () =>
          import('./pages/user/order-track/order-track.module').then(
            (m) => m.OrderTrackModule
          ),
      },
      {
        path: 'product-review',
        loadChildren: () =>
          import(
            './pages/user/my-product-review/my-product-review.module'
          ).then((m) => m.MyProductReviewModule),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      {
        path: ':slug',
        loadChildren: () =>
          import('./pages/url-redirect/url-redirect.module').then(
            (m) => m.UrlRedirectModule
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
