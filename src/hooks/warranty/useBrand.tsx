import { warrantyAPI } from '@/services'
import { Brand, GetListBrandParams } from '@/types'
import { useQueryListV2 } from '../common/useQueryV2'

interface useBrandProps {
  key: string
  shouldFetch?: boolean
  params: GetListBrandParams
}

interface useBrandRes {
  data: Brand[]
  isValidating: boolean
  filter: (params: GetListBrandParams) => void
  hasMore: boolean
  isLoadingMore: boolean
  getMore: () => void
  total: number
}

export const useBrand = ({ key, params }: useBrandProps): useBrandRes => {
  const {
    data: brands,
    isValidating,
    getMore,
    hasMore,
    isLoadingMore,
    filter,
    total,
  } = useQueryListV2<Brand, GetListBrandParams>({
    key,
    fetcher: warrantyAPI.getListBrand,
    initialParams: params,
    config: {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  })

  return {
    data: brands || [],
    isValidating,
    filter,
    hasMore,
    getMore,
    isLoadingMore,
    total,
  }
}
