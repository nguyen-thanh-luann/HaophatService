import { addressAPI } from '@/services'
import { GetProvinceParams, Province } from '@/types'
import { useQueryListV2 } from '../common'

interface useProvinceProps {
  key?: string
  params: GetProvinceParams
}

interface useProvinceRes {
  data: Province[]
  isValidating: boolean
  filter: (params: GetProvinceParams) => void
  hasMore: boolean
  isLoadingMore: boolean
  getMore: () => void
  total: number
}

export const useProvince = ({ key, params }: useProvinceProps): useProvinceRes => {
  const { data, isValidating, getMore, hasMore, isLoadingMore, filter, total } = useQueryListV2<
    Province,
    GetProvinceParams
  >({
    key,
    fetcher: addressAPI.listProvince,
    initialParams: params,
    config: {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  })

  return {
    data,
    isValidating,
    getMore,
    hasMore,
    isLoadingMore,
    filter,
    total,
  }
}
