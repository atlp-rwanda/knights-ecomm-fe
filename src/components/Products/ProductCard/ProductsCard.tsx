import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductsCardProps {
  data: {
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
    categories: Category[];
    vendor: Vendor;
    // feedbacks: Feedback[];
  };
}
interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Vendor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string | null;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ data }) => {
  const { id, images, name, categories, newPrice, description, expirationDate } = data;

  const dateObject = new Date(expirationDate);
  const formattedExpirationDate = `${dateObject.getMonth() + 1}-${dateObject.getDate()}-${dateObject.getFullYear()}`;

  return (
    <Link to={`${id}`} className="w-full p-4 rounded-md shadow-lg bg-[#E7EBEF] flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <img src={images[0]} alt="product-image" className="w-[84px] h-[84px] object-cover rounded-lg" />
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-black/60">{categories[0].name}</p>
            <p className="font-semibold text-[#232321] mt-4">{newPrice}</p>
          </div>
          <button className="p-2 rounded border bg-red-100/50 h-max">
            <Trash2 className="text-red-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Description</p>
          <p className="text-[#232321]">{description}</p>
        </div>
        <div>
          <div className="py-2 border-t-[1px] border-[#232321] w-full flex justify-between">
            <p className="font-semibold">Remaining Quantity</p>
            <p className="text-[#232321]">10</p>
          </div>
          <div className="py-2 border-t-[1px] border-[#232321] w-full flex justify-between">
            <p className="font-semibold">Expiration Date</p>
            <p className="text-[#232321]">{formattedExpirationDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
