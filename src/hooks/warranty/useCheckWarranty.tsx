import { warrantyAPI } from '@/services'
import { SearchWarrantyReceiptReq } from '@/types'
import { useQuery } from '../common'

interface Props {
  params: SearchWarrantyReceiptReq
  key: string
}

const useCheckWarranty = ({ params, key }: Props) => {
  const { data, isValidating, fetchMore, hasMore, mutate } = useQuery<
    any,
    SearchWarrantyReceiptReq
  >({
    key,
    fetcher: warrantyAPI.searchWarrantyReceipt,
    initialParams: params,
    data_key: 'warranty_receipt_customer',
  })

  return {
    data,
    isValidating,
    fetchMore,
    hasMore,
    mutate,
  }
}

export { useCheckWarranty }
