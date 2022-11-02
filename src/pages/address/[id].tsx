import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const Trader = () => {
  const router = useRouter()
  const fullDataUrl = `/api/data/win-and-lose?address=${router.query.id}`
  const { data: traderData } = useSWR(fullDataUrl, fetcher)


  return <div>{JSON.stringify(traderData)}</div>
}

export default Trader
