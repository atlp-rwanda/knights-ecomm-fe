export interface Product {
  id: number;
  name: string;
  // Add other product fields here
}

export interface ProductsResponse {
  data: {
    products: Product[];
  };
}
