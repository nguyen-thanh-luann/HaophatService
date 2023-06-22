import useSWR from 'swr'

import { warrantyAPI } from '@/services'
import { UpdateCustomerWarrantyReq, UserAccount, WarrantyParams } from '@/types'
import { useAsync } from '../common'
interface Props {
  params: WarrantyParams
  key?: string
}

interface IUseCustomer {
  data: UserAccount
  updateCustomerInfo: Function
  mutate?: Function
  isValidating?: boolean
}

const useCustomerDetail = ({ params, key }: Props): IUseCustomer => {
  const { asyncHandler } = useAsync()

  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      warrantyAPI
        .getCustomerInfoDetail(params)
        .then((res: any) => res?.result?.data?.customer?.[0] || res?.data?.customer?.[0]),
    {
      revalidateOnFocus: false,
    }
  )

  const updateCustomerInfo = async (
    params: UpdateCustomerWarrantyReq,
    handleSuccess?: Function
  ) => {
    asyncHandler<UpdateCustomerWarrantyReq>({
      fetcher: warrantyAPI.updateCustomerInfo(params),
      onSuccess: (res: any) => {
        mutate(res?.customer?.[0], false)
        handleSuccess?.()
      },
      config: {
        successMsg: 'Cập nhật thông tin thành công!',
      },
    })
  }

  return {
    data,
    updateCustomerInfo,
    mutate,
    isValidating,
  }
}

export { useCustomerDetail }

