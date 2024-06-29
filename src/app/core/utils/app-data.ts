import {Select} from '../../interfaces/core/select.interface';
import {OrderStatus} from "../../enum/order.enum";

export const GENDERS: Select[] = [
  {value: 'male', viewValue: 'Male'},
  {value: 'female', viewValue: 'Female'},
  {value: 'other', viewValue: 'Other'}
];

export const RAW_SRC: string = '384w, 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w';

export const ORDER_STATUS: Select[] = [
  { value: OrderStatus.PENDING, viewValue: 'Pending'},
  { value: OrderStatus.CONFIRM, viewValue: 'Approved'},
  { value: OrderStatus.SHIPPING, viewValue: 'Shipped'},
  { value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
  { value: OrderStatus.CANCEL, viewValue: 'Cancelled'},
  { value: OrderStatus.REFUND, viewValue: 'Refund'},
];




export const PaymentMethod: any[] = [
  {
    id: '1',
    name: 'Cash on Delivery',
    title: 'Pay with cash upon delivery.',
    image: 'https://www.rokomari.com/static/200/images/cod.png',
    paymentType: 'cash_on_delivery',
  },
  {
    id: '2',
    name: 'Online Payment',
    title: 'Pay with online.',
    image: '/assets/images/brand/logo/bkash-logo-FBB258B90F-seeklogo.com.png',
    paymentType: 'online_payment',
  },
];
