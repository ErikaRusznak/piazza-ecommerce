import AuthProvider from "../../api/auth/AuthContext";
import {WebSocketProvider} from "components";
import CustomThemeProvider from "../../contexts/ThemeContext";

export const metadata = {
  title: "Seller Portal",
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <CustomThemeProvider>
          <AuthProvider>
              <WebSocketProvider senderRole="SELLER">
                  <html lang="en" style={{margin: 0, padding: 0}}>
                  <body style={{margin: 0, padding: 0}}>
                  {children}
                  </body>
                  </html>
              </WebSocketProvider>
          </AuthProvider>
      </CustomThemeProvider>

  )
}
