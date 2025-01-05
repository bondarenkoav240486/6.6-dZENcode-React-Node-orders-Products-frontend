import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import NavigationMenu from '../components/NavigationMenu';
import TopMenu from '../components/TopMenu';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }: any) {
  return (

    <Provider store={store}>
      <>
        <header>
          <div className="container d-flex justify-content-between py-2 align-items-center">
            <div>ORDERS&PRODUCTS</div>
            <TopMenu />
          </div>
        </header>
        {/* MyApp */}
        <div
          className=" container 
              py-4 d-flex 
              flex-row 
              align-items-start "
              // justify-content-between
              // "
          >
          {/* <div className="py-2 d-flex justify-content-start"> */}
            <NavigationMenu />
          {/* </div> */}
          <Component {...pageProps} />
        </div>

        {/* <div className="container">
          <h1 className="text-center">Привіт, Next.js з Bootstrap!</h1>
          <button className="btn btn-primary">Натисни мене</button>
        </div> */}
      </>
    // </Provider>
  );
}

export default MyApp;
