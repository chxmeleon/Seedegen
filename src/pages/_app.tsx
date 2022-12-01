import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useEffect } from 'react'
import 'chart.js/auto'
import { useRouter } from 'next/router'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.optimism],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
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
        <title>ICU</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="../public/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={client}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
