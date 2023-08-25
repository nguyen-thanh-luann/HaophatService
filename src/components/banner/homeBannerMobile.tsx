import { SWR_KEY } from '@/constants'
import { isArrayHasValue, isRemoteImageUrl } from '@/helper'
import { useBanner } from '@/hooks'
import classNames from 'classnames'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { twMerge } from 'tailwind-merge'
import { CustomImage } from '../customImage'
import ReactPlayer from 'react-player'

interface HomeBannerMobileProps {
  className?: string
}

export const HomeBannerMobile = ({ className }: HomeBannerMobileProps) => {
  const { data: bannerList, isValidating: bannerListLoading } = useBanner({
    key: `${SWR_KEY.get_mobile_banner}`,
    params: {
      banner_size: '2:1',
    },
  })

  if (!bannerListLoading && !bannerList) return null

  return (
    <div className={twMerge(classNames('md:hidden', className))}>
      {bannerListLoading ? (
        <div className="animate-pulse bg-gray-200 aspect-[2/1]"></div>
      ) : isArrayHasValue(bannerList) ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          slidesPerGroup={1}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <div>
            {bannerList.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="">
                  {banner?.banner_type === 'banner_video' ? (
                    <div className="aspect-[2/1]">
                      <ReactPlayer
                        className=""
                        url={banner?.banner_video_url}
                        width="100%"
                        height="100%"
                        autoPlay={true}
                        playing={true}
                      />
                    </div>
                  ) : (
                    <CustomImage
                      src={`${banner?.banner_cloud_storage_id?.url || ''}`}
                      alt="banner"
                      onClick={() => {
                        if (isRemoteImageUrl(banner?.description_url)) {
                          window.open(banner?.description_url, '_blank')
                        }
                      }}
                      imageClassName={classNames(
                        'object-cover w-full aspect-[2/1]',
                        isRemoteImageUrl(banner?.description_url) ? 'cursor-pointer' : ''
                      )}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      ) : (
        <div className="animate-pulse bg-gray-200 aspect-[2/1]"></div>
      )}
    </div>
  )
}
