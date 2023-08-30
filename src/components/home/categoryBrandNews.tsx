import { DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { useCategoryBrandNews } from '@/hooks'
import classNames from 'classnames'
import React from 'react'
import { VisceraAttributeItemLoading } from '../attribute'
import { isArrayHasValue } from '@/helper'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import Fade from 'react-reveal/Fade'
import { CategoryBrandItem } from '../category'

interface CategoryBrandNewsProps {
  className?: string
}

export const CategoryBrandNews = ({ className }: CategoryBrandNewsProps) => {
  const { data, isValidating } = useCategoryBrandNews({
    key: `${SWR_KEY.get_category_brand_news}`,
    params: {
      limit: DEFAULT_LIMIT,
    },
  })

  if (isValidating) {
    return (
      <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-12">
        {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
          <VisceraAttributeItemLoading key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={classNames('', className)}>
      {isArrayHasValue(data) ? (
        <div>
          <Swiper
            slidesPerView={6}
            spaceBetween={12}
            slidesPerGroup={1}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
              300: {
                slidesPerView: 5,
              },
              900: {
                slidesPerView: 8,
              },
              1024: {
                slidesPerView: 10,
              },
            }}
          >
            <div>
              {data?.map((item) => (
                <SwiperSlide key={item.brand_news_id}>
                  <Fade right>
                    <CategoryBrandItem data={item} />
                  </Fade>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      ) : null}
    </div>
  )
}
