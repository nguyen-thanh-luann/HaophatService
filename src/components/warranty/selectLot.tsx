import React from 'react'
import { useQuery } from '@/hooks'
import { Lot, WarrantyParams } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '../spinner'
import { warrantyAPI } from '@/services'
import { isArrayHasValue } from '@/helper'
import { DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { NotFound } from '../notFound'

interface ISelectProductWarranty {
  onClick?: Function
  product_id?: number
}

export const SelectLot = ({ onClick: onExternalClick, product_id = 0 }: ISelectProductWarranty) => {
  const {
    data: lotList,
    isValidating,
    fetchMore,
    hasMore,
  } = useQuery<Lot, WarrantyParams>({
    key: `${SWR_KEY.product_lot_list}_${product_id}`,
    fetcher: warrantyAPI.getListProductLot,
    initialParams: {
      limit: DEFAULT_LIMIT,
      product_id,
    },
    data_key: 'lot',
  })

  const handleFetchMore = () => {
    fetchMore({ params: { limit: DEFAULT_LIMIT } })
  }

  return (
    <div className="">
      <div className="">
        {isValidating ? (
          <div className="flex-center">
            <Spinner />
          </div>
        ) : isArrayHasValue(lotList) ? (
          <div
            className="max-h-[300px] overflow-scroll scrollbar-hide"
            id="lotListScrollableTarget"
          >
            <InfiniteScroll
              scrollableTarget="lotListScrollableTarget"
              dataLength={lotList?.length || DEFAULT_LIMIT}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={
                hasMore ? (
                  <div className="flex-center">
                    <Spinner />
                  </div>
                ) : null
              }
            >
              {lotList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                  className="rounded-md p-8 cursor-pointer border 
                  border-gray-200 mb-12 last:mb-0"
                >
                  <p className="text-md">{`Serial: ${(item as Lot)?.lot_name}`}</p>
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
