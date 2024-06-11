import React from 'react';
import Popup from './Popups/Popup';
import CouponForm from './Forms/CouponForm';

const Welcome: React.FC = () => {
  const handleSubmit = () => {
    console.log('Submit button clicked!');
  };

  const handleClose = () => {
    console.log('Popup closed!');
  };

  return (
    <div className="App">
      <Popup
        trigger={<button>Trigger me</button>}
        title="Create a Coupon"
        submitText="Create a Coupon"
        closeText="Create a Coupon"
        body={<CouponForm />}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </div>
  );
};

export default Welcome;
