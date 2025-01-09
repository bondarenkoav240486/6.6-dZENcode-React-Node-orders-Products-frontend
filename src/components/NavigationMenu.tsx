import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NavigationMenu: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <nav className="d-flex flex-column gap-2 align-items-start py-2">
      <Link href="/orders">Orders</Link>
      <Link href="/products">Products</Link>
      <Link href="/">Home</Link>
      <Link href="/charts">Charts</Link>
      {isAuthenticated && <Link href="/user-cabinet">User Cabinet</Link>}
    </nav>
  );
};

export default NavigationMenu;
