import React, { lazy } from 'react';
import { formatDate, calculateProductCount, calculateTotal } from '../utils/utils';
import { enUS, uk } from 'date-fns/locale';
import { Product } from '../redux/slices/productsSlice';
import { Order } from '../redux/slices/ordersSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

interface OrderDetailsProps {
  order: Order;
  products: Product[];
  t: (key: string) => string;
  setShowPopup: (show: boolean) => void;
  setSelectedOrder: (orderId: number | null) => void;
}

const ProductList = lazy(() => import('../components/ProductList'));

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, products, t, setShowPopup, setSelectedOrder }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{order.title}</h3>
        <p className="card-text">{t('productsCount')}: {calculateProductCount(order.orderId, products)}</p>
        <p className="card-text">{t('date')} (en-US): {formatDate(order.date, enUS)}</p>
        <p className="card-text">{t('date')} (uk): {formatDate(order.date, uk)}</p>
        <p className="card-text">{t('totalUSD')}: ${calculateTotal(order.orderId, 'USD', products).toFixed(2)}</p>
        <p className="card-text">{t('totalUAH')}: ₴{calculateTotal(order.orderId, 'UAH', products).toFixed(2)}</p>
        <h4 className="card-subtitle mb-2">{t('products')}:</h4>
        <ProductList
          products={products.filter(product => product.order === order.orderId)}
        />
        <div className="mt-3">
          <button className="btn btn-light text-success me-2" onClick={() => setSelectedOrder(null)}>{t('close')}</button>
          <button className="btn btn-danger" onClick={() => setShowPopup(true)}>{t('delete')}</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;