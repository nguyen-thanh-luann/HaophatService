import { formatMoneyVND } from '@/helper'
import { ProductOrderHistory } from '@/types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { CustomImage } from '../customImage'

interface OrderTicketProductProps {
  data: ProductOrderHistory
  className?: string
}

export const OrderTicketProduct = ({ data, className }: OrderTicketProductProps) => {
  return (
    <div className={twMerge(classNames(`flex border-b border-gray-200 py-12`, className))}>
      <div className="mr-8">
        <CustomImage
          src={data?.image_url?.[0] || ''}
          imageClassName="w-[62px] h-[62px] object-cover"
          className="w-[62px] h-[62px]"
        />
      </div>

      <div className="flex-1">
        <p className="text-text-color text-md line-clamp-2 font-semibold">{data?.name}</p>

        <p className="text-text-color text-md line-clamp-1">{`x${data?.quantity}`}</p>

        <p className="text-primary text-md line-clamp-1 font-bold">{formatMoneyVND(data?.price)}</p>
      </div>
    </div>
  )
}
