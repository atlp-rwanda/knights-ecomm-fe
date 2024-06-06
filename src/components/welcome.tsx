import logo from '../../public/knights logo.svg';
import ProductList from './ProductList';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Knights ecommerce</h1>
      <img className="logo" src={logo} alt="Knights Logo" />
      <ProductList/>
    </div>
  );
};

export default Welcome;
