import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'PRACTICE_ENG_TOKEN_' + environment.VERSION,
  loggInSession: 'PRACTICE_ENG_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'PRACTICE_ENG_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'PRACTICE_ENG_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'PRACTICE_ENG_USER_0_' + environment.VERSION,
  encryptUserLogin: 'PRACTICE_ENG_USER_1_' + environment.VERSION,
  loginAdminRole: 'PRACTICE_ENG_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'PRACTICE_ENG_USER_CART_' + environment.VERSION,
  productFormData: 'PRACTICE_ENG_PRODUCT_FORM_' + environment.VERSION,
  userWishList: 'PRACTICE_ENG_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'PRACTICE_ENG_USER_CART_' + environment.VERSION,
  recommendedProduct: 'PRACTICE_ENG_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'PRACTICE_ENG_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'PRACTICE_ENG_COOKIE_TERM' + environment.VERSION,
  otpCheck: 'PRACTICE_ENG_COOKIE_TERM_' + environment.VERSION,
});
