import useSWR from 'swr'
import axios from 'axios'
const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

export const useTradeData = (path: string) => {
  const { data, error } = useSWR(path, fetcher)
  const loading = !error && !data

  return {
    loadingTradeData: loading,
    errorTradeData: error,
    tradeData: data
  }
}
