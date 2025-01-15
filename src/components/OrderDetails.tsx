import React, { lazy } from 'react';import { formatDate, calculateProductCount, calculateTotal } from '../utils/utils';
import { enUS, uk } from 'date-fns/locale';
import { Product } from '../redux/slices/productsSlice';
import { Order } from '../redux/slices/ordersSlice';


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
    <div>
      {/* <h3>{t('orderDetails')}</h3> */}
      <h3>{order.title}</h3>
      <p>{t('productsCount')}: {calculateProductCount(order.id, products)}</p>
      <p>{t('date')} (en-US): {formatDate(order.date, enUS)}</p>
      <p>{t('date')} (uk): {formatDate(order.date, uk)}</p>
      <p>{t('totalUSD')}: ${calculateTotal(order.orderId, 'USD', products).toFixed(2)}</p>
      <p>{t('totalUAH')}: ₴{calculateTotal(order.orderId, 'UAH', products).toFixed(2)}</p>
      <button onClick={() => setShowPopup(true)}>{t('delete')}</button>
      <h4>{t('products')}:</h4>
      {/* <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - {product.type} - ${product.price.find((p: { symbol: string }) => p.symbol === 'USD')?.value} - ₴{product.price.find((p: { symbol: string }) => p.symbol === 'UAH')?.value}
          </li>
        ))}
      </ul> */}
      <ProductList
        products={products.filter(product => product.order === order.orderId)}
      />
      <button onClick={() => setSelectedOrder(null)}>{t('close')}</button>
    </div>
  );
};

export default OrderDetails;