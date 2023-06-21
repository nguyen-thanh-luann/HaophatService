import React from 'react'
import { useQuery } from '@/hooks'
import { Picking, WarrantyParams } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { warrantyAPI } from '@/services'
import { Spinner } from '../spinner'
import { isArrayHasValue } from '@/helper'
import { DEFAULT_LIMIT } from '@/constants'
import { PickingItem } from './pickingItem'
import { NotFound } from '../notFound'

interface ISelectPicking {
  onClick?: Function
}

export const SelectPicking = ({ onClick: onExternalClick }: ISelectPicking) => {
  const {
    data: pickingList,
    isValidating,
    fetchMore,
    hasMore,
  } = useQuery<Picking, WarrantyParams>({
    key: `get_store_list_picking_order`,
    fetcher: warrantyAPI.getStoreListPickingOrder,
    initialParams: {
      limit: 12,
    },
    data_key: 'picking',
  })

  const handleFetchMore = () => {
    fetchMore({ params: {} })
  }

  return (
    <div className="mt-12">
      <div className="max-h-[300px] overflow-scroll">
        {isValidating ? (
          <Spinner />
        ) : isArrayHasValue(pickingList) ? (
          <div>
            <InfiniteScroll
              dataLength={pickingList?.length || DEFAULT_LIMIT}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {pickingList?.map((item, index) => (
                <PickingItem
                  data={item}
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                />
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
