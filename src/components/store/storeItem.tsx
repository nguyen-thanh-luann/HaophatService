import { UserAccount } from '@/types'
import classNames from 'classnames'
import React from 'react'

interface StoreItemProps {
  data: UserAccount
  className?: string
  onClick?: (props: UserAccount) => void
}

export const StoreItem = ({ data, className, onClick: onExternalClick }: StoreItemProps) => {
  return (
    <div onClick={() => {
      onExternalClick?.(data)
    }} className={classNames('border rounded-md border-gray-200 p-8', className)}>
      <p className="text-md font-bold">{data?.partner_name}</p>
      <p className="text-base">{data?.full_address}</p>
    </div>
  )
}
