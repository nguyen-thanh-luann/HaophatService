import { DownIcon } from '@/assets'
import { SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCategoryList, useCategoryMinorList } from '@/hooks'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'
import { CategoryNavDropDownMenu } from './categoryNavDropDownMenu'

interface HeaderCategoryNavProps {
  className?: string
}

export const CategoryNav = ({ className }: HeaderCategoryNavProps) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [currentCategoryId, setCurrentCategoryId] = useState<number | undefined>()
  const [isCategoryMinor, setIsCategoryMinor] = useState<boolean>(false)

  const { categoryList, isValidating: categoryListLoading } = useCategoryList({
    key: SWR_KEY.get_category_list,
    params: {
      root_category: true,
    },
  })

  const { categoryMinorList, isValidating: categoryMinorListLoading } = useCategoryMinorList({
    key: SWR_KEY.get_category_minor_list,
    params: {
      root_category: true,
    },
  })

  const handleCategoryClick = (id: number, type: 'category' | 'minor_category') => {
    if (type === 'category') {
      router.push(`/search/?category_${id}=${id}`)
    } else {
      router.push(`/search/?minor_category_${id}=${id}`)
    }
    setCurrentCategoryId(undefined)
  }

  return (
    <div ref={ref} className={twMerge(classNames(`bg-primary`, className))}>
      <div className="container">
        <div className="relative" onMouseLeave={() => setCurrentCategoryId(undefined)}>
          <div className="h-header_nav_height">
            {categoryListLoading || categoryMinorListLoading ? (
              <div className="flex-1 flex-center h-header_nav_height">
                <Spinner />
              </div>
            ) : isArrayHasValue(categoryList || categoryMinorList) ? (
              <ScrollContainer className="flex h-header_nav_height gap-12">
                {categoryList?.map((option, index) => (
                  <div
                    onClick={() => handleCategoryClick(option?.category_id, 'category')}
                    onMouseEnter={() => {
                      setIsCategoryMinor(false)
                      setCurrentCategoryId(option?.category_id)
                    }}
                    className="flex items-center gap-6 py-6 px-8 my-auto cursor-pointer min-w-fit"
                    key={index}
                  >
                    <p className="title !text-white uppercase h-[22px] flex-center">
                      {option?.category_name}
                    </p>
                    <div className="w-[22px] h-[22px] flex-center">
                      <DownIcon className="title !text-white" />
                    </div>
                  </div>
                ))}

                {categoryMinorList.map((option, index) => (
                  <div
                    onClick={() => handleCategoryClick(option?.category_id, 'minor_category')}
                    onMouseEnter={() => {
                      setIsCategoryMinor(true)
                      setCurrentCategoryId(option?.category_id)
                    }}
                    // onMouseLeave={() => setIsCategoryMinor(false)}
                    className="flex items-center gap-6 py-6 px-8 my-auto cursor-pointer min-w-fit"
                    key={index}
                  >
                    <p className="title !text-white uppercase h-[22px] flex-center">
                      {option?.category_name}
                    </p>
                    <div className="w-[22px] h-[22px] flex-center">
                      <DownIcon className="title !text-white" />
                    </div>
                  </div>
                ))}
              </ScrollContainer>
            ) : null}
          </div>

          {/* dropdown menu */}
          <div
            className={classNames(
              'absolute z-40 left-0 right-0 transition-opacity ease-in-out duration-500',
              currentCategoryId ? 'flex' : 'hidden'
            )}
          >
            <CategoryNavDropDownMenu
              parent_category_id={currentCategoryId}
              isMinorCategory={isCategoryMinor}
              className="transition-opacity ease-in-out duration-200"
              onClose={() => {
                setCurrentCategoryId(undefined)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
