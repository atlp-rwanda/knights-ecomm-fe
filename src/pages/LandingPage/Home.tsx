import React, { useEffect, useState } from 'react';
import CategoriesMenu from '../../components/Menu/CategoriesMenu';
import ClientProductCard, { ProductProp } from '../../components/Products/ProductCard/ClientProductCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import HeroSection from '../../components/Banners/HeroSection';
import { setBanners, setCurrentBanner } from '../../redux/reducers/bannerReducer';
import { FormatPosted, calculateRate } from '../../utils/bannerRateTime';
import Banner from '../../components/Banners/Banner';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';

const Home = () => {
  const [productList, setProductList] = useState<ProductProp[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<JSX.Element[]>([]);
  const [viewProducts, setViewProducts] = useState<JSX.Element[]>([]);
  const [viewItems, setViewItems] = useState(12);
  const { currentCategory } = useSelector((state: RootState) => state.category);
  const { banners, currentBanner } = useSelector((state: RootState) => state.banner);
  const [loading, setLoading] = useState(true);
  const [selectedBanner, setSelectedBanners] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/product/all`)
      .then((response) => {
        setProductList(response.data.data.products);
        setLoading(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        toast.error('Something went wrong fetching products.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const productCards = [];
    for (let i = 0; i < productList.length; i++) {
      if (!currentCategory) {
        productCards.push(<ClientProductCard product={productList[i]} key={i} />);
      }
      if (currentCategory) {
        for (let j = 0; j < productList[i].categories.length; j++) {
          if (currentCategory.toLowerCase() === productList[i].categories[j].name.toLowerCase()) {
            productCards.push(<ClientProductCard product={productList[i]} key={i} />);
          }
        }
      }
    }
    if (productCards) {
      setSelectedProducts(productCards);
    }
  }, [currentCategory, productList, viewItems]);

  useEffect(() => {
    const tempBanners = [];
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].oldPrice) {
        const result = calculateRate(productList[i].newPrice, productList[i].oldPrice!);
        if (result) {
          const time = FormatPosted(new Date(productList[i].updatedAt));
          tempBanners.push({
            rate: result,
            time: time,
            title: productList[i].name,
            id: productList[i].id,
            image: productList[i].images[0]
          });
        }
      }
    }

    tempBanners.length && dispatch(setBanners(tempBanners));
  }, [dispatch, productList]);

  useEffect(() => {
    let productCards;
    if (selectedProducts.length >= viewItems) {
      productCards = selectedProducts.slice(0, viewItems);
    } else {
      productCards = selectedProducts;
    }
    setViewProducts(productCards);
  }, [viewItems, selectedProducts]);

  const handleAddMore = () => {
    setViewItems((prevViewItems) => prevViewItems + 4);
  };

  useEffect(() => {
    const bannerElements: JSX.Element[] = [];
    banners.forEach((banner) => {
      bannerElements.push(<Banner rate={banner.rate} time={banner.time} image={banner.image} />);
    });

    banners.length > 0 && setSelectedBanners(bannerElements);
    const intervalIdentifier = setInterval(() => {
      if (banners.length > currentBanner) {
        dispatch(setCurrentBanner(currentBanner + 1));
      } else {
        dispatch(setCurrentBanner(0));
      }
    }, 10000);
    return () => clearInterval(intervalIdentifier);
  }, [banners, currentBanner, dispatch]);

  return (
    <div className="text-baseBlack">
      <div className="hidden xmd:flex">
        <CategoriesMenu />
      </div>
      <div>
        <div>{currentBanner === 0 && <HeroSection />}</div>
        <div className="flex w-[100%] justify-center">{currentBanner > 0 && selectedBanner[currentBanner - 1]}</div>
      </div>
      <div className="flex flex-col items-center justify-around gap-y-12 py-12 xmd:px-8 lg:px-16" id="products">
        <h1 className="text-2xl font-medium">Explore our collections</h1>

        {loading && (
          <div className="w-full flex justify-center px-6 py-20" data-testid="loading-spinner">
            <PropagateLoader color="#070f2b" />
          </div>
        )}

        {!loading && (
          <div className="w-full flex gap-y-10 justify-center flex-wrap gap-x-5 px-6 xmd:px-0">
            {viewProducts.length > 0 ? viewProducts : `${currentCategory} Products sold out !! Come back later`}
            {/* <ClientProductCard /> */}
          </div>
        )}
      </div>
      {selectedProducts.length > viewItems && (
        <div className="w-full flex items-center justify-center p-12">
          <button
            onClick={handleAddMore}
            className="w-[250px] flex justify-center gap-x-3 items-center rounded-3xl min-h-[50px] ml-1 text-primary border  border-primary hover:bg-gray-100"
          >
            Load more products
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
