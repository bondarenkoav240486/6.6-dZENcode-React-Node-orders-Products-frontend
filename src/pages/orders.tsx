import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);

  const formatDate = (dateString: string, locale: Locale) => {
    const date = new Date(dateString);
    return format(date, 'PPPP', { locale });
  };

  const calculateTotal = (orderProducts: { id: string; amount: number }[]) => {
    return orderProducts.reduce((total, orderProduct) => {
      const product = products.find(p => p.id === parseInt(orderProduct.id));
      if (product) {
        const usdPrice = product.price.find(p => p.symbol === 'USD')?.value || 0;
        return total + usdPrice * orderProduct.amount;
      }
      return total;
    }, 0);
  };

  const calculateProductCount = (orderProducts: { id: string; amount: number }[]) => {
    return orderProducts.reduce((total, orderProduct) => total + orderProduct.amount, 0);
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>{order.title}</h3>
          <p>Products count: {calculateProductCount(order.products)}</p>
          <p>Date (en-US): {formatDate(order.date, enUS)}</p>
          <p>Date (ru): {formatDate(order.date, uk)}</p>
          <p>Total (USD): ${calculateTotal(order.products).toFixed(2)}</p>
          <p>Total (UAH): ₴{(calculateTotal(order.products) * 26).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;