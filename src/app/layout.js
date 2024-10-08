import 'leaflet/dist/leaflet.css'
import '../styles/globals.css'

export const metadata = {
  title: 'Food Truck Finder',
  description: 'Find the best food trucks in your area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}