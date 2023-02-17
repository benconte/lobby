import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import MainContext from '@/context/MainContext'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainContext>
        <div className='min-h-screen'>
          <Component {...pageProps} />
        </div>
      </MainContext>
    </SessionProvider>
  )
}
