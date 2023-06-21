import { durationToName } from '@/helper'
import { StoreWarrantyReceiptDetailItem } from '@/types'
import React from 'react'
import { CustomImage } from '../customImage'

interface StoreWarrantyProps {
  item: StoreWarrantyReceiptDetailItem
  onClick?: Function
}

export const StoreWarrantyProduct = ({ item, onClick: onExternalClick }: StoreWarrantyProps) => {
  return (
    <div
      onClick={() => {
        onExternalClick?.()
      }}
      className="flex gap-8 items-center mb-16 last:mb-0
			 bg-white border-1 border-gray-200 p-12 rounded-lg"
    >
      <div className="relative w-[60px] h-[60px]">
        <CustomImage
          src={item?.product_id?.representation_image?.image_url || ''}
          className="rounded-full  w-[60px] h-[60px]"
        />
      </div>

      <div>
        <p className="title-sm">{item?.product_id?.product_name}</p>
        <p className="text-md">
          <span className="">{`Serial: `}</span>
          <span>{item?.lot_id?.lot_name}</span>
        </p>
        <p className="text-md">
          <span className="">{`Thời hạn: `}</span>
          <span>{`${item?.warranty_duration_id?.factor} ${durationToName(
            item?.warranty_duration_id?.time_unit?.value
          )}`}</span>
        </p>
      </div>
    </div>
  )
}
