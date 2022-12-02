import React from 'react'
import Header from './Header'
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
        <Header />
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
