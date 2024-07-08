import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({ amount }: { clientSecret: string; amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      }
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 border lg:w-[500px] shadow-lg rounded-xl gap-8 flex flex-col ">
      <div className="flex flex-col gap-4 pb-8 border-b ">
        <p className="font-semibold text-xl">Order Summary</p>
        <div className="flex gap-4 justify-between">
          <p className="text-2xl font-semibold text-lime-800">Order Total</p>
          <p className="text-2xl font-semibold text-lime-800">{amount}</p>
        </div>
      </div>
      <p className="font-semibold text-xl ">Payment Details</p>
      <PaymentElement />
      <button
        disabled={isProcessing || !stripe || !elements}
        type="submit"
        className="py-4 px-8 rounded-md bg-blue-500 font-medium text-white mt-8"
      >
        {isProcessing ? 'Processing ...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
