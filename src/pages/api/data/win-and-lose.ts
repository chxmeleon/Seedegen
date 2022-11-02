import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 10000
  const address = req.query.address?.toString() || ''
  const winLose = await prisma.winAndLose.findMany({
    skip: offset,
    take: limit,
    where: {
      walletAddress: address,
    },
    select: {
      rank: true,
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
  res.status(200).json(winLose)
}
