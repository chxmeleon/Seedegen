import { MongoClient } from 'mongodb'

const createMongoClient = async () => {
  const mongoDbUrl = process.env.MONGODB_URL || ''
  const client = new MongoClient(mongoDbUrl, { sslValidate: false })
  await client.connect()
  const db = client.db('icu-dapp')
  return db
}

export default createMongoClient
