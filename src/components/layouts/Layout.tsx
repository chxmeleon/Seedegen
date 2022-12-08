import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import WalletModal from '../elements/WalletModal'
import Link from 'next/link'
import Lside from './Lside'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  const [isModalShow, setIsModalShow] = useState(false)
  const [isSidebarShow, setIsSidebarShow] = useState(false)
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const openModal = () => setIsModalShow(true)
  const closeModal = () => setIsModalShow(false)
  const openSidebar = () => setIsSidebarShow(true)
  const closeSidebar = () => setIsSidebarShow(false)
  const logout = () => disconnect()

  const handleConnectWalletModal = () => {
    connect({ connector: connectors[0] })
    closeModal()
  }

  const handleConnectWalletSidebar = () => {
    connect({ connector: connectors[0] })
    closeSidebar()
  }

  return (
    <section>
      <Header
        openModal={openModal}
        openSidebar={openSidebar}
        disConnect={logout}
        isConnected={isConnected}
      />

      {router.route === '/home' || router.route === '/search' ? (
        <div className="flex justify-between pt-20">
          <Lside />
          <div className="w-1/3">{children}</div>
          <div className="py-10 px-20 w-1/3">
            <div className="flex sticky top-20 flex-col justify-around h-[1000px]">
              <div className="p-10 text-3xl bg-gray-800 rounded-lg h-[350px]">
                <p>Trend to you</p>
              </div>
              <div className="p-10 text-3xl bg-gray-800 rounded-lg h-[350px]">
                <p>Follow</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}

      {isModalShow && (
        <WalletModal connectMetaMask={handleConnectWalletModal} />
      )}
      {isSidebarShow && (
        <div className="fixed right-0 top-20 h-screen bg-gray-800 w-[300px]">
          <button onClick={handleConnectWalletSidebar}>close</button>
        </div>
      )}
      <Footer />
    </section>
  )
}

export default Layout
