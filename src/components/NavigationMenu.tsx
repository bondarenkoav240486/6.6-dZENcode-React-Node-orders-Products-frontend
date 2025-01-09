import Link from 'next/link';

const NavigationMenu = () => (
  <nav className="d-flex flex-column gap-2 align-items-start py-2">
    <Link href="/orders">Orders</Link>
    <Link href="/products">Products</Link>
    <Link href="/">Home</Link>
    <Link href="/charts">Charts</Link>
  </nav>
);

export default NavigationMenu;
