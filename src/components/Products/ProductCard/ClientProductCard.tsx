import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
interface Props {
  product: ProductProp;
}
export interface Category {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  products: [
    {
      id: string;
    }
  ];
}
export interface User {
  firstName: string;
  lastName: string;
}
export interface ProductProp {
  categories: Category[];
  createdAt: Date;
  description: string;
  expirationDate?: Date;
  feedbacks?: string[];
  id?: string;
  images: string[];
  isAvailable: boolean;
  name: string;
  newPrice: string;
  oldPrice?: string;
  quantity: string;
  updatedAt: Date;
  vendor?: User;
}
const ClientProductCard = (props: Props) => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { currentCategory } = useSelector((state: RootState) => state.category);
  return (
    <div className="group cursor-pointer flex flex-col gap-y-2 w-[15.6rem] text-sm hover:bg-neutral-200 p-2 rounded relative duration-200">
      {userToken && (
        <div className="group-hover:flex sm:flex md:hidden absolute right-4 top-4 bg-baseWhite w-8 h-8 pt-[2px] justify-center xmd:items-center text-center rounded-full">
          <i className="fa-regular fa-heart text-lg"></i>
        </div>
      )}
      <div className="bg-neutral-400 h-[19.5rem] p-2">
        <img src={props.product.images[0]} alt="" className=" h-full object-contain" />
      </div>
      <div className="text-neutral-600">
        <p>{props.product.name}</p>
        {!props.product.categories[0] && <p>product</p>}
        {props.product.categories[0] && <p>{currentCategory ? currentCategory : props.product.categories[0].name}</p>}
      </div>
      <p>{props.product.vendor?.lastName + ' ' + props.product.vendor?.firstName}</p>
      <p className="text-error200">RWF {props.product.newPrice}</p>
    </div>
  );
};
export default ClientProductCard;
