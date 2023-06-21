import useSWR from 'swr'
import { WarrantyParams } from '@/types'
import { useAsync } from '../common'
import { warrantyAPI } from '@/services'

interface Props {
  params: WarrantyParams
  key?: string
}

interface IUseStoreWarrantyDetail {
  data: any
  mutate?: any
  isValidating?: boolean
  confirmWarrantyReceiptDraft: Function
  deleteWarrantyReceiptDraft: Function
}

const useStoreWarrantyDetail = ({ params, key }: Props): IUseStoreWarrantyDetail => {
  const { asyncHandler } = useAsync()
  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      warrantyAPI
        .getStoreWarrantyReceiptDetail(params)
        .then(
          (res: any) => res?.result?.data?.warranty_receipt?.[0] || res?.data?.warranty_receipt?.[0]
        ),
    {
      revalidateOnFocus: false,
    }
  )

  const confirmWarrantyReceiptDraft = async (
    warranty_receipt_id: number,
    handleSuccess?: Function
  ) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.storeConfirmCreateWarrantyReceipt({ warranty_receipt_id }),
      onSuccess: () => {
        handleSuccess?.()
      },
      config: {
        successMsg: 'Xác nhận thành công!',
      },
    })
  }

  const deleteWarrantyReceiptDraft = async (
    warranty_receipt_id: number,
    handleSuccess?: Function
  ) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.deteleStoreWarrantyReceipt({ warranty_receipt_id }),
      onSuccess: () => {
        handleSuccess?.()
      },
      config: {
        successMsg: 'Xóa phiếu bảo hành thành công!',
      },
    })
  }

  return {
    data,
    mutate,
    isValidating,
    confirmWarrantyReceiptDraft,
    deleteWarrantyReceiptDraft,
  }
}

export { useStoreWarrantyDetail }
