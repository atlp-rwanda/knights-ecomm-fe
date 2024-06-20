import { MoveLeft, Plus, SquarePen } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchSingleProduct } from '../../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

const DashboardSingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, product, error } = useSelector((state: RootState) => state.singleProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="w-full my-8 flex flex-col items-center justify-center gap-8">
        <p className="py-2 px-4 bg-[#E7EBEF] rounded text-black ">The product is expired</p>
        <Link
          to={'/vendor/dashboard/products'}
          className="px-8 py-4 bg-[#070F2B] font-semibold text-white rounded-lg flex gap-4 items-center hover:scale-105 transition-all duration-300 ease-in-out w-max "
        >
          <MoveLeft /> Back
        </Link>
      </div>
    );

  return (
    <div className="flex bg-[#eef5ff] w-full h-full text-black p-8 flex-col items-start">
      <p className="font-bold text-2xl">Product Details</p>
      <p>
        <Link to={'/vendor/dashboard'}>Dashboard</Link> &gt; <Link to={'/vendor/dashboard/products'}>Products</Link>{' '}
        &gt; {product?.name}
      </p>
      <div className="bg-white border-[1px] border-[#7c7c7c] rounded-2xl mt-8 w-full p-8 flex flex-col gap-8">
        <Link
          to={'update'}
          className="px-8 py-4 bg-[#070F2B] font-semibold text-white rounded-lg flex gap-4 items-center hover:scale-105 transition-all duration-300 ease-in-out w-max ml-auto"
        >
          Update product <SquarePen />
        </Link>
        <div className="flex gap-8 lg:flex-row flex-col">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <p className="font-bold text-2xl">General Information</p>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Product Name</p>
              <p className="py-2 px-4 bg-[#E7EBEF] rounded">{product?.name}</p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Description</p>
              <p className="py-2 px-4 bg-[#E7EBEF] rounded">{product?.description}</p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Category</p>
              <p className="py-2 px-4 bg-[#E7EBEF] rounded w-full">
                {product?.categories.map((category) => category.name).join(', ')}
              </p>
            </div>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col items-start gap-1  w-full">
                <p className="font-medium">Availability</p>
                <p className="py-2 px-4 bg-[#E7EBEF] rounded  w-full">{product?.isAvailable ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex flex-col items-start gap-1  w-full">
                <p className="font-medium">Remaining quantity</p>
                <p className="py-2 px-4 bg-[#E7EBEF] rounded  w-full">{product?.quantity}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-8">
              <p className="font-bold text-2xl">Pricing</p>
              <div className="flex gap-4">
                <div className="flex flex-col items-start gap-1  w-full">
                  <p className="font-medium">Price</p>
                  <p className="py-2 px-4 bg-[#E7EBEF] rounded  w-full">{product?.newPrice}</p>
                </div>
                <div className="flex flex-col items-start gap-1  w-full">
                  <p className="font-medium">Old Price</p>
                  <p className="py-2 px-4 bg-[#E7EBEF] rounded  w-full h-full">{product?.oldPrice}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <p className="font-bold text-2xl">Product Media</p>
              <div className="flex flex-col gap-4">
                <p>Product Images</p>
                <div className="grid grid-cols-2 gap-4">
                  {product?.images.map((image, index) => (
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="object-cover rounded h-full"
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <p className="font-bold text-2xl">Discount</p>
            <div className="flex flex-col items-start gap-2 py-4">
              <p className="font-medium">Coupons</p>
              <div className="py-2 px-4 bg-[#E7EBEF] rounded">List of coupons</div>
              <Link
                to={'coupon'}
                className="px-8 py-4 bg-[#E7EBEF] font-semibold text-black rounded-lg flex gap-4 items-center hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Create New Coupon <Plus />
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-2xl">Customer Feedback</p>
              <div className="flex gap-4 flex-col py-8">
                {product?.feedbacks && product?.feedbacks.length > 0 ? (
                  product.feedbacks.map((feedback, index) => (
                    <div className="flex gap-5" key={index}>
                      <img
                        className="w-[70px] h-[70px] rounded-full border border-black"
                        src="https://unsplash.com/photos/a-row-of-parked-cars-on-a-city-street-GxlHugQRrog"
                        alt="Feedback"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-bold ">{feedback?.name}</p>
                        <p>{feedback?.description}</p>
                        <p className="text-[#7c7c7c]">{feedback?.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-2 px-4 bg-[#E7EBEF] rounded w-full text-black">No feedbacks for this product</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleProduct;
