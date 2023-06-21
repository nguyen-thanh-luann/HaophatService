import React from 'react'
import { CustomerWarrantyState } from '@/types'

interface IWarrantyStateLabel {
  state: CustomerWarrantyState | undefined
}

export const WarrantyStateLabel = ({ state }: IWarrantyStateLabel) => {
  return (
    <div className={`p-8 rounded-md w-[120px] ${state?.style}`}>
      <p className="text-13 leading-18 text-center">{state?.title}</p>
    </div>
  )
}
