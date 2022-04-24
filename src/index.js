import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
//import component
/*import Home from './Home';
import NavBar from './NavBar';
import Footer from './Footer';
import Product from './Product';
import Login from './Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";*/
import App from './App';
import { store } from './app/store';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
//authenticate login action
/*import isLogin from './auth/auth.js';
import setHeader from './api/setHeader';*/

/*if (sessionStorage.getItem('token')) {
  setHeader(sessionStorage.getItem('token'))
}*/
ReactDOM.render(
  <React.StrictMode>
    <SSRProvider>
      <Provider store={store}>
      {/*<BrowserRouter>
        {isLogin() ? (
          <>
            <NavBar/>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/product" element={<Product />} />
              <Route path='*' element={<div>Dit me may!</div>}></Route>
            </Routes>
            <Footer/>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login />}></Route>
          </Routes>
        )}
      </BrowserRouter>*/}
      <App />
      </Provider>
    </SSRProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

