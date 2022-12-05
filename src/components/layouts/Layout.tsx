import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import WalletModal from '../elements/WalletModal'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [isShow, setIsShow] = useState(false)
  const openModal = () => setIsShow(true)
  const closeModal = () => setIsShow(false)
  const handleConnectWallet = () => {
    connect({ connector: connectors[0] })
    closeModal()
  }

  return (
    <section>
      <Header
        onClick={openModal}
        isConnected={isConnected}
        disConnect={() => disconnect()}
      />
      {children}
      {isShow && <WalletModal onClick={handleConnectWallet} />}
      <Footer />
    </section>
  )
}

export default Layout
