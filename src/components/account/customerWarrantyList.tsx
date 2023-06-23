import { CustomerWarrantyState, DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCustomerWarranty } from '@/hooks'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ModalCustomerWarrantyReceiptDetail } from '../modal'
import { NotFound } from '../notFound'
import { Tabs } from '../tabs'
import { ListWarrantyReceiptLoading, WarrantyReceiptItem } from '../warranty'

interface CustomerWarrantyListProps {
  className?: string
}

export const CustomerWarrantyList = ({ className }: CustomerWarrantyListProps) => {
  const [currentTab, setCurrentTab] = useState<string>('all')
  const [currentWarrantyId, setCurretnWarrantyId] = useState<number | undefined>(undefined)

  const {
    data: listWarrantyReceipt,
    isValidating,
    fetchMore,
    hasMore,
    filter,
  } = useCustomerWarranty({
    key: `${SWR_KEY.customer_warranty_receipt_list}`,
    data_key: 'warranty_receipt_customer',
    params: {
      limit: DEFAULT_LIMIT,
      warranty_state: currentTab !== 'all' ? [currentTab] : [],
    },
  })

  useEffect(() => {
    filter({
      params: {
        warranty_state: currentTab !== 'all' ? [currentTab] : [],
      },
    })
  }, [currentTab])

  const FilterTab = CustomerWarrantyState.map((item) => {
    return {
      label: item.title,
      value: item.state,
    }
  })

  const handleFetchMore = () => {
    fetchMore({ params: { warranty_state: currentTab !== 'all' ? [currentTab] : [] } })
  }

  return (
    <div className={classNames('', className)}>
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

      <div>
        {isValidating ? (
          <div className="bg-white">
            <ListWarrantyReceiptLoading />
          </div>
        ) : isArrayHasValue(listWarrantyReceipt) ? (
          <div
            className="max-h-[80vh] overflow-auto scrollbar-hide"
            id="warrantyListScrollableTarget"
          >
            <InfiniteScroll
              scrollableTarget="warrantyListScrollableTarget"
              dataLength={listWarrantyReceipt?.length}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={
                hasMore ? (
                  <div className="bg-white">
                    <ListWarrantyReceiptLoading />
                  </div>
                ) : null
              }
            >
              {listWarrantyReceipt?.map((item: any) => (
                <WarrantyReceiptItem
                  key={item.warranty_receipt_customer_id}
                  receipt={item}
                  onClick={() => {
                    setCurretnWarrantyId(item.warranty_receipt_customer_id)
                  }}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <NotFound notify="Không tìm thấy thông tin" />
        )}
      </div>

      <ModalCustomerWarrantyReceiptDetail
        isOpen={currentWarrantyId !== undefined}
        warranty_receipt_customer_id={currentWarrantyId}
        onClose={() => {
          setCurretnWarrantyId(undefined)
        }}
      />
    </div>
  )
}
