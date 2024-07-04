import { MoveLeft, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { addFeedback, fetchSingleProduct } from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import FormPopup from '../../components/Popups/FormPopup';
import FeedbackForm from '../../components/Forms/FeedbackForm';
import Popup from '../../components/Popups/Popup';
import { PopupProps } from '../../types/CouponTypes';
import { FeedbackPayload } from '../../types/FeedbackTypes';
const Feedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, product, error } = useSelector((state: RootState) => state.singleProduct);
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState('85042012-3281-4977-97e1-1f63d5ebace0');
  const [popupProps, setPopupProps] = useState<PopupProps>({
    title: '',
    subtitle: '',
    responseType: 'success',
    duration: 3000,
    onClose: () => setShowPopup(false)
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (data: FeedbackPayload) => {
    console.log('===================`');
    console.log(data);
    setOrderId(orderId);
    console.log('===================');
    try {
      await dispatch(addFeedback({ data, productId: id as string })).unwrap();
      setPopupProps({
        title: 'Success',
        subtitle: 'Feedback recorded successfully.',
        responseType: 'success',
        duration: 3000,
        onClose: () => setShowPopup(false)
      });
      setShowPopup(true);
    } catch (error: any) {
      setPopupProps({
        title: 'Failure',
        subtitle: `${error.message}`,
        responseType: 'fail',
        duration: 3000,
        onClose: () => setShowPopup(false)
      });

      setShowPopup(true);
    }
  };
  const handleClose = () => {
    console.log('closed');
  };

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
        <div className="flex gap-8 lg:flex-row flex-col">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2 py-4">
              <p className="font-medium">Reviews</p>
              <div className="block">
                <FormPopup
                  trigger={
                    <button className="px-8 py-4 bg-[#E7EBEF] font-semibold text-black rounded-lg flex gap-4 items-center hover:scale-105 transition-all duration-300 ease-in-out">
                      Add Review <Plus />
                    </button>
                  }
                  title="Create a Review"
                  submitText="Add Review"
                  closeText="Cancel"
                  body={<FeedbackForm onSubmit={handleSubmit} orderId={orderId} title={'Create a Review'} />}
                  onSubmit={handleSubmit}
                  onClose={handleClose}
                />

                {showPopup && <Popup {...popupProps} onClose={() => setShowPopup(false)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
