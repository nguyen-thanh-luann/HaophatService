import { addressAPI } from '@/services'
import { GetWardParams, Ward } from '@/types'
import { useQueryListV2 } from '../common'

interface useWardProps {
  key?: string
  params: GetWardParams
}

export const useWard = ({ key, params }: useWardProps) => {
  const { data, isValidating, getMore, hasMore, isLoadingMore, filter, total } = useQueryListV2<
    Ward,
    GetWardParams
  >({
    key,
    fetcher: addressAPI.listWard,
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
