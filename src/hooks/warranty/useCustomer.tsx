import { warrantyAPI } from '@/services'
import { CreateCustomerWarrantyReq, UserAccount, WarrantyParams } from '@/types'
import { useAsync, useQuery } from '../common'

interface Props {
  params?: WarrantyParams
  key: string
}

const useCustomer = ({ params, key }: Props) => {
  const { asyncHandler } = useAsync()

  const { data, isValidating, fetchMore, mutate, hasMore, filter } = useQuery<
    UserAccount,
    WarrantyParams
  >({
    key,
    fetcher: warrantyAPI.getListCustomer,
    initialParams: params,
    data_key: 'customer',
  })

  const createCustomerWarranty = async (
    params: CreateCustomerWarrantyReq,
    handleSuccess?: Function
  ) => {
    asyncHandler<CreateCustomerWarrantyReq>({
      fetcher: warrantyAPI.createCustomerWarranty(params),
      onSuccess: (res: any) => {
        mutate([...(res?.customer || []), ...(data || [])], false)
        handleSuccess?.()
      },
      config: {
        successMsg: 'Tạo khách hàng thành công!',
      },
    })
  }

  return {
    createCustomerWarranty,
    data,
    mutate,
    isValidating,
    fetchMore,
    hasMore,
    filter,
  }
}

export { useCustomer }
