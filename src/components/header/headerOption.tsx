import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderOptionProps {
  className?: string
  onClick?: () => void
  icon?: ReactElement
  title?: string
}

export const HeaderOption = ({
  className,
  icon,
  title,
  onClick: onExternalClick,
}: HeaderOptionProps) => {
  return (
    <div
      onClick={() => {
        onExternalClick?.()
      }}
      className={twMerge(
        classNames(
          `min-w-header_tab_width h-header_tab_height flex p-8 gap-8 rounded-[8px] items-center shadow-shadow-1 cursor-pointer bg-background hover:bg-primary-100 group`,
          className
        )
      )}
    >
      <div className="">{icon}</div>

      {title && (
        <div className="hidden md:block">
          <p className="title !text-gray group-hover:!text-primary">{title}</p>
        </div>
      )}
    </div>
  )
}
