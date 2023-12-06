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

function AuthenticatedRoute({children}) {

    const auth = sessionStorage.getItem('isAuthenticated')

    if (auth === "false") {
        return <Navigate to={"/"}/>
    }
    if (auth) {
        return (
            children
        )
    }
    return <Navigate to={"/"}/>
}

function NotAuthenticatedRoute({children}) {

    const auth = useAuth()
    if (!auth.isAuthenticated) {
        return (
            children
        )
    }
    return <Navigate to={"/"}/>
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
                                        <Route path='/' element={<WelcomePageComponent/>}/>
                                        <Route path='' element={<WelcomePageComponent/>}/>
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

                                        <Route path='/products/categories' element={<CategoryPageComponent/>}/>
                                        <Route path='/products' element={<ProductPageComponent/>}/>
                                        <Route path='/:sellerAlias/products/:productId' element={<ProductDetailsPageComponent/>}/>

                                        <Route path='/account/cart' element={
                                            <AuthenticatedRoute>
                                                <CartComponent/>
                                            </AuthenticatedRoute>
                                        }/>

                                        <Route path='/checkout' element={
                                            <AuthenticatedRoute>
                                                <CheckoutPageComponent/>
                                            </AuthenticatedRoute>
                                        }/>

                                        <Route path='/order-history' element={
                                            <AuthenticatedRoute>
                                                <OrderHistoryPageComponent/>
                                            </AuthenticatedRoute>
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
