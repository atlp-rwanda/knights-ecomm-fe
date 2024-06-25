import React, { useState } from 'react';
import { FormPopupProps } from '../../types/CouponTypes';

const ConfirmDeletePopup: React.FC<FormPopupProps> = ({
  trigger,
  title,
  body,
  onSubmit,
  submitText = 'Yes',
  closeText = 'No'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const openFormPopup = () => {
    setIsVisible(true);
  };

  const closeFormPopup = () => {
    setIsVisible(false);
  };

  const handleConfirm = (e: any) => {
    if (onSubmit) onSubmit(e);
    closeFormPopup();
  };

  return (
    <div className="relative text-black">
      <span onClick={openFormPopup}>{trigger}</span>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out">
          <div className="bg-white z-50 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out">
            <h2 className="text-2xl mb-4 text-start">{title}</h2>
            <div className="mb-4">{body}</div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeFormPopup}
                className="px-4 py-2 border border-primary text-primary rounded hover:bg-opacity-40 transition duration-300"
              >
                {closeText}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition duration-300"
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDeletePopup;
