import './styles/App.css';
import Layout from './layout/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
       <Layout/>   
    </Provider>
  
  );
}

export default App;
