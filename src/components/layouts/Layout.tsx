import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAccount, useProvider, useDisconnect, useConnect } from 'wagmi'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [show, setShow] = useState(false)

  const openModal = () => {
    setShow(true)
  }
  const closeModal = () => {
    setShow(false)
  }

  return (
    <section>
      <Header onClick={openModal} isConnected={isConnected} />
      {show && (
        <div className="relative w-full">
          <div className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center h-screen bg-gray-900 bg-opacity-50">
            <div className="flex rounded-md w-[650px] h-[550px] bg-slate-500">
              <div className="m-auto">
                <button
                  onClick={() => {
                    connect({ connector: connectors[0] })
                    closeModal()
                  }}
                >
                  CONNECT WALLET
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {children}
      <div className="flex justify-center text-center">
        <div>
          <div>{address}</div>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Layout
