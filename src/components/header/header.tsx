import { companyIconSm } from '@/assets'
import classNames from 'classnames'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { AccountDrawer } from '../account'
import { CartDrawer } from '../cart'
import { HeaderSearchProduct } from '../headerSearchProduct'
import { Image } from '../image'
import { LookupWarrantyReceipt } from '../lookupWarrantyReceipt'

interface HeaderProps {
  className?: string
}

export const Header = ({className}: HeaderProps) => {
  return (
    <div className={twMerge(classNames(`bg-background h-header_height`, className))}>
      <div className="container flex items-center py-24 px-12 gap-40">
        <div className="">
          <Link href="/">
            <Image src={companyIconSm} className="w-[80px] h-[65px]" imageClassName='w-[80px] h-[65px]'/>
          </Link>
        </div>

        <div className="flex-1">
          <HeaderSearchProduct />
        </div>

        <div className="flex items-center justify-between gap-12">
          <LookupWarrantyReceipt />

          <AccountDrawer />

          <div className={`border-l border-gray-300 h-[24px]`}></div>

          <CartDrawer />
        </div>
      </div>
    </div>
  )
}
