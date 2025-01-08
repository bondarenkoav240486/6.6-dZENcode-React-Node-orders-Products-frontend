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
    <ul>
      {products?.map(product => (
        <li key={product.id}>
          {product.title} - {product.type} - ${product.price.find((p: Price) => p.symbol === 'USD')?.value} - ₴{product.price.find((p: Price) => p.symbol === 'UAH')?.value}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;