import { isRemoteImageUrl } from '@/helper'
import { CategoryBrand } from '@/types'
import classNames from 'classnames'
import { CustomImage } from '../customImage'

interface CategoryBrandProps {
  className?: string
  data: CategoryBrand
}

export const CategoryBrandItem = ({ className, data }: CategoryBrandProps) => {
  const hanldeClick = () => {
    if (isRemoteImageUrl(data.description_url)) {
      window.open(data.description_url, '_blank')
    }
  }

  return (
    <div onClick={hanldeClick} className={classNames('cursor-pointer', className)}>
      <div className="mb-8 border border-gray-200 rounded-xl">
        <CustomImage
          src={data?.image_url?.image_url || ''}
          imageClassName="object-cover aspect-1 rounded-xl"
          className=""
        />
      </div>

      <p className="text-base md:text-md line-clamp-2 text-center">{data?.brand_news_name}</p>
    </div>
  )
}
