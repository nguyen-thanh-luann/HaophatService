import { CreateWarrantyReceiptReq, WarrantyParams } from '@/types'
import { useAsync } from '../common'
import { warrantyAPI } from '@/services'

interface WarrantyReceiptSWR {
  createStoreWarrantyReceipt: Function
  createCustomerWarrantyReceipt: Function
  confirmWarrantyReceiptForCustomer: Function
  updateWarrantyReceiptDraft: Function
  isLoading: boolean
}

const useStoreWarranty = (): WarrantyReceiptSWR => {
  const { asyncHandler, isLoading } = useAsync()

  const createStoreWarrantyReceipt = async (params: WarrantyParams, handleSuccess?: Function) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.createStoreWarrantyReceipt(params),
      onSuccess: () => {
        handleSuccess?.()
      },
      config: {
        successMsg: 'Tạo bảo hành thành công!',
      },
    })
  }

  const createCustomerWarrantyReceipt = async (
    params: CreateWarrantyReceiptReq,
    handleSuccess?: Function
  ) => {
    asyncHandler<CreateWarrantyReceiptReq>({
      fetcher: warrantyAPI.createCustomerWarrantyReceipt(params),
      onSuccess: (res: any) => {
        asyncHandler<WarrantyParams>({
          fetcher: warrantyAPI.storeConfirmCustomerWarrantyReceipt({
            warranty_receipt_customer_id:
              res?.warranty_receipt_customer?.[0]?.warranty_receipt_customer_id,
          }),
          onSuccess: () => {
            handleSuccess?.()
          },
          config: {
            successMsg: 'Tạo bảo hành khách hàng thành công!',
          },
        })
      },
      config: {
        showSuccessMsg: false,
      },
    })
  }

  const confirmWarrantyReceiptForCustomer = async (
    params: WarrantyParams,
    handleSuccess?: Function
  ) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.storeConfirmCustomerWarrantyReceipt(params),
      onSuccess: () => {
        handleSuccess?.()
      },
      config: {
        successMsg: 'Xác nhận thành công',
      },
    })
  }

  const updateWarrantyReceiptDraft = async (params: WarrantyParams, handleSuccess?: Function) => {
    asyncHandler<WarrantyParams>({
      fetcher: warrantyAPI.updateStoreWarrantyReceipt(params),
      onSuccess: () => {
        handleSuccess?.()
      },
      config: {
        successMsg: 'Cập nhật thông tin thành công!',
      },
    })
  }

  return {
    createStoreWarrantyReceipt,
    createCustomerWarrantyReceipt,
    confirmWarrantyReceiptForCustomer,
    updateWarrantyReceiptDraft,
    isLoading,
  }
}

export { useStoreWarranty }
