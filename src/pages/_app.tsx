import { appWithTranslation } from 'next-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '../redux/store';
import { setAuthenticated } from '../redux/slices/authSlice';
import '../styles/globals.css';
import NavigationMenu from '../components/NavigationMenu';
import TopMenu from '../components/TopMenu';
import LanguageSwitcher from '../components/LanguageSwitcher';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '../i18n'; // Import the i18n configuration
import Link from 'next/link';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

function AppContent({ Component, pageProps }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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
    <>
      <header>
        <div className="container d-flex justify-content-between py-2 align-items-center">
          <div>ORDERS&PRODUCTS</div>
          <TopMenu />
          <LanguageSwitcher />
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link href="/auth" legacyBehavior>
                <a>Login</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a>Register</a>
              </Link>
            </>
          )}
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
    </>
  );
}

export default appWithTranslation(MyApp);