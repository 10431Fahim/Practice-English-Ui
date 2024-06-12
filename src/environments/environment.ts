// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: true,
  name: 'practiceenglishschool.softlabit.com',
  domain: 'practiceenglishschool.softlabit.com',

  // apiBaseLink: 'https://api.practiceenglishschool.softlabit.com',
  // ftpBaseLink: 'https://ftp.practiceenglishschool.softlabit.com',
  // ftpPrefixPath: 'https://api.practiceenglishschool.softlabit.com/upload/images',


  apiBaseLink: 'http://localhost:3000',
  ftpBaseLink: 'http://localhost:3000',
  ftpPrefixPath: 'http://localhost:3000/upload/images',

  ftpPrefix: 'api',

  sslIpnUrl: 'http://localhost:4001/api/payment/ssl-ipn',

  bkashCallbackUrl: 'http://localhost:4200/payment/check-bkash-payment',
  bkashProductCallbackUrl: 'http://localhost:4200/payment/check-bkash-product-payment',
  videoBaseLink: 'http://localhost:1441/api/bucket/file-stream/',
  appBaseUrl: '/',
  userBaseUrl: 'account',
  userLoginUrl: 'login',
  userProfileUrl: '/my-profile',
  storageSecret: 'SOFT_2021_IT_1998',
  userTokenSecret: 'SOFT_ADMIN_1996_&&_SOBUR_dEv',
  apiTokenSecret: 'SOFT_API_1998_&&_SAZIB_dEv',
  VERSION: 2,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
