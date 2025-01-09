import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';
import { Product } from '../redux/slices/productsSlice';

export const formatDate = (dateString: string, locale: Locale) => {
  const date = new Date(dateString);
  return format(date, 'PPPP', { locale });
};

export const calculateTotal = (orderId: number, currency: string, products: Product[]) => {
  const orderProducts = products.filter(product => product.order === orderId);
  return orderProducts.reduce((total, product) => {
    const price = product.price.find(p => p.symbol === currency)?.value || 0; return total + price;
  }, 0);
};

export const calculateProductCount = (orderId: number, products: Product[]) => {
  const orderProducts = products.filter(product => product.order === orderId);
  return orderProducts.length;
};