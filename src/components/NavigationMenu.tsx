import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationMenu: FC = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { t } = useTranslation('common');

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div className="d-flex flex-column">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''} text-primary`}>
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/orders" className={`nav-link ${router.pathname === '/orders' ? 'active' : ''} text-primary`}>
                {t('orders')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link ${router.pathname === '/products' ? 'active' : ''} text-primary`}>
                {t('products')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/charts" className={`nav-link ${router.pathname === '/charts' ? 'active' : ''} text-primary`}>
                {t('chartsAndMap')}
              </Link>
            </li>
            <br />
            {isAuthenticated && (
              <li className="nav-item">
                <span className='defendAuthRoute'>!Private Auth Route:</span>
                <Link href="/user-cabinet" className={`nav-link ${router.pathname === '/user-cabinet' ? 'active' : ''} text-primary defendAuthRoute`}>
                  {t('userCabinet')}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
