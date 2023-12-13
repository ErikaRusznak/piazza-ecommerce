import './styles/App.css';
import "@fontsource/roboto";

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import AuthProvider, {useAuth} from './api/auth/AuthContext'
import FavoriteProvider from './contexts/FavoriteContext'

import HeaderComponent from "./components/moleculas/header/HeaderComponent";
import WelcomePageComponent from "./components/organisms/WelcomePageComponent";
import LoginPageComponent from "./components/organisms/LoginPageComponent";
import RegisterPageComponent from "./components/organisms/RegisterPageComponent";
import {AuthVerify} from "./api/auth/AuthVerify";
import CartComponent from "./components/organisms/CartPageComponent";
import CategoryPageComponent from './components/organisms/CategoryPageComponent'
import ProductPageComponent from './components/organisms/ProductPageComponent'
import CheckoutPageComponent from "./components/organisms/CheckoutPageComponent";
import CartProvider from "./contexts/CartContext";
import AlertProvider from "./contexts/AlertContext";
import ProductDetailsPageComponent from "./components/organisms/ProductDetailsPageComponent";
import OrderHistoryPageComponent from "./components/organisms/OrderHistoryPageComponent";
import AdminLandingPage from "./components/organisms/AdminLandingPage";
import React from "react";
import LandingPageComponent from "./components/organisms/LandingPageComponent";

const NotAuthenticatedRoute = ({children}) => {

    const auth = useAuth()
    if (!auth.isAuthenticated) {
        return (
            children
        )
    }
    return <Navigate to={"/"}/>
}

const AuthenticatedRolesRoute = ({path, element, allowedRoles}) => {
    const auth = useAuth();
    const userRole = localStorage.getItem("userStatus");

    if (!auth.isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/" />;
    }

    return <Route path={path} element={element} />;
}

const AuthenticatedRolesRouteFirstPage = ({allowedRoles}) => {
    const auth = useAuth();
    const userRole = localStorage.getItem("userStatus");

    let renderComponent;

    if (!auth.isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole)))  {
        return <Navigate to="/" />;
    } else {
        if (userRole === 'ADMIN') {
            renderComponent = <AdminLandingPage />;
        } else if (userRole === 'CLIENT') {
            renderComponent = <WelcomePageComponent />;
        } else {
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

                                    {/*both routes*/}
                                    <Route path="/welcome/*" element={
                                        <AuthenticatedRolesRouteFirstPage allowedRoles={['CLIENT', 'ADMIN']}/>
                                    } />


                                    {/*client routes*/}
                                    <Route path='/:sellerAlias/products/:productId' element={
                                        <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>
                                            <ProductDetailsPageComponent/>
                                        </AuthenticatedRolesRoute>
                                    }/>


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
                                    <Route path='/order-history' element={
                                        <AuthenticatedRolesRoute allowedRoles={['CLIENT']}>
                                            <OrderHistoryPageComponent/>
                                        </AuthenticatedRolesRoute>
                                    }/>

                                    {/*admin routes*/}


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
