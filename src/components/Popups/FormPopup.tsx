import React, { useState } from 'react';
import { FormPayload, FormPopupProps } from '../../types/CouponTypes';

const FormPopup: React.FC<FormPopupProps> = ({ trigger, title, body, onSubmit, onClose, submitText, closeText }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openFormPopup = () => {
    setIsVisible(true);
  };

  const closeFormPopup = () => {
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500); // Match the duration of the transition
  };

  const submitHandler = (data: FormPayload) => {
    onSubmit(data);
    closeFormPopup();
  };
  return (
    <div className="relative text-black">
      <span onClick={openFormPopup}>{trigger}</span>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeFormPopup}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the FormPopup
          onTransitionEnd={() => !isVisible} // Ensure proper state after animation
        >
          <h2 className="text-2xl mb-4 text-start">{title}</h2>
          <div className="mb-4">{React.cloneElement(body as React.ReactElement<any>, { onSubmit: submitHandler })}</div>
          <div className="flex justify-between space-x-4 gap-3">
            <button
              onClick={closeFormPopup}
              className="w-1/2 px-4 py-2 border border-custom-primary text-custom-primary rounded hover:bg-opacity-40 transition duration-300"
            >
              {closeText}
            </button>
            <button
              onClick={() => {
                const form = document.querySelector('form');
                if (form) {
                  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
              }}
              className="w-1/2 px-4 py-2 bg-custom-primary text-white rounded hover:bg-opacity-90 transition duration-300"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
