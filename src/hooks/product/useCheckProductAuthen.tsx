import { SWR_KEY } from '@/constants'
import { productAPI } from '@/services'
import { CheckProductAuthenParams, ProductDetail } from '@/types'
import useSWR from 'swr'

interface useCheckProductAuthenProps {
  params: CheckProductAuthenParams
}

interface useCheckProductAuthenRes {
  data: ProductDetail
  isValidating: boolean
}

export const useCheckProductAuthen = ({
  params,
}: useCheckProductAuthenProps): useCheckProductAuthenRes => {
  const { data, isValidating } = useSWR(
    `${SWR_KEY.check_product_authen}_${params.uuid_code}`,
    () => productAPI.checkProductAuthen(params).then((res: any) => res?.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return { data, isValidating }
}
