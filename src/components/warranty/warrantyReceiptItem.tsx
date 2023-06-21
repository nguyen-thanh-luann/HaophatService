import React from 'react'
import { WarrantyReceipt } from '@/types'
import { CustomerWarrantyState } from '@/constants'
import { CustomImage } from '../customImage'
import { WarrantyStateLabel } from './warrantyStateLabel'
import classNames from 'classnames'

interface WarrantyReceiptItem {
  receipt: WarrantyReceipt
  isLoading?: boolean
  onClick?: Function
}

export const WarrantyReceiptItem = ({ receipt, onClick: onExternalClick }: WarrantyReceiptItem) => {
  return (
    <div
      onClick={() => {
        onExternalClick?.(receipt?.warranty_receipt_customer_id)
      }}
      className={classNames(
        `flex flex-wrap-reverse gap-12 bg-white p-16 border border-gray-200 items-center justify-between rounded-md
      mb-20 last:mb-0 animate-fade`,
        onExternalClick ? 'cursor-pointer active:opacity-50' : ''
      )}
    >
      <div className="flex items-center">
        <div className="relative hidden md:block">
          <CustomImage
            className="rounded-full object-cover w-[60px] h-[60px]"
            src={receipt?.product_id?.representation_image?.image_url || ''}
          />
        </div>
        <div className="md:ml-12">
          <p className="text-md font-bold line-clamp-1">{receipt?.product_id?.product_name}</p>
          <p className="text-md line-clamp-1 ">
            <span className="!font-600">{`Số lô: `}</span>
            <span>{receipt?.lot_id?.lot_name}</span>
          </p>
          <p className="text-md line-clamp-1">{`Ngày kích hoạt: ${receipt?.warranty_starting}`}</p>
        </div>
      </div>

      <div>
        <WarrantyStateLabel
          state={CustomerWarrantyState.filter((item) => item.state === receipt.state)?.[0]}
        />
      </div>
    </div>
  )
}
