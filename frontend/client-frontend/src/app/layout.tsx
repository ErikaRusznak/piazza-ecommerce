import AuthProvider from "../../api/auth/AuthContext";
import CartProvider from "../../contexts/CartContext";
import FavoriteProvider from "../../contexts/FavoriteContext";
import NavigationBar from "@/components/organisms";
import Footer from "@/components/organisms/footer/Footer";
import WebSocketProvider from "../../contexts/WebSocketContext";
import SockJS from "sockjs-client";
import {baseURL} from "../../api/ApiClient";

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <AuthProvider>
            <WebSocketProvider>
                <CartProvider>
                    <FavoriteProvider>
                        <html lang="en" style={{margin: 0, padding: 0}}>
                        <body style={{margin: 0, padding: 0}}>
                        {/*<NavigationBar />*/}
                        {children}
                        {/*<Footer />*/}
                        </body>
                        </html>
                    </FavoriteProvider>
                </CartProvider>
            </WebSocketProvider>
        </AuthProvider>
    )
}
