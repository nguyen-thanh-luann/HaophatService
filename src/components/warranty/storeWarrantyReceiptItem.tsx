import { StoreWarrantyReceipt } from '@/types'
import React from 'react'
import { WarrantyStateLabel } from './warrantyStateLabel'
import { CustomerWarrantyState } from '@/constants'

interface IStoreWarrantyReceiptItem {
  item: StoreWarrantyReceipt
  onClick?: Function
}

export const StoreWarrantyReceiptItem = ({
  item,
  onClick: onExternalClick,
}: IStoreWarrantyReceiptItem) => {
  return (
    <div
      className="bg-white mb-20 last:mb-0 p-16 rounded-sm shadow-sm cursor-pointer
		hover:bg-gray-200 ease-linear duration-150 active:bg-white"
      onClick={() => {
        onExternalClick?.()
      }}
    >
      <div className="flex justify-between items-center">
        <div className="">
          <p className="title-sm">
            <span>{`Phiếu bảo hành: `}</span>
            <span className="!font-500">{item?.name}</span>
          </p>
          <p className="title-sm">
            <span>{`Đơn hàng: `}</span>
            <span className="!font-500">{item?.picking_id?.name}</span>
          </p>
          <p className="title-sm">
            <span>{`Ngày bắt đầu: `}</span>
            <span className="!font-500">{item?.warranty_starting}</span>
          </p>
        </div>
        <div>
          <WarrantyStateLabel
            state={CustomerWarrantyState.filter((warranty) => warranty.state === item.state)?.[0]}
          />
        </div>
      </div>
    </div>
  )
}
