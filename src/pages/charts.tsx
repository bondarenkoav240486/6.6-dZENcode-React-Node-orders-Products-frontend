import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { calculateTotal } from '../utils/utils';
import dynamic from 'next/dynamic';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Динамічний імпорт компонента карти
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const ChartsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);

  const orderTitles = orders.map(order => order.title);
  const totalUAH = orders.map(order => calculateTotal(order.id, 'UAH', products));
  const totalUSD = orders.map(order => calculateTotal(order.id, 'USD', products));

  const productTypes = Array.from(new Set(products.map(product => product.type)));
  const totalValueByType = productTypes.map(type => {
    const productsOfType = products.filter(product => product.type === type);
    return productsOfType.reduce((total, product) => {
      const priceInUAH = product.price.find(p => p.symbol === 'UAH')?.value || 0;
      return total + priceInUAH;
    }, 0);
  });

  const totalValue = totalValueByType.reduce((total, value) => total + value, 0);
  const percentageByType = totalValueByType.map(value => (value / totalValue) * 100);

  const totalUAHData = {
    labels: orderTitles,
    datasets: [
      {
        label: 'Total UAH',
        data: totalUAH,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalUSDData = {
    labels: orderTitles,
    datasets: [
      {
        label: 'Total USD',
        data: totalUSD,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: productTypes,
    datasets: [
      {
        label: 'Percentage of Total Value',
        data: percentageByType,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Charts',
      },
    },
  };

  return (
    <div>
      <h1>Charts & Map</h1>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <h2>Total UAH per Order</h2>
        <Bar data={totalUAHData} options={options} />
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <h2>Total USD per Order</h2>
        <Bar data={totalUSDData} options={options} />
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <h2>Percentage of Total Value by Product Type</h2>
        <Pie data={pieData} options={options} />
      </div>
      <div style={{ width: '75%', margin: '0 auto' }}>
        <h2>Map</h2>
        <Map />
      </div>
    </div>
  );
};

export default ChartsPage;