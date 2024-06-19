import React, { useState } from 'react';
import FormPopup from './Popups/FormPopup';
import CouponForm from './Forms/CouponForm';
import Popup from './Popups/Popup';
import { PopupProps } from '../types/CouponTypes';
import { useDispatch } from 'react-redux';
import { createCoupon } from '../redux/actions/productAction';
import { decodedToken } from '../services/';

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const tokenDecoded = decodedToken();
  const handleSubmit = async (data: FormData) => {
    try {
      await dispatch(createCoupon({ data, vendorid: tokenDecoded.id })).unwrap();
      setPopupProps({
        title: 'Success',
        subtitle: 'Coupon created successfully.',
        responseType: 'success',
        duration: 3000,
        onClose: () => setShowPopup(false)
      });
      setShowPopup(true);
    } catch (error) {
      setPopupProps({
        title: 'Failure',
        subtitle: `${error.message}`,
        responseType: 'fail',
        duration: 3000,
        onClose: () => setShowPopup(false)
      });
      console.log('---------------');
      console.log(error);
      console.log('---------------');
      setShowPopup(true);
    }
  };
  const product = '056fc8d6-7d45-4ef8-b604-4efd7fb243ae';
  const handleClose = () => {
    clearF;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps>({
    title: '',
    subtitle: '',
    responseType: 'success',
    duration: 3000
  });

  return (
    <div className="App">
      <FormPopup
        trigger={
          <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
            Toggle Popup
          </button>
        }
        title="Create a Coupon"
        submitText="Add Coupon"
        closeText="Cancel"
        body={<CouponForm onSubmit={handleSubmit} product={product} />}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />

      {showPopup && <Popup {...popupProps} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Welcome;
