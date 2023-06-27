import { SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useProductDescription } from '@/hooks'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'
import { PlanDescriptionView } from './planDescriptionView'

interface ProductDescriptionV2Props {
  product_id: number
  className?: string
}

export const ProductDescription = ({
  product_id,
  className,
}: ProductDescriptionV2Props) => {
  const { data, isValidating } = useProductDescription({
    key: `${SWR_KEY.get_product_description}_${product_id}`,
    product_id,
  })

  return (
    <div className={twMerge(classNames(``, className))}>
      {isValidating ? (
        <div className="flex-center my-24">
          <Spinner />
        </div>
      ) : isArrayHasValue(data) && data ? (
        <div>
          <PlanDescriptionView data={data} />
        </div>
      ) : null}
    </div>
  )
}
