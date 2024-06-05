import logo from '../../public/knights logo.svg';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Knights ecommerce</h1>
      <img className="logo" src={logo} alt="Knights Logo" />
    </div>
  );
};

export default Welcome;
