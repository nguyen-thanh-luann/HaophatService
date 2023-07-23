import { addressAPI } from '@/services'
import { District, GetDistrictParams } from '@/types'
import { useQueryListV2 } from '../common'

interface useDistrictProps {
  key?: string
  params: GetDistrictParams
}

interface useDistrictRes {
  data: District[]
  isValidating: boolean
  filter: (params: GetDistrictParams) => void
  hasMore: boolean
  isLoadingMore: boolean
  getMore: () => void
  total: number
}

export const useDistrict = ({ key, params }: useDistrictProps): useDistrictRes => {
  const { data, isValidating, getMore, hasMore, isLoadingMore, filter, total } = useQueryListV2<
    District,
    GetDistrictParams
  >({
    key,
    fetcher: addressAPI.listDistrict,
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
