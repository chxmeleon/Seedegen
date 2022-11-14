import type { NextApiRequest, NextApiResponse } from 'next'
import createMongoClient from '../../../lib/mongodbclint'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const offset = Number(req.query.offset) || 0
  // const limit = Number(req.query.limit) || 1000
  const query = req.query.q?.toString() || ''

  const db = await createMongoClient()
  const buyTransaction = await db
    .collection('winAndLose')
    .find({ $text: { $search: query } })
    .project({
      _id: false,
      walletAddress: true,
      walletEtherscanUrl: true,
      projectEtherscanUrl: true,
      projectAddress: true,
      tokenId: true,
      buyTime: true,
      buyTxHash: true,
      buyTxHashUrl: true,
      cost: true,
    })
    .sort({buyTime: -1})
    .toArray()

  const sellTransaction = await db
    .collection('winAndLose')
    .find({ $text: { $search: query } })
    .project({
      _id: false,
      walletAddress: true,
      walletEtherscanUrl: true,
      projectEtherscanUrl: true,
      projectAddress: true,
      tokenId: true,
      sellTime: true,
      sellTxHash: true,
      sellTxHashUrl: true,
      got: true,
    })
    .sort({sellTime: -1})
    .toArray()

  res.status(200).json({ buyTransaction, sellTransaction })
}
