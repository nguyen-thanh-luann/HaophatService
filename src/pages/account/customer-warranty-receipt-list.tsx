import { companyIconSm } from '@/assets'
import {
  Breadcrumb,
  Image,
  ListWarrantyReceiptLoading,
  ModalConfirm,
  ModalCustomerWarrantyReceiptDetail,
  NotFound,
  Spinner,
  Tabs,
  WarrantyReceiptItem,
} from '@/components'
import {
  API_URL,
  CustomerWarrantyState,
  DEFAULT_LIMIT,
  SWR_KEY,
  WEB_DESCRIPTION,
  WEB_TITTLE,
} from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCustomerDetail, useCustomerWarrantyReceiptList, useModal } from '@/hooks'
import { AccountContainer, Main } from '@/templates'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const CustomerWarrantyReceiptListPage = () => {
  const router = useRouter()
  const customer_id = Number(router?.query?.customer_id) || 0
  const [currentTab, setCurrentTab] = useState<string>('all')
  const [currentWarrantyId, setCurretnWarrantyId] = useState<number>()

  const {
    visible: isApproveWarranty,
    openModal: showApproveWarranty,
    closeModal: closeApproveWarranty,
  } = useModal()

  const {
    data: customerDetail,
    isValidating: gettingCustomerDetail,
    // updateCustomerInfo,
  } = useCustomerDetail({
    key: `${SWR_KEY.customer_info}_${customer_id}`,
    params: { customer_id },
  })

  const FilterTab = CustomerWarrantyState.map((item) => {
    return {
      label: item?.title,
      value: item.state,
    }
  })

  const {
    data: customerWarrantyReceiptList,
    isValidating: gettingWarrantyReceiptList,
    hasMore,
    fetchMore,
    filter,
    approveWarrantyReceiptForCustomer,
  } = useCustomerWarrantyReceiptList({
    key: `${SWR_KEY.customer_warranty_receipt_list}`,
    data_key: 'warranty_receipt_customer',
    params: {
      customer_id,
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

  const handleFetchMore = () => {
    fetchMore({ params: { warranty_state: currentTab !== 'all' ? [currentTab] : [] } })
  }

  const handleViewWarantyReceiptDetail = (data: number) => {
    setCurretnWarrantyId(data)
  }

  const handleApproveWarrantyForCustomer = (warranty_id: number) => {
    console.log('call appreove', warranty_id)

    approveWarrantyReceiptForCustomer(
      {
        warranty_receipt_customer_id: warranty_id,
      },
      () => {
        closeApproveWarranty()
        setCurretnWarrantyId(undefined)
      }
    )
  }

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Thông tin bảo hành của khách hàng',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <div className="border-b border-gray-200 pb-12 mb-24 flex-between flex-wrap">
            <p className="text-xl font-semibold">Thông tin bảo hành của khách hàng</p>
          </div>

          <div className="mb-12">
            {gettingCustomerDetail ? (
              <div className="flex-center">
                <Spinner />
              </div>
            ) : customerDetail ? (
              <div className="flex-center">
                <div className="flex flex-col items-center">
                  <Image
                    src={
                      customerDetail?.avatar_url?.url
                        ? `${API_URL}${customerDetail?.avatar_url?.url}`
                        : companyIconSm
                    }
                    alt="user avatar"
                    className="w-[100px]"
                    imageClassName="rounded-full w-[100px] h-[100px] object-cover"
                  />

                  <p className="text-md font-bold">{customerDetail?.partner_name}</p>
                </div>
              </div>
            ) : null}
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
            {gettingWarrantyReceiptList ? (
              <ListWarrantyReceiptLoading />
            ) : isArrayHasValue(customerWarrantyReceiptList) ? (
              <div
                className="max-h-[80vh] overflow-auto scrollbar-hide"
                id="warrantyListScrollableTarget"
              >
                <InfiniteScroll
                  scrollableTarget="warrantyListScrollableTarget"
                  dataLength={customerWarrantyReceiptList?.length}
                  next={handleFetchMore}
                  hasMore={hasMore}
                  loader={hasMore ? <ListWarrantyReceiptLoading /> : null}
                >
                  {customerWarrantyReceiptList?.map((item: any) => (
                    <WarrantyReceiptItem
                      key={item.warranty_receipt_customer_id}
                      receipt={item}
                      onClick={handleViewWarantyReceiptDetail}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            ) : (
              <NotFound notify="Không tìm thấy thông tin nào" />
            )}
          </div>

          <ModalCustomerWarrantyReceiptDetail
            isOpen={currentWarrantyId !== undefined}
            warranty_receipt_customer_id={currentWarrantyId}
            onClose={() => {
              setCurretnWarrantyId(undefined)
            }}
            onApprove={() => {
              showApproveWarranty()
            }}
          />
        </div>

        <ModalConfirm
          visible={isApproveWarranty}
          title="Duyệt phiếu bảo hành?"
          onConfirm={() => {
            currentWarrantyId && handleApproveWarrantyForCustomer(currentWarrantyId)
          }}
          onDeny={() => {
            closeApproveWarranty()
          }}
        />
      </AccountContainer>
    </Main>
  )
}

export default CustomerWarrantyReceiptListPage
