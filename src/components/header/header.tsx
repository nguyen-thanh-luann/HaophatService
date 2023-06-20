import { logoSm } from '@/assets'
import classNames from 'classnames'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { AccountDrawer } from '../account'
import { CartDrawer } from '../cart'
import { HeaderSearchProduct } from '../headerSearchProduct'
import { Image } from '../image'

interface HeaderProps {
  className?: string
}

export const Header = ({className}: HeaderProps) => {
  return (
    <div className={twMerge(classNames(`bg-background h-header_height`, className))}>
      <div className="container flex items-center py-24 px-12 gap-40">
        <div className="">
          <Link href="/">
            <Image src={logoSm} className="w-[200px] h-[40px]" imageClassName='w-[200px] h-[40px]'/>
          </Link>
        </div>

        <div className="flex-1">
          <HeaderSearchProduct />
        </div>

        <div className="flex items-center justify-between gap-12">
          {/* <SalePoint className='max-w-[120px]'/> */}

          <AccountDrawer className='max-w-[120px]'/>

          <div className={`border-l border-gray-300 h-[24px]`}></div>

          <CartDrawer />
        </div>
      </div>
    </div>
  )
}
