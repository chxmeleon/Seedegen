import type { NextApiRequest, NextApiResponse } from 'next'
import createMongoClient from '../../../lib/mongodbclint'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json('heeee')
}

