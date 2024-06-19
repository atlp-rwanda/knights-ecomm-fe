import React, { useState } from 'react';

interface PopupProps {
  title: string;
  submitText: string;
  closeText: string;
  body: React.ReactNode;
  Trigger: React.ReactNode;
  onSubmit: () => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ Trigger, title, body, onSubmit, onClose, submitText, closeText }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openPopup = () => {
    setIsAnimating(true);
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
      onClose();
    }, 500); // Match the duration of the transition
  };

  const submitHandler = () => {
    onSubmit();
    closePopup();
  };
  console.error(Trigger, isAnimating);
  return (
    <div className="relative text-black">
      <button onClick={openPopup} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
        Toggle Popup
      </button>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closePopup}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${isVisible ? 'scale-100' : 'scale-0'}`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          onTransitionEnd={() => !isVisible && setIsAnimating(false)} // Ensure proper state after animation
        >
          <h2 className="text-2xl mb-4 text-start">{title}</h2>
          <div className="mb-4">{body}</div>
          <div className="flex justify-between space-x-4 gap-3">
            <button
              onClick={submitHandler}
              className=" w-1/2 px-4 py-2 border border-custom-secondary text-custom-secondary rounded hover:bg-opacity-40 transition duration-300"
            >
              {submitText}
            </button>
            <button
              onClick={closePopup}
              className="w-1/2 px-4 py-2 bg-custom-primary text-white rounded hover:bg-opacity-90 transition duration-300"
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
