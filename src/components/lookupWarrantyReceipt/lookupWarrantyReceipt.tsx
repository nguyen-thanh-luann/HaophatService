import { SearchIcon } from '@/assets'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'

interface LookupWarrantyReceiptProps {
  className?: string
}

export const LookupWarrantyReceipt = ({ className }: LookupWarrantyReceiptProps) => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/lookup-warranty-receipt')
      }}
      className={twMerge(
        classNames(
          `min-w-header_tab_width h-header_tab_height flex p-8 gap-8 rounded-[8px] items-center shadow-shadow-1 cursor-pointer bg-background hover:bg-primary-100 group`,
          className
        )
      )}
    >
      <div className="">
        <SearchIcon className="text-gray w-16 h-16 group-hover:text-primary" />
      </div>

      <div className="hidden md:block">
        <p className="title !text-gray group-hover:!text-primary">Tra cứu bảo hành</p>
      </div>
    </div>
  )
}
