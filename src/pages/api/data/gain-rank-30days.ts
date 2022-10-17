import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 0
  const rank30days = await prisma.nftProfitLeaderboard30days.findMany({
    skip: offset,
    take: limit,
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
  res.status(200).json(rank30days)
}
