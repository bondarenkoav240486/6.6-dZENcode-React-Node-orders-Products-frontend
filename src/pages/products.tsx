import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/slices/productsSlice';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { useTranslation } from 'next-i18next';
import { formatDate } from '../utils/utils';
import { enUS, uk } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('common');
  const products = useSelector((state: RootState) => state.products.products);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const filteredProducts = selectedType === 'all'
    ? products
    : products.filter(product => product.type === selectedType);

  const productTypes = Array.from(new Set(products.map(product => product.type)));

  return (
    <div className="container mt-5 p-4">
      <h2 className="mb-4">{t('products')}</h2>
      <div className="mb-4">
        <label htmlFor="productType" className="form-label">{t('filterByType')}</label>
        <select id="productType" className="form-select" value={selectedType} onChange={handleTypeChange}>
          <option value="all">{t('allTypes')}</option>
          {productTypes.map(type => (
            <option key={type} value={type}>{t(type)}</option>
          ))}
        </select>
      </div>
      <div className="row">
        <AnimatePresence>
          {filteredProducts.map(product => {
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

export default ProductsPage;