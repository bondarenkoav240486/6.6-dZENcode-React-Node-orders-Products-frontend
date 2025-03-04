import React, { useState, lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders, removeOrder } from '../redux/slices/ordersSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { enUS, uk } from 'date-fns/locale';
import { formatDate, calculateProductCount, calculateTotal } from '../utils/utils';

const OrderDetails = lazy(() => import('../components/OrderDetails'));

const OrdersPage = () => {
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

  const handleDeleteClick = () => {
    if (selectedOrder !== null) {
      dispatch(removeOrder(selectedOrder));
      setSelectedOrder(null);
      setShowPopup(false);
    }
  };
  products.filter(product => product.order === selectedOrder)
  return (
    <div className='orders d-flex '>
      <div className='orders_list'>
        {orders.map(order => (
          <motion.div
            key={order.orderId}
            className='d-flex order_string'
            onClick={() => setSelectedOrder(order.orderId)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h5>{order.title}</h5>
            <p className="card-text">{t('productsCount')}: {calculateProductCount(order.orderId, products)}</p>
            <p className="card-text">{t('date')} (en-US): {formatDate(order.date, enUS)}</p>

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
            <Suspense fallback={<div>Loading...</div>}>
              <OrderDetails
                order={orders.find(order => order.orderId === selectedOrder)!}
                products={products.filter(product => product.order === selectedOrder)}
                t={t}
                setShowPopup={setShowPopup}
                setSelectedOrder={setSelectedOrder}
              />
            </Suspense>
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

export default OrdersPage;