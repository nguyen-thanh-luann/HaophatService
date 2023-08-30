import { SWR_KEY } from '@/constants'
import { productAPI } from '@/services'
import { CategoryBrand, QueryList } from '@/types'
import useSWR from 'swr'

interface useCategoryBrandNewsProps {
  key?: string
  shouldFetch?: boolean
  params: QueryList
}

interface useCategoryBrandNewsRes {
  data: CategoryBrand[]
  isValidating: boolean
}

export const useCategoryBrandNews = ({
  shouldFetch = true,
  key,
  params,
}: useCategoryBrandNewsProps): useCategoryBrandNewsRes => {
  const { data, isValidating } = useSWR(
    key ? key : SWR_KEY.get_category_brand_news,
    !shouldFetch ? null : () => productAPI.getBrandNews(params).then((res: any) => res?.data || []),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000,
    }
  )

  return {
    data: data?.result || [],
    isValidating,
  }
}
