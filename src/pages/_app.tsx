import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useEffect } from 'react'
import 'chart.js/auto';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <>
      <Head>
        <title>NanoDapp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="../public/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  ) 
}

export default MyApp
