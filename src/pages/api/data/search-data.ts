import type { NextApiRequest, NextApiResponse } from 'next'
import createMongoClient from '../../../lib/mongodbclint'
import { orderBy, mapKeys } from 'lodash'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const query = req.query.q?.toString() || ''
  const offset = (page - 1) * limit

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

  const newBuyData = buyTransaction?.map((obj: any) => {
    const newKey = mapKeys(obj, (value, key) => {
      if (key === 'buyTime') return 'blockTime'
      return key
    })
    return newKey
  })


  const newSellData = sellTransaction?.map((obj: any) => {
    const newKey = mapKeys(obj, (value, key) => {
      if (key === 'sellTime') return 'blockTime'
      return key
    })
    return newKey
  })

  const buyAndSellArray = Array.from(new Set(newBuyData?.concat(newSellData)))
  const searchData = orderBy(buyAndSellArray, ['blockTime'], ['desc']).slice(offset, offset + limit)

  res.status(200).json(searchData)
}
