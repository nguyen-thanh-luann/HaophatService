import { durationToName } from '@/helper'
import { StoreWarrantyReceiptDetailItem } from '@/types'
import React from 'react'
import { CustomImage } from '../customImage'
import classNames from 'classnames'

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
      className={classNames(
        `flex gap-8 items-center mb-12 last:mb-0
			 bg-white border border-gray-200 p-12 rounded-md`,
        onExternalClick ? 'cursor-pointer' : ''
      )}
    >
      <div className="relative w-[60px] h-[60px]">
        <CustomImage
          src={item?.product_id?.representation_image?.image_url || ''}
          className="rounded-full  w-[60px] h-[60px]"
        />
      </div>

      <div>
        <p className="text-base">{item?.product_id?.product_name}</p>

        <p className="text-base">{`Serial: ${item?.lot_id?.lot_name}`}</p>

        <p className="text-base">{`Thời hạn bảo hành: ${
          item?.warranty_duration_id?.factor
        } ${durationToName(item?.warranty_duration_id?.time_unit?.value)}`}</p>
      </div>
    </div>
  )
}
