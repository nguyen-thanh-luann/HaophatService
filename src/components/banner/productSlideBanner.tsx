import { Banner } from '@/types'
import classNames from 'classnames'
import { CustomImage } from '../customImage'
import ReactPlayer from 'react-player'

interface ProductSlideBanner {
  data: Banner | undefined
  className?: string
}

export const ProductSlideBanner = ({ data, className }: ProductSlideBanner) => {
  if (!data) return <div></div>

  return (
    <div className={classNames('', className)}>
      {data?.banner_type === 'banner_video' ? (
        <div className="aspect-2/1 md:aspect-[5/1]">
          <ReactPlayer className="" url={data?.banner_video_url} width="100%" height="100%" />
        </div>
      ) : (
        <CustomImage
          src={data?.banner_cloud_storage_id?.url}
          imageClassName="object-cover aspect-2/1 md:aspect-[5/1]"
          className=""
        />
      )}
    </div>
  )
}
