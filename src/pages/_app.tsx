import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import NavigationMenu from '../components/NavigationMenu';
import TopMenu from '../components/TopMenu';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  return (

    <Provider store={store}>
      <>
        <header>
          <div className="container d-flex justify-content-between py-2 align-items-center">
            <div>ORDERS&PRODUCTS</div>
            <TopMenu />
          </div>
        </header>
        <div
          className=" container 
              py-4 d-flex 
              flex-row 
              align-items-start "
        >
          <NavigationMenu />
          {/* <Component {...pageProps} /> */}
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
      </>
    </Provider>
  );
}

export default MyApp;
