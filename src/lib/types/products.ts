export interface IProduct {
  _rev: string;
  _id: string;
  category: ICategory;
  description: string;
  productCare: ProductCare[];
  price: number;
  _updatedAt: Date;
  _createdAt: Date;
  genderCategory: IGenderCategory;
  _type: string;
  title: string;
  images: Image[];
}

export interface ICategory {
  productCategory: string;
}

export interface IGenderCategory {
  _ref?: string;
  _type?: string;
  genderAndAge?: string;
}

export interface Image {
  _type: string;
  _key: string;
  asset: IGenderCategory;
}

export interface ProductCare {
  _type: string;
  style: string;
  _key: string;
  listItem: string;
  markDefs: any[];
  children: Child[];
  level: number;
}

export interface Child {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
}
