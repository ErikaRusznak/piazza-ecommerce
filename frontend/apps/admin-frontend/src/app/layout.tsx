import {AuthProvider} from "components";

export const metadata = {
  title: 'Admin Portal',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <AuthProvider userRole="ADMIN">
            <html lang="en" style={{margin: 0, padding: 0}}>
              <body style={{margin: 0, padding: 0}}>
                {children}
              </body>
            </html>
      </AuthProvider>
  )
}
