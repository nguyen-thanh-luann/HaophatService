import classNames from 'classnames'
import React from 'react'
import { WarrantyReceiptItemLoading } from './warrantyReceiptItemLoading'

interface ListWarrantyReceiptLoadingProps {
  className?: string
  number?: number
}

export const ListWarrantyReceiptLoading = ({
  className,
  number = 4,
}: ListWarrantyReceiptLoadingProps) => {
  return (
    <div className={classNames('', className)}>
      {Array?.from({ length: number })?.map((_, index) => (
        <WarrantyReceiptItemLoading key={index} />
      ))}
    </div>
  )
}
