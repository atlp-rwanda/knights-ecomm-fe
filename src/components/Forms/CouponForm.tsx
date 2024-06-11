import React from 'react';

const CouponForm = () => {
  return (
    <form className="w-[542px]">
      <div className="flex pad-3 flex-col items-start">
        <label htmlFor="couponCode" className="block mb-2">
          code
        </label>
        <input
          type="text"
          id="couponCode"
          name="couponCode"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
          required
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex pad-3 flex-col items-start w-fit  ">
          <label htmlFor="discountType" className="block mb-2 whitespace-nowrap">
            Discount type
          </label>
          <select
            id="discountType"
            name="discountType"
            className="w-full p-2 px-4 mb-4 border border-gray-300 rounded bg-transparent"
          >
            <option value="percentage"> Percentage </option>
            <option value="amount"> Amount </option>
          </select>
        </div>

        <div className="flex pad-3 flex-col items-start w-4/5">
          <label htmlFor="discountValue" className="block mb-2">
            Rate/Amount
          </label>
          <input
            type="text"
            id="discountValue"
            name="discountValue"
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
            placeholder="20%"
            required
          />
        </div>
      </div>

      <div className="flex pad-3 flex-col items-start">
        <label htmlFor="expirationDate" className="block mb-2">
          Expiration Date
        </label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
          required
        />
      </div>
      <div className="flex pad-3 flex-col items-start">
        <label htmlFor="usageLimit" className="block mb-2">
          Usage Limit
        </label>
        <input
          type="number"
          id="usageLimit"
          name="usageLimit"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
          min="0"
          defaultValue="0"
        />
      </div>
    </form>
  );
};

export default CouponForm;
