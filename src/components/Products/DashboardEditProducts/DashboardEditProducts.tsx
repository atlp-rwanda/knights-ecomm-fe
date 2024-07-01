import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchSingleProduct, updateProduct } from '../../../redux/actions/productAction';
import { CircleCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DashboardEditProducts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, product, error } = useSelector((state: RootState) => state.singleProduct);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setDescription(product.description);
      setQuantity(product.quantity.toString());
      setNewPrice(product.newPrice);
      setOldPrice(product.oldPrice || '0');
      setSelectedOption(product.categories[0]?.name || '');
      setExpirationDate(product.expirationDate);
      setImagePreviews(product.images);
    }
  }, [product]);

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
    if (!selectedOption) {
      errors.category = 'Please select a category.';
    }
    if (!quantity || isNaN(Number(quantity))) {
      errors.quantity = 'Please enter a valid quantity.';
    }
    if (!newPrice || isNaN(Number(newPrice))) {
      errors.newPrice = 'Please enter a valid price.';
    }
    if (images.length > 6) {
      errors.images = 'You can upload up to six images only.';
    }
    if (!expirationDate) {
      errors.expirationDate = 'You need an expiry date';
    } else {
      const selectedDate = new Date(expirationDate);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        errors.expirationDate = 'Expiration date cannot be in the past';
      }
    }
    return errors;
  };

  const handleUpdate = async () => {
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
    formData.append('oldPrice', oldPrice);
    formData.append('categories', selectedOption);
    formData.append('expirationDate', expirationDate);
    images.forEach((image) => {
      formData.append('images', image);
    });
    if (id) {
      try {
        await dispatch(updateProduct({ id, formData })).unwrap();
        toast.success('Product updated successfully!');
        navigate(`/vendor/dashboard/products/${id}`);
      } catch (error: any) {
        toast.error(error.message || 'Failed to update product.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex bg-[#eef5ff] w-full h-full text-black p-8 flex-col items-start">
      <p className="font-bold text-2xl">Update Product</p>
      <p>
        <Link to={'/vendor/dashboard'}>Dashboard</Link> &gt; <Link to={'/vendor/dashboard/products'}>Products</Link>{' '}
        &gt; <Link to={`/vendor/dashboard/products/${id}`}>{product?.name}</Link> &gt; Edit
      </p>
      <div className="bg-white border-[1px] border-[#7c7c7c] rounded-2xl mt-8 w-full p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <p className="font-bold text-2xl">General Information</p>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Product Name</p>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="py-2 px-4 bg-[#E7EBEF] rounded"
              />
              {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-2 px-4 bg-[#E7EBEF] rounded"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Category</p>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="bg-white border-[1px] rounded px-4 py-2 w-full"
                disabled={categories?.length === 0 || !categories}
              >
                <option value="">
                  {categories?.length === 0 || !categories ? 'No categories available' : 'Select an option'}
                </option>
                {categories.map((category) => (
                  <option key={category?.id} value={category?.name}>
                    {category?.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Quantity</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="py-2 px-4 bg-[#E7EBEF] rounded"
              />
              {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="font-medium">Expiration Date</p>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="py-2 px-4 bg-[#E7EBEF] rounded"
              />
              {errors.expirationDate && <p className="text-red-500">{errors.expirationDate}</p>}
            </div>
            <div className="flex flex-col items-start gap-1 mt-8">
              <p className="font-bold text-2xl">Pricing</p>
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium">New Price (Rwf)</p>
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="py-2 px-4 bg-[#E7EBEF] rounded"
                />
                {errors.newPrice && <p className="text-red-500">{errors.newPrice}</p>}
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium">Old Price (Rwf)</p>
                <input
                  type="text"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  className="py-2 px-4 bg-[#E7EBEF] rounded"
                />
                {errors.oldPrice && <p className="text-red-500">{errors.oldPrice}</p>}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <p className="font-bold text-2xl">Product Media</p>
            <div className="flex flex-col gap-4">
              <p className="font-medium">Image Upload</p>
              <input type="file" multiple onChange={handleImageUpload} className="py-2 px-4 bg-[#E7EBEF] rounded" />
              {errors.images && <p className="text-red-500">{errors.images}</p>}
            </div>
            <div className="flex flex-col gap-4">
              {imagePreviews.map((preview, index) => (
                <div className="p-4 rounded-lg bg-[#FAFAFA] flex items-center gap-4" key={index}>
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                  <p className="text-ellipsis overflow-hidden">{preview}</p>
                  <CircleCheck className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-8">
          <button
            disabled={loading}
            onClick={handleUpdate}
            className="px-8 py-4 rounded-lg text-white bg-[#070f2b] hover:scale-105 transition-all"
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
          <Link
            to={'/vendor/dashboard/products'}
            className="px-8 py-4 rounded-lg text-white bg-orange hover:scale-105 transition-all"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardEditProducts;
