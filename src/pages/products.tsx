import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/slices/productsSlice';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { useTranslation } from 'next-i18next';
import { formatDate } from '../utils/utils';
import { enUS, uk } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products: React.FC = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mt-5 p-4">
      <h2 className="mb-4">{t('products')}</h2>
      <div className="row">
        <AnimatePresence>
          {products.map(product => {
            const order = orders.find(order => order.orderId === product.order);
            return (
              <motion.div
                key={product.productId}
                className="col-md-6 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{product.title}</h3>
                    <p className="card-text">{t('type')}: {product.type}</p>
                    <p className="card-text">{t('guaranteeStart')} (en-US): {formatDate(product.guarantee.start, enUS)}</p>
                    <p className="card-text">{t('guaranteeStart')} (uk): {formatDate(product.guarantee.start, uk)}</p>
                    <p className="card-text">{t('guaranteeEnd')} (en-US): {formatDate(product.guarantee.end, enUS)}</p>
                    <p className="card-text">{t('guaranteeEnd')} (uk): {formatDate(product.guarantee.end, uk)}</p>
                    <p className="card-text">{t('priceUSD')}: ${product.price.find(p => p.symbol === 'USD')?.value}</p>
                    <p className="card-text">{t('priceUAH')}: ₴{product.price.find(p => p.symbol === 'UAH')?.value}</p>
                    <p className="card-text">{t('orderTitle')}: {order?.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;