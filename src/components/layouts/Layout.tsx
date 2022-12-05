import React, { useReducer, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import WalletModal from '../elements/WalletModal'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
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
      {children}
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
