import { warrantyAPI } from '@/services'
import { GetListStoreReq, UserAccount } from '@/types'
import { useQuery } from '../common'

interface Props {
  params?: GetListStoreReq
  key: string
  data_key: string
}

interface IUseStore {
  data: UserAccount[]
  isValidating: boolean
  fetchMore: Function
  hasMore: boolean
  mutate?: Function
  filter: Function
}

const useAgency = ({ params, key, data_key }: Props): IUseStore => {
  const { data, isValidating, fetchMore, hasMore, mutate, filter } = useQuery<
    UserAccount,
    GetListStoreReq
  >({
    key,
    fetcher: warrantyAPI.getListStore,
    initialParams: params,
    data_key,
  })

  return {
    data: data || [],
    isValidating,
    mutate,
    filter,
    hasMore,
    fetchMore,
  }
}

export { useAgency }
