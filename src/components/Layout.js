import './globals.css'

export const metadata = {
  title: 'Food Truck Finder',
  description: 'Find the best food trucks in Long Beach',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}