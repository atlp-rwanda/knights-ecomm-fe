import { CircleCheck } from 'lucide-react';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import toast from 'react-hot-toast';
import { createProduct } from '../../../redux/actions/productAction';
import { Link } from 'react-router-dom';

const DashboardNewProducts: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [expirationDate, setExpirationDate] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const { error, loading, product: ProductsResponse } = useSelector((state: RootState) => state.productCreate);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (ProductsResponse) {
      toast.success('product created');
      resetForm();
    }
  }, [error, ProductsResponse]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (productName.trim().length < 3) {
      errors.productName = 'Product name must be at least 3 characters long.';
    }
    if (description.trim().length < 3) {
      errors.description = 'Description must be at least 3 characters long.';
    }
    if (!selectedOption && category2.trim().length < 1) {
      errors.category = 'Please select or enter a category.';
    }
    if (!quantity || isNaN(Number(quantity))) {
      errors.quantity = 'Please enter a valid quantity.';
    }
    if (!newPrice || isNaN(Number(newPrice))) {
      errors.newPrice = 'Please enter a valid price.';
    }
    if (images.length < 2) {
      errors.images = 'Please upload at least two images.';
    }
    if (images.length > 6) {
      errors.images = 'You can upload up to six images only.';
    }
    if (!expirationDate) {
      errors.expirationDate = 'You need an experiry date ';
    }
    return errors;
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setCategory2('');
    setQuantity('');
    setNewPrice('');
    setSelectedOption('');
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('newPrice', newPrice);
    formData.append('categories', selectedOption || category2);
    formData.append('expirationDate', expirationDate || '2025-0-0');

    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData) as any);
  };

  return (
    <div className="flex bg-[#eef5ff] w-full h-full text-black p-8 flex-col items-start">
      <p className="font-bold text-2xl">Add New Product</p>
      <p>Home &gt; Products &gt; #New</p>
      <div className="bg-white border-[1px] border-[#7c7c7c] rounded-2xl mt-8 w-full p-8">
        <div className="w-full flex gap-8">
          <div className="w-1/2 flex flex-col gap-4">
            <p className="font-bold text-2xl">General Information</p>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Product Name</p>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
              />
              {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <p className="font-medium">Category</p>
              <div className="flex justify-between gap-4 w-full">
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="bg-white border-[1px] rounded px-4 py-2 w-full"
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <input
                  value={category2}
                  onChange={(e) => setCategory2(e.target.value)}
                  placeholder="create your own category"
                  className="bg-white border-[1px] rounded px-4 py-2 w-full"
                />
              </div>
              {errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Quantity</p>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
              />
              {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Expiration Date</p>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
              />
              {errors.expirationDate && <p className="text-red-500">{errors.expirationDate}</p>}
            </div>
            <div className="flex flex-col items-start gap-1 mt-8">
              <p className="font-bold text-2xl">Pricing</p>
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium">New Price (Rwf)</p>
                <input
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="bg-white border-[1px] rounded px-4 py-2 w-full"
                />
                {errors.newPrice && <p className="text-red-500">{errors.newPrice}</p>}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-8">
            <p className="font-bold text-2xl">Product Media</p>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Image Upload</p>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
              />
              {errors.images && <p className="text-red-500">{errors.images}</p>}
            </div>
            <div className="flex flex-col">
              {imagePreviews.map((preview, index) => (
                <div className="p-4 rounded-lg bg-[#FAFAFA] flex gap-4" key={index}>
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <p className="text-ellipsis overflow-hidden">{preview}</p>
                  <CircleCheck className="w-12 h-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-8">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-8 py-4 rounded-lg text-white bg-[#070f2b] hover:scale-105 transition-all"
          >
            {loading ? 'Loading...' : ' New Product'}
          </button>
          <Link
            to={'/dashboard/products'}
            className="px-8 py-4 rounded-lg text-white bg-[#7c7c7c] hover:scale-105 transition-all"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewProducts;
