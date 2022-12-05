import type { NextApiRequest, NextApiResponse } from 'next'
import createMongoClient from '../../../lib/mongodbclint'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const query = req.query.q?.toString() || ''
  const offset = (page - 1) * limit

  const db = await createMongoClient()
  const searchData = await db
    .collection('nftTrade')
    .find({ $text: { $search: query } })
    .sort({ blockTime: -1 })
    .skip(offset)
    .limit(limit)
    .project({ _id: false })
    .toArray()

  res.status(200).json(searchData)
}
