import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import MainContext from '@/context/MainContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainContext>
      <div className='min-h-screen'>
        <Component {...pageProps} />
      </div>
    </MainContext>

  )
}
