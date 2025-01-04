import Link from 'next/link';

const NavigationMenu = () => (
  <nav>
    <Link href="/orders">Orders</Link>
    <Link href="/products">Products</Link>
  </nav>
);

export default NavigationMenu;
