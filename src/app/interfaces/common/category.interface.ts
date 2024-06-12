export interface Category {
  readOnly?: boolean;
  _id?: string;
  name: string;
  description?: string;
  slug?: string;
  image?:string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
