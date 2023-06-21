import { CustomerWarrantyState } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useQuery, useUser } from '@/hooks'
import { warrantyAPI } from '@/services'
import { WarrantyParams } from '@/types'
import classNames from 'classnames'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchForm } from '../form'
import { NotFound } from '../notFound'
import { Spinner } from '../spinner'
import { Tabs } from '../tabs'
import { StoreWarrantyReceiptItem } from '../warranty'
import { ModalStoreWarrantyReceiptDetail } from '../modal'

interface StoreWarrantyListProps {
  className?: string
}

export const StoreWarrantyList = ({ className }: StoreWarrantyListProps) => {
  const { userInfo } = useUser({})
  const [searching, setSearching] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<string>('all')
  const [currentWarrantyId, setCurrentWarrantyId] = useState<number | undefined>(undefined)

  const {
    data: warrantyReceiptList,
    isValidating,
    fetchMore,
    hasMore,
    mutate,
  } = useQuery<any, WarrantyParams>({
    key: `get_store_list_warranty${currentTab}`,
    fetcher: warrantyAPI.getStoreListWarrantyReceipt,
    initialParams: {
      limit: 7,
      warranty_state: currentTab !== 'all' ? [currentTab] : [],
    },
    data_key: 'warranty_receipt',
  })

  const FilterTab = CustomerWarrantyState.map((item) => {
    return {
      label: item.title,
      value: item.state,
    }
  })

  const handleSearchWarrantyReceipt = async (data: string) => {
    if (!data) return
    try {
      setSearching(true)
      const res: any = await warrantyAPI.storeSearchWarrantyReceipt({
        store_phone: userInfo?.account?.phone,
        invoice_code: data,
      })

      mutate(res?.result?.data?.warranty_receipt || [], false)
      setSearching(false)
    } catch (error) {
      setSearching(false)
    }
  }

  const handleFetchMore = () => {
    fetchMore({ params: { warranty_state: currentTab !== 'all' ? [currentTab] : [] } })
  }

  return (
    <div className={classNames('', className)}>
      <div className="mb-12">
        <SearchForm
          placeholder={`Nhập mã tham chiếu`}
          onSubmit={(val: any) => handleSearchWarrantyReceipt(val)}
        />
      </div>

      <div className="mb-12">
        <Tabs
          list={[{ label: `Tất cả`, value: 'all' }, ...FilterTab]}
          tabActive={currentTab}
          onChange={(val: string) => {
            setCurrentTab(val)
          }}
          className="w-fit"
          labelClassName="px-12 py-8 text-center border-b border-white"
          tabActiveClassName="!border-primary text-primary"
        />
      </div>

      <div className="">
        {isValidating || searching ? (
          <div className="bg-white h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : isArrayHasValue(warrantyReceiptList) ? (
          <div>
            <InfiniteScroll
              dataLength={warrantyReceiptList?.length || 0}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {warrantyReceiptList?.map((item: any) => (
                <StoreWarrantyReceiptItem
                  onClick={() => {
                    setCurrentWarrantyId(item?.warranty_receipt_id)
                  }}
                  item={item}
                  key={item?.warranty_receipt_id}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <NotFound notify="Không tìm thấy thông tin" />
        )}

        {currentWarrantyId ? (
          <ModalStoreWarrantyReceiptDetail
            isOpen={currentWarrantyId !== undefined}
            warranty_receipt_id={currentWarrantyId}
            externalMutate={mutate}
            externalDataMutate={warrantyReceiptList}
            onClose={() => {
              setCurrentWarrantyId(undefined)
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
