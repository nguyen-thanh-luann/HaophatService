import { companyIconSm, imageBlur } from '@/assets'
import { API_URL } from '@/constants'
import { isRemoteImageUrl } from '@/helper'
import classNames from 'classnames'
import RImage, { ImageProps as RImageProps } from 'next/image'

export type CustomImageProps = Omit<RImageProps, 'alt'> & {
  alt?: string
  className?: string
  imageClassName?: string
}

export const CustomImage = ({ className, imageClassName, src, ...props }: CustomImageProps) => {
  return (
    <div className={classNames('relative', className)}>
      <RImage
        src={
          src && src !== ''
            ? isRemoteImageUrl(src.toString())
              ? src
              : `${API_URL}${src}`
            : companyIconSm
        }
        width={1000}
        height={1000}
        className={classNames(imageClassName)}
        alt=""
        loading="lazy"
        blurDataURL={imageBlur}
        {...props}
      />
    </div>
  )
}
