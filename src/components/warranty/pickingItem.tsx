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
      className="rounded-sm p-8 cursor-pointer border-1 shadow-sm
      border-gray-200 hover:bg-gray-10 mb-12 last:mb-0 active:bg-white flex items-center gap-12"
    >
      <div>
        <p className="title-md">{data?.name}</p>
        <p className="text-md">{formatMoneyVND(data?.amount_total || 0)}</p>
      </div>
    </div>
  )
}
