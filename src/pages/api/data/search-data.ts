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
  const queryData = await db
    .collection('nftTrade')
    .find({ $text: { $search: query } })
    .project({ _id: false })
    .sort({blockTime: -1})
    .toArray()

  const nftTrade = queryData.slice(offset, offset + limit)

  res.status(200).json(nftTrade)
}
