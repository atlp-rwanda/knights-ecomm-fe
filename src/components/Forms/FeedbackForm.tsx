import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FeedbackFormProps, FeedbackPayload } from '../../types/FeedbackTypes';

interface FormErrors {
  comment: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, orderId, updateData, title }) => {
  const [formData, setFormData] = useState<FeedbackPayload>({
    comment: updateData?.comment || '',
    orderId
  });
  const [errors, setErrors] = useState<FormErrors>({
    comment: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      comment: ''
    };
    let isValid = true;

    if (!formData.comment) {
      newErrors.comment = 'Comment or Review is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (validateForm()) {
      const data: FeedbackPayload = {
        ...formData
      };
      onSubmit(data);
      if (!updateData) {
        clearForm();
      }
    }
  };

  const clearForm = (): void => {
    setFormData({
      comment: '',
      orderId
    });
    setErrors({
      comment: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form id={`${title.split(' ').join('')}-form`} onSubmit={handleSubmit} className="w-[542px]">
      <div className="flex gap-2 flex-col items-start">
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          id="review"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          className={`text-sm outline-none w-full p-2 h-9 border ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } rounded bg-transparent`}
        />
        <input
          type="text"
          id="different"
          name="different"
          value={orderId}
          hidden
          readOnly={true}
          className={`text-sm outline-none w-full p-2 h-9 border ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } rounded bg-transparent`}
        />
        {errors.comment && <span className="text-red-500 text-xs">{errors.comment}</span>}
      </div>
    </form>
  );
};

export default FeedbackForm;
