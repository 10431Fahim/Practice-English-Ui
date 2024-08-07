export interface ShopInformation {
  _id?: string;
  siteName: string;
  shortDescription?: string;
  siteLogo: string;
  tradLicense: string;
  tinId: string;
  offerText: string;
  countdown: boolean;
  news: string;
  addresses: ShopObject[];
  emails: ShopObject[];
  phones: ShopObject[];
  downloadUrls: ShopObject[];
  socialLinks: ShopObject[];
  navLogo: string;
  footerLogo: string;
  othersLogo: string;
  paymentVIdeoUrl:string | any;
}

export interface ShopObject {
  type: number;
  value: string;
}
