import { DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useQuery } from '@/hooks'
import { UserAccount, WarrantyParams } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomImage } from '../customImage'
import { SearchField } from '../form'
import { NotFound } from '../notFound'
import { Spinner } from '../spinner'
import { warrantyAPI } from '@/services'

interface ISelectCustomer {
  onClick?: Function
}

export const SelectCustomer = ({ onClick: onExternalClick }: ISelectCustomer) => {
  const {
    data: customerList,
    isValidating,
    fetchMore,
    hasMore,
    mutate,
  } = useQuery<UserAccount, WarrantyParams>({
    key: `${SWR_KEY.list_customer}`,
    fetcher: warrantyAPI.getListCustomer,
    initialParams: {
      limit: 12,
    },
    data_key: 'customer',
  })

  console.log({ customerList })

  const handleFetchMore = () => {
    fetchMore({
      params: {},
    })
  }

  const handleSearchCustomer = async (data: any) => {
    try {
      const res: any = await (data
        ? warrantyAPI.searchCustomer({ customer_phone: data })
        : warrantyAPI.getListCustomer({ limit: 12 }))

      mutate(res?.result?.data?.customer || [], false)
    } catch (error) {}
  }

  return (
    <div className="">
      <div className="my-12">
        <SearchField
          placeholder={`Nhập số điện thoại`}
          onSubmit={(val) => {
            handleSearchCustomer(val)
          }}
          onChangeWithDebounceValue={(val) => {
            handleSearchCustomer(val)
          }}
          className="border border-gray-200 p-8"
        />
      </div>

      <div className="mt-12 max-h-[300px] overflow-scroll">
        {isValidating ? (
          <div className="flex-center">
            <Spinner />
          </div>
        ) : isArrayHasValue(customerList) ? (
          <div>
            <InfiniteScroll
              dataLength={customerList?.length || DEFAULT_LIMIT}
              next={() => handleFetchMore()}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {customerList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                  className="rounded-lg p-8 cursor-pointer border-1 
                  border-gray-200 hover:bg-gray-100 mb-12 last:mb-0 active:bg-opacity-50 flex items-center duration-150 ease-in-out"
                >
                  <div className="relative">
                    <CustomImage
                      src={item?.avatar_url?.url || ''}
                      className="w-[30px]"
                      imageClassName="rounded-full w-[30px] h-[30px] object-cover"
                    />
                  </div>
                  <div className="ml-12">
                    <p className="title-sm">{(item as UserAccount)?.partner_name}</p>
                    <p className="text-sm"> {(item as UserAccount)?.phone}</p>
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
