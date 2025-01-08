import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/slices/productsSlice';
import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedType, setSelectedType] = useState<string>('');
  const { t } = useTranslation('common');
  const [translatedAllTypes, setTranslatedAllTypes] = useState('');


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setTranslatedAllTypes(t('allTypes'));
  }, [t]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const formatDate = (dateString: string, locale: Locale) => {
    const date = new Date(dateString);
    return format(date, 'PPPP', { locale });
  };

  const filteredProducts = selectedType
    ? products.filter(product => product.type === selectedType)
    : products;

  return (
    <div>
      <motion.select
        onChange={handleTypeChange}
        value={selectedType}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <option value="">{translatedAllTypes}</option>
        {[...new Set(products.map(product => product.type))].map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </motion.select>

      <AnimatePresence>
        {filteredProducts.map(product => {
          const order = orders.find(order => order.id === product.order);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{product.title}</h3>
              <p>{t('type')}: {product.type}</p>
              <p>{t('guaranteeStart')} (en-US): {formatDate(product.guarantee.start, enUS)}</p>
              <p>{t('guaranteeStart')} (uk): {formatDate(product.guarantee.start, uk)}</p>
              <p>{t('guaranteeEnd')} (en-US): {formatDate(product.guarantee.end, enUS)}</p>
              <p>{t('guaranteeEnd')} (uk): {formatDate(product.guarantee.end, uk)}</p>
              <p>{t('priceUSD')}: ${product.price.find(p => p.symbol === 'USD')?.value}</p>
              <p>{t('priceUAH')}: ₴{product.price.find(p => p.symbol === 'UAH')?.value}</p>
              <p>{t('orderTitle')}: {order?.title}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Products;