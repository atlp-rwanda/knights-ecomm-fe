export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  newPrice: string;
  oldPrice: string | null;
  expirationDate: string;
  quantity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  categories: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  vendor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string | null;
  };
  feedbacks: any[];
}

export interface ProductsResponse {
  data: {
    products: Product[];
  };
}

export interface VendorProduct {
  data: {
    products: Product[];
  };
}
