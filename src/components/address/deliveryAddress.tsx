import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { UserDeliveryAddressForm } from '../form'

interface DeliveryAddressProps {
  className?: string
}

export const DeliveryAddress = ({ className }: DeliveryAddressProps) => {
  return (
    <div className={twMerge(classNames(`bg-white shadow-shadow-1 rounded-lg p-12`, className))}>
      <div className="flex justify-between items-center flex-wrap gap-12 mb-24">
        <p className="text-text-color font-bold text-xl leading-10">Thông tin địa chỉ nhận hàng</p>
      </div>

      <UserDeliveryAddressForm />
    </div>
  )
}
