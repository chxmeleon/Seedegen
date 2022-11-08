import React from 'react'
import Header from './Header'
import SearchHeader from './SearchHeader'
import Footer from './Footer'
import { useRouter } from 'next/router'


type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <section>
        {useRouter().route === '/search' ? 
          <SearchHeader />
        : 
          <Header />
      }
        {children}
        <Footer />
      </section>
    </>
  )
}

export default Layout
