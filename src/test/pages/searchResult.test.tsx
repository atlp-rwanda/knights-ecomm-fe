import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchResultPage from '../../pages/searchPage';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../../redux/reducers/SearchReducer';

const store = configureStore({
  reducer: {
    search: searchReducer
  }
});

describe('SearchResultPage', () => {
  test('renders SearchResultPage component without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResultPage />
        </BrowserRouter>
      </Provider>
    );
  });

  // test('displays loading text when loading state is true', () => {
  //   store.dispatch({ type: 'search/pending' });

  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <SearchResultPage />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   expect(getByText('Loading...')).toBeInTheDocument();
  // });

  // test('displays error message when error state is true', async () => {
  //   store.dispatch({ type: 'search/searchProducts/rejected', payload: 'Error occurred' });

  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <SearchResultPage />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   await waitFor(() => expect(getByText('Error occurred')).toBeInTheDocument());
  // });

  // test('displays products when products are loaded', async () => {
  //   store.dispatch({
  //     type: 'search/fulfilled',
  //     payload: {
  //       data: [
  //         {
  //           id: '1',
  //           name: 'Product 1',
  //           price: '100',
  //           owner: 'John Doe',
  //           image: ['image1.jpg'],
  //         },
  //         {
  //           id: '2',
  //           name: 'Product 2',
  //           price: '100',
  //           owner: 'John Doe',
  //           image: ['image1.jpg'],
  //         },
  //       ],
  //       pagination: {
  //         totalPages: 1,
  //         currentPage: 1,
  //         totalItems: 2,
  //         itemsPerPage: 10,
  //       },
  //     },
  //   });

  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <SearchResultPage />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   await waitFor(() => expect(getByText('Product 1')).toBeInTheDocument());
  //   await waitFor(() => expect(getByText('Product 2')).toBeInTheDocument());
  // });

  // test('handles pagination correctly', async () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <SearchResultPage />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   fireEvent.click(getByText('Next'));

  //   await waitFor(() => expect(getByText('Page 2')).toBeInTheDocument());
  // });
});
