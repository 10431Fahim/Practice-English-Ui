import { ChildCategory } from './child-category.interface';
import { Instructor } from './instructor.interface';
import { SubCategory } from './sub-category.interface';
import { Tag } from './tag.interface';
import {Quiz} from './quiz.interface';
import {Category} from './category.interface';

export interface Course {
  _id?: string;
  name: string;
  slug: string;
  type: 'video-course' | 'live-course' | 'lecture-sheet';
  description?: string;
  bannerImage?: string;
  image?:string;
  introYoutubeVideo?: string;
  category?: Category;
  subCategory?: SubCategory;
  tag?: Tag;
  instructor?: Instructor;
  learningScopes?: string[];
  benefits?: string[];
  opportunities?: string[];
  isLiveClass?: boolean;
  groupLink?: string;
  courseModules?: CourseModule[];
  prices?: Price[];
  childCategory?:ChildCategory,
  isMultiplePrice?: boolean;
  salePrice?: number;
  discountType?: number;
  discountAmount?: number;
  totalSold?: number;
  totalDuration?: string;
  totalUsers?: string;
  totalExam?: string;
  totalClass?: string;
  isAdmission?: boolean;
  pdfAttachments?: PDFAttachment[];
  canSaleAttachment?: boolean;
  specifications?: any;
  attachmentSalePrice?: number;
  attachmentDiscountType?: number;
  attachmentDiscountAmount?: number;
  question?: Quiz;
  status?: string;
  priority?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  orderType?: 'video-course' | 'live-course' | 'lecture-sheet';
}

export interface CourseModule {
  _id?: string;
  name?: string;
  description?: string;
  video?: string;
  benefit?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  step?: string;
  bannerImage?: string;
  attachment?: string;
  quiz?: Quiz;
  type?: string;
  isFree?: boolean;
  videoDurationArray?: string[];
  videoTitleArray?: string[];
  videoUrlArray?: string[];
}

export interface Price {
  _id?: string;
  unit?: string;
  name?: string;
  duration: number,
  costPrice: number,
  salePrice: number,
  discountType: number,
  discountAmount: number;
  specifications: any;
}


export interface PDFAttachment {
  name?: string;
  url?: string;
}
