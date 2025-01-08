// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import Orders from '../orders'; // Переконайтеся, що імпорт відповідає точній назві файлу
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../i18n';
// import '@testing-library/jest-dom';
// import { mockStore as mockStoreData } from './mocks/mockOrdersData';
// import ordersReducer from '../../redux/slices/ordersSlice';
// import productsReducer from '../../redux/slices/productsSlice';


// interface RootState {
//   orders: {
//     orders: Array<{
//       id: number;
//       title: string;
//       date: string;
//       description: string;
//       products: Array<{
//         id: number;
//         title: string;
//         type: string;
//         price: Array<{ symbol: string; value: number; isDefault: number }>;
//         order: number;
//       }>;
//     }>;
//   };
//   products: {
//     products: Array<{
//       id: number;
//       title: string;
//       type: string;
//       price: Array<{ symbol: string; value: number; isDefault: number }>;
//       order: number;
//       serialNumber: number;
//       isNew: number;
//       photo: string;
//       specification: string;
//       guarantee: { start: string; end: string };
//       date: string;
//     }>;
//   };
// }

// const store = configureStore({
//   reducer: {
//     orders: ordersReducer,
//     products: productsReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   preloadedState: mockStoreData,
// });

// describe('Orders Component', () => {
//   test('renders without crashing', () => {
//     render(
//       <Provider store={store}>
//         <I18nextProvider i18n={i18n}>
//           <Orders />
//         </I18nextProvider>
//       </Provider>
//     );

//     expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/Order 2/i)).toBeInTheDocument();
//   });

//   test('displays order details when an order is selected', () => {
//     render(
//       <Provider store={store}>
//         <I18nextProvider i18n={i18n}>
//           <Orders />
//         </I18nextProvider>
//       </Provider>
//     );

//     fireEvent.click(screen.getByText(/Order 1/i));

//     expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/productsCount/i)).toBeInTheDocument();
//     expect(screen.getByText(/date/i)).toBeInTheDocument();
//     expect(screen.getByText(/totalUSD/i)).toBeInTheDocument();
//     expect(screen.getByText(/totalUAH/i)).toBeInTheDocument();
//   });

//   test('closes order details when close button is clicked', () => {
//     render(
//       <Provider store={store}>
//         <I18nextProvider i18n={i18n}>
//           <Orders />
//         </I18nextProvider>
//       </Provider>
//     );

//     fireEvent.click(screen.getByText(/Order 1/i));
//     fireEvent.click(screen.getByText(/close/i));

//     expect(screen.queryByText(/productsCount/i)).not.toBeInTheDocument();
//   });
// });