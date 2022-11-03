import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layouts/Layout'


const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const Trader = () => {
  const router = useRouter()
  const fullDataUrl = `/api/data/win-and-lose?address=${router.query.id}`
  const { data: traderData } = useSWR(fullDataUrl, fetcher)


  // const address = data[0]
  // console.log(address);
  
  console.log(traderData);
  
  const address = traderData?.[0].walletAddress

  return (

    <Layout>
      <div className="pt-20 h-screen">
        <div>{address}</div>
      </div>
    </Layout>


  )
}

export default Trader

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const address = context.query.id?.toString() || '' 
//   const winLose = await prisma.winAndLose.findMany({
//     where: {
//       walletAddress: address
//     },
//     select: {
//       rank: true,
//       walletAddress: true,
//       walletOpenseaUrl: true,
//       walletEtherscanUrl: true,
//       projectEtherscanUrl: true,
//       projectAddress: true,
//       tokenId: true,
//       buyTxHash: true,
//       buyTxHashUrl: true,
//       sellTxHash: true,
//       sellTxHashUrl: true,
//       status: true,
//       cost: true,
//       got: true,
//       net: true,
//     },
//   })
//
//   return { 
//     props: { data: winLose },
//   }
// }
//
//
//
