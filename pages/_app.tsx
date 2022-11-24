// import '../styles/globals.css'
import '../scss/global.scss'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app.context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>)
}
