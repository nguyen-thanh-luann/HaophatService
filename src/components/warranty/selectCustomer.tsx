import { DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCustomer } from '@/hooks'
import { warrantyAPI } from '@/services'
import { UserAccount } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomImage } from '../customImage'
import { SearchField } from '../form'
import { NotFound } from '../notFound'
import { Spinner } from '../spinner'
import { useState } from 'react'

interface ISelectCustomer {
  onClick?: Function
}

export const SelectCustomer = ({ onClick: onExternalClick }: ISelectCustomer) => {
  const [searching, setSearching] = useState<boolean>(false)

  const {
    data: customerList,
    isValidating,
    fetchMore,
    mutate,
    hasMore,
    filter,
  } = useCustomer({
    key: `${SWR_KEY.list_customer}`,
    params: {
      limit: DEFAULT_LIMIT,
    },
  })

  const handleSearchCustomer = async (data: string) => {
    if (data) {
      try {
        setSearching(true)
        const res: any = await warrantyAPI.searchCustomer({ customer_phone: data })

        setSearching(false)
        mutate(res?.result?.data?.customer || res?.data?.customer || [], false)
      } catch (error) {
        setSearching(false)
      }
    } else {
      filter({ params: {} })
    }
  }

  return (
    <div className="">
      <div className="mb-12">
        <SearchField
          placeholder={`Nhập số điện thoại`}
          onSubmit={(val: any) => {
            handleSearchCustomer(val)
          }}
          onChangeWithDebounceValue={(val) => {
            handleSearchCustomer(val)
          }}
          className="border border-gray-200 p-8"
        />
      </div>

      <div className="">
        {isValidating || searching ? (
          <div className="flex-center">
            <Spinner />
          </div>
        ) : isArrayHasValue(customerList) ? (
          <div
            className="max-h-[300px] overflow-auto scrollbar-hide"
            id="customerListScrollableTarget"
          >
            <InfiniteScroll
              scrollableTarget="customerListScrollableTarget"
              dataLength={customerList?.length || DEFAULT_LIMIT}
              next={() => {
                fetchMore({ params: { limit: DEFAULT_LIMIT } })
              }}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {customerList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                  className="rounded-lg p-8 cursor-pointer border
                  border-gray-200 hover:bg-gray-100 mb-12 last:mb-0 flex gap-8 items-center duration-200"
                >
                  <div className="relative">
                    <CustomImage
                      src={item?.avatar_url?.url || ''}
                      className="w-[40px]"
                      imageClassName="rounded-full w-[40px] h-[40px] object-cover"
                    />
                  </div>
                  <div className="">
                    <p className="text-base">{(item as UserAccount)?.partner_name}</p>
                    <p className="text-base"> {(item as UserAccount)?.phone}</p>
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
