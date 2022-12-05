import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

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

  return (
    <section>
      <Header
        onClick={openModal}
        isConnected={isConnected}
        disConnect={() => disconnect()}
      />
      {children}
      {isShow && (
        <div className="relative w-full">
          <div className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 justify-center items-center h-screen bg-opacity-30 z-[99] bg-slate-900">
            <div className="flex m-auto bg-gray-400 w-[500px] h-[500px]">
              <button
                className="m-auto"
                onClick={() => {
                  connect({ connector: connectors[0] })
                  closeModal()
                }}
              >
                connect wallet
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </section>
  )
}

export default Layout
