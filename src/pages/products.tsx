import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';

const Products = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedType, setSelectedType] = useState<string>('');

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
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">All Types</option>
        {[...new Set(products.map(product => product.type))].map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {filteredProducts.map(product => {
        const order = orders.find(order => order.id === product.order);
        return (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Type: {product.type}</p>
            <p>Guarantee Start (en-US): {formatDate(product.guarantee.start, enUS)}</p>
            <p>Guarantee Start (uk): {formatDate(product.guarantee.start, uk)}</p>
            <p>Guarantee End (en-US): {formatDate(product.guarantee.end, enUS)}</p>
            <p>Guarantee End (uk): {formatDate(product.guarantee.end, uk)}</p>
            <p>Price (USD): ${product.price.find(p => p.symbol === 'USD')?.value}</p>
            <p>Price (UAH): ₴{product.price.find(p => p.symbol === 'UAH')?.value}</p>
            <p>Order Title: {order?.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;