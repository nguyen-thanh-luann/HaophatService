import React from 'react'
import { SearchField } from '../form'
import { useQuery } from '@/hooks'
import { WarrantyParams, WarrantyProductItem } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '../spinner'
import { warrantyAPI } from '@/services'
import { isArrayHasValue } from '@/helper'
import { API_URL, DEFAULT_LIMIT } from '@/constants'
import { companyIconSm } from '@/assets'
import { Image } from '../image'
import { NotFound } from '../notFound'

interface ISelectProductWarranty {
  onClick?: Function
}

export const SelectProductWarranty = ({ onClick: onExternalClick }: ISelectProductWarranty) => {
  const {
    data: productWarrantyList,
    isValidating,
    fetchMore,
    hasMore,
    mutate,
  } = useQuery<WarrantyProductItem, WarrantyParams>({
    key: `product_warranty_list`,
    fetcher: warrantyAPI.getListWarrantyProduct,
    initialParams: {
      limit: 12,
    },
    data_key: 'product',
  })

  const handleFetchMore = () => {
    fetchMore({ params: {} })
  }

  const handleSearchProduct = async (data: any) => {
    try {
      const res: any = await warrantyAPI.getListWarrantyProduct({ product_name: data })

      mutate(res?.result?.data?.product || res?.data?.product || [], false)
    } catch (error) {}
  }

  return (
    <div className="">
      <div className="my-12">
        <SearchField
          placeholder={`Tìm kiếm sản phẩm`}
          onSubmit={(val) => {
            handleSearchProduct(val)
          }}
          onChangeWithDebounceValue={(val) => {
            handleSearchProduct(val)
          }}
          className="border border-gray-200 p-8"
        />
      </div>

      <div className="mt-12 max-h-[300px] overflow-scroll scrollbar-hide">
        {isValidating ? (
          <div className="flex-center">
            <Spinner />
          </div>
        ) : isArrayHasValue(productWarrantyList) ? (
          <div>
            <InfiniteScroll
              dataLength={productWarrantyList?.length || DEFAULT_LIMIT}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {productWarrantyList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                  className="rounded-lg p-8 cursor-pointer border-1 
                  border-gray-200 hover:bg-gray-200 mb-12 last:mb-0 active:opacity-50 flex items-center duration-150 ease-in-out"
                >
                  <div className="relative">
                    <Image
                      src={
                        (item as WarrantyProductItem)?.representation_image?.image_url
                          ? `${API_URL}${
                              (item as WarrantyProductItem)?.representation_image?.image_url
                            }`
                          : companyIconSm
                      }
                      alt=""
                      className="w-[40px]"
                      imageClassName="rounded-full object-cover w-[40px] h-[40px]"
                    />
                  </div>
                  <div>
                    <p className="ml-4 title-xs line-clamp-1">
                      {(item as WarrantyProductItem)?.product_name}
                    </p>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <NotFound notify="Không tìm thấy thông tin" />
        )}
      </div>
    </div>
  )
}
