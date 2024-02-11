import AuthProvider from "../../api/auth/AuthContext";
import CartProvider from "../../contexts/CartContext";
import FavoriteProvider from "../../contexts/FavoriteContext";
import NavigationBar from "@/components/organisms";

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
        <CartProvider>
          <FavoriteProvider>
            <html lang="en" style={{margin: 0, padding: 0}}>
              <body style={{margin: 0, padding: 0}}>
                <NavigationBar />
                {children}
              </body>
            </html>
          </FavoriteProvider>
        </CartProvider>
      </AuthProvider>
  )
}
