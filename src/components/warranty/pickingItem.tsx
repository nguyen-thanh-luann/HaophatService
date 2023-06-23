import { formatMoneyVND } from '@/helper'
import { Picking } from '@/types'
import React from 'react'

interface PickingItemProps {
 data: Picking,
 onClick: Function
}

export const PickingItem = ({data, onClick: onExternalClick}: PickingItemProps) => {
  return (
    <div
      onClick={() => {
        onExternalClick?.(data)
      }}
      className="rounded-md p-8 cursor-pointer border 
      border-gray-200 hover:bg-gray-100 mb-12 last:mb-0 flex items-center gap-12"
    >
      <div>
        <p className="text-base">{`Mã hóa đơn: ${data?.name}`}</p>
        <p className="text-base">{`Tổng: ${formatMoneyVND(data?.amount_total || 0)}`}</p>
      </div>
    </div>
  )
}
