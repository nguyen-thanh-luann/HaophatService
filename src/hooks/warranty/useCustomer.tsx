import useSWR from 'swr'

import { CreateCustomerWarrantyReq, UserInfo, WarrantyParams } from '@/types'
import { useAsync } from '../common'
import { warrantyAPI } from '@/services'

interface Props {
  params?: WarrantyParams
  key: string
}

interface IUseCustomer {
  createCustomerWarranty: Function
  customerList: UserInfo[]
  searchCustomer?: Function
  mutate?: any
}

const useCustomer = ({ params, key }: Props): IUseCustomer => {
  const { asyncHandler } = useAsync()

  const { data: customerList, mutate } = useSWR(
    key,
    () => warrantyAPI.getListCustomer(params).then((res: any) => res?.result?.data?.customer),
    {
      revalidateOnFocus: false,
    }
  )

  const createCustomerWarranty = async (
    params: CreateCustomerWarrantyReq,
    handleSuccess?: Function
  ) => {
    asyncHandler<CreateCustomerWarrantyReq>({
      fetcher: warrantyAPI.createCustomerWarranty(params),
      onSuccess: (res: any) => {
        mutate(res?.customer, true)
        handleSuccess?.()
      },
      config: {
        successMsg: 'Tạo khách hàng thành công!',
      },
    })
  }

  return {
    createCustomerWarranty,
    customerList,
    mutate,
  }
}

export { useCustomer }
