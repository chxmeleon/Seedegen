import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useEffect } from 'react'
import 'chart.js/auto'
import { useRouter } from 'next/router'
import { createClient, WagmiConfig } from 'wagmi'
import { chain, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

function MyApp({ Component, pageProps }: AppProps) {
  const { provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.rinkeby],
    [publicProvider()]
  )

  const client = createClient({
    provider,
    webSocketProvider,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const router = useRouter()
  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      if (as !== '/' && as !== '/search') {
        window.location.href = as
        return false
      }
      return true
    })
  }, [router])

  return (
    <>
      <Head>
        <title>Seedegen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="../public/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system">
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}

export default MyApp
