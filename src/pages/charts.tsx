import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { calculateTotal } from '../utils/utils';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Динамічний імпорт компонента карти
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const ChartsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);

  const orderTitles = orders.map(order => order.title);
  const totalUAH = orders.map(order => calculateTotal(order.orderId, 'UAH', products));
  const totalUSD = orders.map(order => calculateTotal(order.orderId, 'USD', products));

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

  return (
    <div className="container  p-4">
      <h2 className="mb-4">{t('chartsAndMap')}</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h4 className="text-center">{t('totalUAH')}</h4>
          <Bar data={totalUAHData} />
        </div>
        <div className="col-md-6 mb-4">
          <h4 className="text-center">{t('totalUSD')}</h4>
          <Bar data={totalUSDData} />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="text-center">{t('percentageByProductType')}</h4>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="mt-5">
        <Map />
      </div>
    </div>
  );
};

export default ChartsPage;