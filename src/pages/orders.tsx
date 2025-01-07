import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders, removeOrder } from '../redux/slices/ordersSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Orders = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOrderClick = (orderId: number) => {
    setSelectedOrder(orderId === selectedOrder ? null : orderId);
  };

  const handleDeleteClick = () => {
    if (selectedOrder !== null) {
      dispatch(removeOrder(selectedOrder));
      setSelectedOrder(null);
      setShowPopup(false);
    }
  };

  const formatDate = (dateString: string, locale: Locale) => {
    const date = new Date(dateString);
    return format(date, 'PPPP', { locale });
  };

  const calculateTotal = (orderId: number, currency: string) => {
    const orderProducts = products.filter(product => product.order === orderId);
    return orderProducts.reduce((total, product) => {
      const price = product.price.find(p => p.symbol === currency)?.value || 0;
      return total + price;
    }, 0);
  };

  const calculateProductCount = (orderId: number) => {
    const orderProducts = products.filter(product => product.order === orderId);
    return orderProducts.length;
  };

  return (
    <div className='orders d-flex '>
      <div>
        {orders.map(order => (
          <motion.div
            key={order.id}
            className='d-flex'
            onClick={() => handleOrderClick(order.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{order.title}</h3>
            {/* <p>{t('productsCount')}: {calculateProductCount(order.id)}</p>
            <p>{t('date')} (en-US): {formatDate(order.date, enUS)}</p>
            <p>{t('date')} (uk): {formatDate(order.date, uk)}</p>
            <p>{t('totalUSD')}: ${calculateTotal(order.id, 'USD').toFixed(2)}</p>
            <p>{t('totalUAH')}: ₴{calculateTotal(order.id, 'UAH').toFixed(2)}</p>
            <button onClick={() => setShowPopup(true)}>{t('delete')}</button> */}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {selectedOrder !== null && (
          <motion.div
            key={selectedOrder}
            className='order-details'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t('orderDetails')}</h3>
            {orders.filter(order => order.id === selectedOrder).map(order => (
              <div key={order.id}>
                <h3>{order.title}</h3>
                <p>{t('productsCount')}: {calculateProductCount(order.id)}</p>
                <p>{t('date')} (en-US): {formatDate(order.date, enUS)}</p>
                <p>{t('date')} (uk): {formatDate(order.date, uk)}</p>
                <p>{t('totalUSD')}: ${calculateTotal(order.id, 'USD').toFixed(2)}</p>
                <p>{t('totalUAH')}: ₴{calculateTotal(order.id, 'UAH').toFixed(2)}</p>
                <button onClick={() => setShowPopup(true)}>{t('delete')}</button>
                <h4>{t('products')}:</h4>
                <ul>
                  {products.filter(product => product.order === order.id).map(product => (
                    <li key={product.id}>
                      {product.title} - {product.type} - ${product.price.find(p => p.symbol === 'USD')?.value} - ₴{product.price.find(p => p.symbol === 'UAH')?.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={() => setSelectedOrder(null)}>{t('close')}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h3>{t('areYouSure')}</h3>
            <button onClick={handleDeleteClick}>{t('yes')}</button>
            <button onClick={() => setShowPopup(false)}>{t('no')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;