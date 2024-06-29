
export type Order = {
  _id?: string;
  name?: string;
  phoneNo?: string;
  email?: string;
  paymentStatus?: string;
  orderStatus?: string;
  subTotal?: number;
  discount?: number;
  grandTotal?: number;
  partialAmount?: number;
  paidAmount?: number;
  checkoutDate?: string;
  isPartialPaymentOrder?: boolean;
  isFreeOrder?: boolean;
  note?: string;
  user?: string;
  orderType?: 'video-course' | 'live-course' | 'lecture-sheet';
  liveCourseCode?: string;
  orderItem?: Item;
  review?: any;
  liveGroupLink?: string;
  expiredIn?: any;
  createdAt?: string;
  updatedAt?: string;
};

export interface Item {
  _id?: string;
  name?: string;
  slug?: string;
  image?:string;
  category?: any;
  subCategory?: any;
  childCategory?: any;
  isLiveClass?: boolean;
  salePrice?: number;
  discountType?: number;
  discountAmount?: number;
  specifications?: any;
  unit?: any;
}
