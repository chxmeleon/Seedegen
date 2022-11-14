import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest,res: NextApiResponse) {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 1000
  const address = req.query.q?.toString() || ''


  const buyTransaction = await prisma.winAndLose.findMany({
    skip: offset,
    take: limit,
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
      buyTime: true,
      buyTxHash: true,
      buyTxHashUrl: true,
      cost: true,
    },
  })

  const sellTransaction = await prisma.winAndLose.findMany({
    skip: offset,
    take: limit,
    select: {
      walletAddress: true,
      walletOpenseaUrl: true,
      walletEtherscanUrl: true,
      projectEtherscanUrl: true,
      projectAddress: true,
      tokenId: true,
      sellTime: true,
      sellTxHash: true,
      sellTxHashUrl: true,
      got: true,
    },
  })

  res.status(200).json({buyTransaction, sellTransaction})
}
