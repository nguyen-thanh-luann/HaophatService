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
      className="bg-white mb-20 last:mb-0 p-16 border border-gray-200 rounded-md cursor-pointer
		hover:bg-gray-200 ease-linear duration-150 active:bg-white"
      onClick={() => {
        onExternalClick?.()
      }}
    >
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-md">{`Phiếu bảo hành: ${item?.name}`}</p>

          <p className="text-md">{`Đơn hàng: ${item?.picking_id?.name}`}</p>

          <p className="text-md">{`Số hóa đơn: ${item?.invoice_ref}`}</p>

          <p className="text-md">{`Ngày bắt đầu: ${item?.warranty_starting}`}</p>
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
