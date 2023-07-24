import { SearchIcon } from '@/assets'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

interface HeaderLookupProps {
  className?: string
}

export const HeaderLookup = ({ className }: HeaderLookupProps) => {

  const router = useRouter()
  
  return (
    <div className={twMerge(classNames(`relative group`, className))}>
      <div className="min-w-header_tab_width w-[100px] h-header_tab_height flex p-8 gap-8 rounded-[8px] items-center shadow-shadow-1 cursor-pointer group bg-background hover:bg-primary-100">
        <SearchIcon className="text-gray w-16 h-16 group-hover:text-primary" />

        <div className="hidden md:block">
          <p className="title !text-gray group-hover:!text-primary line-clamp-1 break-all">
            Tra cứu
          </p>
        </div>
      </div>

      <div className="absolute z-40 left-[-25%] shadow-shadow-1 rounded-[10px] p-12 w-[198px] hidden group-hover:block bg-white">
        <div
          className="group/child flex items-center mb-12 last:mb-0 rounded-[6px] p-6 hover:bg-primary-100 cursor-pointer"
          onClick={() => {
            router.push('/lookup-warranty-receipt')
          }}
        >
          <p className="title !text-gray group-hover/child:!text-primary">{`Tra cứu bảo hành`}</p>
        </div>
        <div
          className="group/child flex items-center mb-12 last:mb-0 rounded-[6px] p-6 hover:bg-primary-100 cursor-pointer"
          onClick={() => {
            router.push('/tc')
          }}
        >
          <p className="title !text-gray group-hover/child:!text-primary">{`Tra cứu chính hãng`}</p>
        </div>
      </div>
    </div>
  )
}
