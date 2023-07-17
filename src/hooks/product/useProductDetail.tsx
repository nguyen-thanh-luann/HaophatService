import { productAPI } from '@/services'
import { GetProductDetailParams, ProductDetailRes } from '@/types'
import useSWR from 'swr'

interface useProductDetailProps {
  key: string
  shouldFetch?: boolean
  params: GetProductDetailParams
}

interface useProducDetailRes {
  data: ProductDetailRes
  isValidating: boolean
}

export const useProductDetail = ({
  shouldFetch = true,
  key,
  params,
}: useProductDetailProps): useProducDetailRes => {
  const { data, isValidating } = useSWR(
    key,
    !shouldFetch || !params
      ? null
      : () => productAPI.getProductDetail(params).then((res: any) => res?.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    data,
    isValidating,
  }
}
