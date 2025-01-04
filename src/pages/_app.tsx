import { Provider } from 'react-redux';
import { store } from '../redux/store';
// import '../styles/globals.css';
import NavigationMenu from '../components/NavigationMenu';
import TopMenu from '../components/TopMenu';


function MyApp({ Component, pageProps }: any) {
  return (
    
    <Provider store={store}>
    <>
      <NavigationMenu />
      <TopMenu />
      

      MyApp

      <Component {...pageProps} />
      </>
    // </Provider>
  );
}

export default MyApp;
