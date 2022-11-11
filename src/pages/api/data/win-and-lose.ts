import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 10
  const address = req.query.address?.toString() || ''

  const winLose = await prisma.winAndLose.findMany({
    take: limit,
    skip: offset,
    where: {
      walletAddress: address,
    },
    select: {
      walletAddress: true,
      walletOpenseaUrl: true,
      walletEtherscanUrl: true,
      projectEtherscanUrl: true,
      projectAddress: true,
      tokenId: true,
      buyTxHash: true,
      buyTxHashUrl: true,
      sellTxHash: true,
      sellTxHashUrl: true,
      status: true,
      cost: true,
      got: true,
      net: true,
    },
  })

  const rank30days = await prisma.nftProfitLeaderboard30days.findMany({
    where: {
      address: address,
    },
    select: {
      ens: true,
      address: true,
      profit: true,
      received: true,
      roi: true,
      spent: true,
      totalTradeTxCounts: true,
      totalVolumes: true,
    },
  })

  const rankAll = await prisma.nftProfitLeaderboardAll.findMany({
    where: {
      address: address,
    },
    select: {
      ens: true,
      address: true,
      profit: true,
      received: true,
      roi: true,
      spent: true,
      totalTradeTxCounts: true,
      totalVolumes: true,
    },
  })


  const mergeAllRank = {...rank30days, ...rankAll}
  res.status(200).json({mergeAllRank, winLose})
}
