import React from 'react'
import { useConnect } from 'wagmi'
import MetaMaskImg from '../../../public/mm.png'
import CoinbaseWalletImg from '@public/cbw.png'
import WalletConnectImg from '../../../public/image/wc.png'


type WalletModalProps = {
  connectMetaMask: React.MouseEventHandler<HTMLButtonElement>
}

const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { connectMetaMask } = props
  const { connect, connectors } = useConnect()

  return (
    <div className="relative w-full">
      <div className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 justify-center items-center h-screen bg-opacity-30 z-[99] bg-slate-900">
        <div className="flex m-auto bg-gray-400 w-[500px] h-[500px]">
          <button
            className="m-auto"
            onClick={connectMetaMask}
          >
            connect wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
