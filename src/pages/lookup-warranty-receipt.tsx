import {
  Breadcrumb,
  CheckWarrantyform,
  ListWarrantyReceiptLoading,
  ModalCustomerWarrantyReceiptDetail,
  NotFound,
  WarrantyReceiptItem,
} from '@/components'
import { SWR_KEY, WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCheckWarranty, useUser } from '@/hooks'
import { Main } from '@/templates'
import { WarrantyParams } from '@/types'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'

const LookupWarrantyPage = () => {
  const [searchParams, setSearchParams] = useState<WarrantyParams>({})
  const [warrantyReceiptId, setWarrantyReceiptId] = useState<number | undefined>(undefined)
  const { userInfo } = useUser({})

  const handleFormSubmit = (data: WarrantyParams) => {
    setSearchParams(data)
    // console.log({ data })
  }

  const {
    data: warrantyReceipts,
    isValidating,
    hasMore,
    fetchMore,
  } = useCheckWarranty({
    key: `${SWR_KEY?.search_warranty}_${searchParams?.lot_name || 0}_${
      searchParams?.customer_phone || 0
    }`,
    params: searchParams,
  })

  const handleWarrantyReceiptItemClick = (id: number) => {
    if (!userInfo) {
      return toast.error('Vui lòng đăng nhập để xem chi tiết!')
    }
    setWarrantyReceiptId(id)
    return
  }

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container px-12 my-32">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Tra cứu bảo hành',
            },
          ]}
        />

        <div className="py-18 bg-white rounded-md my-12">
          <p className="text-lg font-bold text-center">Tra cứu bảo hành</p>

          <div className="w-[90%] lg:w-[50%] m-auto">
            <CheckWarrantyform onSubmit={handleFormSubmit} />
          </div>

          <div className="border-t border-gray-200 w-[80%] mx-auto my-20"></div>

          <div className="w-[90%] lg:w-[80%] py-12 m-auto ">
            {isValidating ? (
              <ListWarrantyReceiptLoading />
            ) : isArrayHasValue(warrantyReceipts) ? (
              <div
                className="max-h-[50vh] overflow-scroll scrollbar-hide"
                id="warrantyListScrollableTarget"
              >
                <InfiniteScroll
                  scrollableTarget="warrantyListScrollableTarget"
                  dataLength={warrantyReceipts?.length || 0}
                  next={() => {
                    fetchMore({
                      params: {},
                    })
                  }}
                  hasMore={hasMore}
                  loader={hasMore ? <ListWarrantyReceiptLoading /> : null}
                >
                  {warrantyReceipts?.map((item) => (
                    <WarrantyReceiptItem
                      key={item.warranty_receipt_customer_id}
                      receipt={item}
                      onClick={() =>
                        handleWarrantyReceiptItemClick(item?.warranty_receipt_customer_id)
                      }
                    />
                  ))}
                </InfiniteScroll>
              </div>
            ) : (
              <NotFound notify="Không tìm thấy thông tin!" />
            )}
          </div>

          <ModalCustomerWarrantyReceiptDetail
            isOpen={warrantyReceiptId !== undefined}
            warranty_receipt_customer_id={warrantyReceiptId}
            onClose={() => {
              setWarrantyReceiptId(undefined)
            }}
          />
        </div>
      </div>
    </Main>
  )
}

export default LookupWarrantyPage
