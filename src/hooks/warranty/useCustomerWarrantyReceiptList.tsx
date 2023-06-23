import { WarrantyParams, WarrantyReceipt } from '@/types'
import { useAsync, useQuery } from '../common'
import { warrantyAPI } from '@/services'

interface Props {
  params: WarrantyParams
  key: string
  data_key: string
}

interface IUseCustomer {
  data: any
  // data: WarrantyReceipt[]
  updateCustomerInfo?: Function
  mutate?: Function
  isValidating?: boolean
  fetchMore: Function
  hasMore: boolean
  approveWarrantyReceiptForCustomer: Function
  deleteWarrantyReceiptDraftForCustomer: Function
  filter: Function
}

const useCustomerWarrantyReceiptList = ({ params, key, data_key }: Props): IUseCustomer => {
  const { asyncHandler } = useAsync()

  const { data, isValidating, fetchMore, hasMore, mutate, filter } = useQuery<any, WarrantyParams>({
    key,
    fetcher: warrantyAPI.getCustomerListWarrantyReceipt,
    initialParams: params,
    data_key,
  })

  const approveWarrantyReceiptForCustomer = async (
    params: WarrantyParams,
    handleSuccess?: Function
  ) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.storeConfirmCustomerWarrantyReceipt(params),
      onSuccess: (res: any) => {
        mutate(
          [...(data || [])].filter(
            (item) =>
              (item as WarrantyReceipt)?.warranty_receipt_customer_id !==
              res?.warranty_receipt_customer_id
          )
        )
        handleSuccess?.()
      },
      config: {
        successMsg: 'Xác nhận thành công',
      },
    })
  }

  const deleteWarrantyReceiptDraftForCustomer = async (
    warranty_receipt_customer_id: number,
    handleSuccess?: Function
  ) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.deleteCustomerWarrantyReceipt({
        warranty_receipt_customer_id,
      }),
      onSuccess: () => {
        mutate(
          [...(data || [])].filter(
            (item) =>
              (item as WarrantyReceipt)?.warranty_receipt_customer_id !==
              warranty_receipt_customer_id
          )
        )
        handleSuccess?.()
      },
      config: {
        successMsg: 'Xóa bảo hành thành công!',
      },
    })
  }

  return {
    data,
    mutate,
    fetchMore,
    hasMore,
    isValidating,
    filter,
    approveWarrantyReceiptForCustomer,
    deleteWarrantyReceiptDraftForCustomer,
  }
}

export { useCustomerWarrantyReceiptList }
