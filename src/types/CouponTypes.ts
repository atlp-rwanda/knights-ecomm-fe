import React from 'react';
export interface FormPopupProps {
  title: string;
  submitText: string;
  closeText: string;
  body: React.ReactNode;
  trigger: React.ReactNode;
  onSubmit: (data: FormPayload) => void;
  onClose: () => void;
}
export interface FormPayload {
  code: string;
  discountType: 'percentage' | 'amount';
  discountRate: string;
  expirationDate: string;
  maxUsageLimit: number;
  product: string;
}

export interface CouponFormProps {
  onSubmit: (data: FormPayload) => void;
  product: string;
}

export interface PopupProps {
  title: string;
  subtitle: string;
  responseType: 'success' | 'fail';
  duration: number;
}
export interface CreateCouponArgs {
  data: FormPayload;
  vendorid: string;
}
