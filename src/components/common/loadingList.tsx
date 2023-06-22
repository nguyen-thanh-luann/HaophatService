import classNames from 'classnames'
import React, { ReactElement } from 'react'

interface LoadingListProps {
  className?: string
  children: ReactElement
  number?: number
}

export const LoadingList = ({ className, children, number = 4 }: LoadingListProps) => {
  return (
    <div className={classNames('', className)}>
      {Array.from({ length: number })?.map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  )
}
