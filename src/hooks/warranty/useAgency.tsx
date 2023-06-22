import useSWR from 'swr'
import { GetListStoreReq, WarrantyParams } from '@/types'
import { warrantyAPI } from '@/services'

interface Props {
  params?: WarrantyParams
  key?: string
  data_key?: string
}

interface IUseStore {
  data: any[]
  error?: any
  isValidating?: boolean
  fetchMore?: Function
  hasMore?: boolean
  mutate?: Function
  searchStore: Function
}

const useAgency = ({ params, key }: Props): IUseStore => {
  const { data, isValidating, mutate } = useSWR(
    key,
    () =>
      warrantyAPI
        .getListStore(params)
        .then((res: any) => res?.result?.data?.store || res?.data?.store || []),
    {
      revalidateOnFocus: false,
    }
  )

  const searchStore = async (params: GetListStoreReq) => {
    warrantyAPI.getListStore(params).then((res: any) => {
      mutate(res?.result?.data?.store || res?.data?.store || [], false)
    })
  }

  return {
    data,
    isValidating,
    mutate,
    searchStore,
  }
}

export { useAgency }
