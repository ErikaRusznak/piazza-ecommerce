import './styles/App.css';
import "@fontsource/roboto";
import React from "react";

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import AuthProvider, {useAuth} from './api/auth/AuthContext'
import FavoriteProvider from './contexts/FavoriteContext'

import HeaderComponent from "./components/moleculas/header/HeaderComponent";
import ClientLandingPageComponent from "./components/organisms/client/ClientLandingPageComponent";
import LoginPageComponent from "./components/organisms/LoginPageComponent";
import RegisterPageComponent from "./components/organisms/RegisterPageComponent";
import {AuthVerify} from "./api/auth/AuthVerify";
import CartComponent from "./components/organisms/client/CartPageComponent";
import CategoryPageComponent from './components/organisms/CategoryPageComponent'
import ProductPageComponent from './components/organisms/ProductPageComponent'
import CheckoutPageComponent from "./components/organisms/client/CheckoutPageComponent";
import CartProvider from "./contexts/CartContext";
import AlertProvider from "./contexts/AlertContext";
import ProductDetailsPageComponent from "./components/organisms/ProductDetailsPageComponent";
import OrderSuccessfulPageComponent from "./components/organisms/client/OrderSuccessfulPageComponent";
import AdminLandingPageComponent from "./components/organisms/admin/AdminLandingPageComponent";
import LandingPageComponent from "./components/organisms/LandingPageComponent";
import SellerProductsPageComponent from "./components/organisms/admin/SellerProductsPageComponent";

const NotAuthenticatedRoute = ({children}) => {

    const auth = useAuth()
    if (!auth.isAuthenticated) {
        return (
            children
        )
    }
    return <Navigate to={"/"}/>
}

const AuthenticatedRolesRoute = ({allowedRoles, children}) => {
    const auth = useAuth();
    const userRole = sessionStorage.getItem("userStatus");

    if (!auth.isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/" />;
    } else {
        return children
    }

}

const AuthenticatedRolesRouteFirstPage = ({allowedRoles}) => {
    const auth = useAuth();
    const userRole = sessionStorage.getItem("userStatus");

    let renderComponent;

    if (!auth.isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole)))  {
        return <Navigate to="/" />;
    } else {
        if (userRole === 'ADMIN') {
            console.log("admin")
            renderComponent = <AdminLandingPageComponent />;
        } else if (userRole === 'CLIENT') {
            console.log("client")
            renderComponent = <ClientLandingPageComponent />;
        } else {
            console.log("landing")
            renderComponent = <LandingPageComponent />;
        }
    }

    return (
        <Routes>
            <Route path="/*" element={renderComponent} />
        </Routes>
    );
}

function App() {

    return (
        <div className="bg-white dark:bg-inherit">
            <BrowserRouter>
                <AuthProvider>
                    <FavoriteProvider>
                        <CartProvider>
                            <HeaderComponent/>
                            <AlertProvider>
                                <Routes>

                                    {/*no need to be authenticated*/}
                                    <Route path='/login' element={
                                        <NotAuthenticatedRoute>
                                            <LoginPageComponent/>
                                        </NotAuthenticatedRoute>
                                    }/>
                                    <Route path='/register' element={
                                        <NotAuthenticatedRoute>
                                            <RegisterPageComponent/>
                                        </NotAuthenticatedRoute>
                                    }/>

                                    <Route path='/' element={
                                        <LandingPageComponent/>
                                    }/>

                                    <Route path='/products/categories' element={
                                        <CategoryPageComponent/>
                                    }/>

                                    <Route path='/products' element={
                                            <ProductPageComponent/>
                                    }/>

                                    <Route path='/:sellerAlias/products/:productId' element={
                                        <ProductDetailsPageComponent/>
                                    }/>


                                    {/*both routes*/}
                                    <Route path="/welcome/*" element={
                                        <AuthenticatedRolesRouteFirstPage allowedRoles={['CLIENT', 'ADMIN']}/>
                                    } />


                                    {/*client routes*/}
                                    <Route path='/account/cart' element={
                                        <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>
                                            <CartComponent/>
                                        </AuthenticatedRolesRoute>
                                    }/>

                                    <Route path='/checkout' element={
                                        <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>
                                            <CheckoutPageComponent/>
                                        </AuthenticatedRolesRoute>
                                    }/>
                                    {/*<Route path='/order-history' element={*/}
                                    {/*    <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>*/}
                                    {/*        <OrderHistoryPageComponent/>*/}
                                    {/*    </AuthenticatedRolesRoute>*/}
                                    {/*}/>*/}

                                    <Route path='/order-successful/:fullOrderId' element={
                                        <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>
                                            <OrderSuccessfulPageComponent/>
                                        </AuthenticatedRolesRoute>
                                    }/>

                                    {/*admin routes*/}
                                    <Route path='/:sellerAlias/products' element={
                                        <AuthenticatedRolesRoute allowedRoles={['ADMIN']}>
                                            <SellerProductsPageComponent />
                                        </AuthenticatedRolesRoute>
                                    }/>

                                </Routes>
                            </AlertProvider>
                            <AuthVerify/>
                        </CartProvider>
                    </FavoriteProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
