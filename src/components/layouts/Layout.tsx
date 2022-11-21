import React from 'react'
import Header from './Header'
import SearchHeader from './SearchHeader'
import Footer from './Footer'
import { useRouter } from 'next/router'


type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  return (
    <>
      <section>
        {router.route === '/search' ? 
          <SearchHeader />
        : 
          <Header />
      }
        {children}
        {router.route === '/search'  ? 
          null
        : 
          <Footer />
        }
      </section>
    </>
  )
}

export default Layout
