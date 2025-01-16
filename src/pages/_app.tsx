import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '../redux/store';
import { setAuthenticated } from '../redux/slices/authSlice';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '../i18n'; 
import Link from 'next/link';
import { useEffect, useState, Suspense, lazy } from 'react';
import { useTranslation } from 'next-i18next';

const NavigationMenu = lazy(() => import('../components/NavigationMenu'));
const TopMenu = lazy(() => import('../components/TopMenu'));
const LanguageSwitcher = lazy(() => import('../components/LanguageSwitcher'));


function MyApp({ Component, pageProps, router }: AppProps) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} router={router} />
    </Provider>
  );
}

function AppContent({ Component, pageProps, router }: AppProps) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { t } = useTranslation('common');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setAuthenticated(false));
    router.push('/');
  };

  return (
    <div >
    <Suspense fallback={<div>Loading...</div>}>
      
        <header>
          <div className="container d-flex justify-content-between py-2 align-items-center">
            <h2>ORDERS&PRODUCTS</h2>
            <TopMenu />
            <LanguageSwitcher />
            <div>
              {isAuthenticated ? (
                <button className="btn btn-outline-danger bg-light custom-logout-btn" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link href="/auth" legacyBehavior>
                    <a className="btn btn-outline-primary me-2">{t('login')}</a>
                  </Link>
                  <Link href="/register" legacyBehavior>
                    <a className="btn btn-outline-secondary">{t('register')}</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="container py-4 d-flex flex-row align-items-start">
          <NavigationMenu />
          <div className="content">
            <AnimatePresence mode="wait">
              <motion.div
                key={router.route}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      
    </Suspense>
    </div>
  );
}

export default appWithTranslation(MyApp);