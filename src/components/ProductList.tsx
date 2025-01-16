import React from 'react';
import { Product } from '../redux/slices/productsSlice';

interface Price {
  symbol: string;
  value: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="list-group">
      {products?.map(product => (
        <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">{product.title}</h5>
            <p className="mb-1">{product.type}</p>
            <small>${product.price.find((p: Price) => p.symbol === 'USD')?.value} - ₴{product.price.find((p: Price) => p.symbol === 'UAH')?.value}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;