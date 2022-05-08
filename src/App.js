//page
import Home from './page/Home';
import Product from './page/Product';
import Login from './page/Login';
import Account from './page/Account';
import Orders from './page/Orders';
import Statistic from './page/Statistic';
import Error from './page/Error';
import AccessDenied from './page/AccessDenied';
//layout
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
//router
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
//auth
import isLogin from './auth/auth.js';
import setHeader from './api/setHeader';
import { ToastContainer} from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setRole } from "./app/userReducer";
import axios from 'axios';
import { authURL } from './api/config';

export default function App() {
    const dispatch = useDispatch();
    if (isLogin()) {
        setHeader(sessionStorage.getItem('token'))
    }
    useEffect(() => {
        async function storeUser(){
            try {
                const res = await axios.get(`${authURL}/user`);
                // console.log(res.data);
                dispatch(setRole(res.data.rolesUser));
            } catch (err) {
                console.log(err);
            }
        }
        storeUser();
    }, [dispatch])
    return (
        <>
            <ToastContainer autoClose={5000} theme="colored" />
            <BrowserRouter>
                {isLogin() ? (
                    <>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/products" element={<Product />}/>
                            <Route path="/account" element={<Account />}/>
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/statistic" element={<Statistic />} />
                            <Route path="/access-denied" element={<AccessDenied/>} />
                            <Route path='*' element={<Error/>}></Route>
                        </Routes>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="*" element={<Login />}></Route>
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}