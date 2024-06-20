export enum ProductActionTypes {
  CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL'
}

export interface CreateProductRequestAction {
  type: ProductActionTypes.CREATE_PRODUCT_REQUEST;
}

export interface CreateProductSuccessAction {
  type: ProductActionTypes.CREATE_PRODUCT_SUCCESS;
  payload: any; // Adjust according to your response data
}

export interface CreateProductFailAction {
  type: ProductActionTypes.CREATE_PRODUCT_FAIL;
  payload: string;
}

export type ProductActions = CreateProductRequestAction | CreateProductSuccessAction | CreateProductFailAction;
