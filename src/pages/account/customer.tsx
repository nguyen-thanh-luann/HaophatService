import { PlusIcon, TimesIcon } from '@/assets'
import {
  Breadcrumb,
  Button,
  Customer,
  CustomerForm,
  Modal,
  NotFound,
  SearchForm,
  Spinner,
} from '@/components'
import { DEFAULT_LIMIT, SWR_KEY, WEB_DESCRIPTION } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { useCustomer, useModal, useQuery } from '@/hooks'
import { warrantyAPI } from '@/services'
import { AccountContainer, Main } from '@/templates'
import { CreateCustomerWarrantyReq, UserAccount, WarrantyParams } from '@/types'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const CustomerPage = () => {
  const [searching, setSearching] = useState<boolean>(false)

  const { createCustomerWarranty } = useCustomer({
    key: `${SWR_KEY.get_list_customer}`,
  })

  const {
    visible: isShowCustomerForm,
    openModal: showCustomerForm,
    closeModal: closeCustomerForm,
  } = useModal()

  const {
    data: customerList,
    isValidating,
    fetchMore,
    mutate,
    hasMore,
  } = useQuery<UserAccount, WarrantyParams>({
    key: `get_list_customer`,
    fetcher: warrantyAPI.getListCustomer,
    initialParams: {
      limit: 24,
    },
    data_key: 'customer',
  })

  const handleSearchCustomer = async (data: string) => {
    try {
      setSearching(true)
      const res: any = await (data
        ? warrantyAPI.searchCustomer({ customer_phone: data })
        : warrantyAPI.getListCustomer({ limit: 12 }))

      setSearching(false)
      mutate(res?.result?.data?.customer || res?.data?.customer || [], false)
    } catch (error) {
      setSearching(false)
    }
  }

  const handleCreateCustomer = (data: CreateCustomerWarrantyReq) => {
    createCustomerWarranty(
      {
        customer_name: data?.customer_name,
        customer_phone: data?.customer_phone,
      },
      () => {
        closeCustomerForm()
      }
    )
  }

  return (
    <Main title={'Khách hàng'} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Khách hàng',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <div className="border-b border-gray-200 pb-12 mb-24 flex-between flex-wrap">
            <p className="text-xl capitalize font-semibold"> Danh sách khách hàng</p>
            <Button
              title="Thêm khách hàng"
              className="bg-primary py-8 px-20 active:opacity-50 duration-200"
              textClassName="text-white"
              icon={<PlusIcon className="text-white" />}
              onClick={showCustomerForm}
            />
          </div>

          <div className="mb-12">
            <SearchForm
              placeholder={`Nhập số điện thoại`}
              onSubmit={(val: any) => handleSearchCustomer(val)}
            />
          </div>

          <div className="">
            {isValidating || searching ? (
              <div className="flex-center">
                <Spinner />
              </div>
            ) : isArrayHasValue(customerList) ? (
              <div className="h-[60vh] overflow-scroll scrollbar-hide">
                <InfiniteScroll
                  dataLength={customerList?.length || 0}
                  next={() => {
                    fetchMore({ params: { limit: DEFAULT_LIMIT } })
                  }}
                  hasMore={hasMore}
                  loader={hasMore ? <Spinner /> : null}
                >
                  {customerList?.map((item, index) => (
                    <Customer key={index} customer={item as UserAccount} onClick={() => {}} />
                  ))}
                </InfiniteScroll>
              </div>
            ) : (
              <NotFound notify="Không tìm thấy thông tin" />
            )}
          </div>

          <Modal
            visible={isShowCustomerForm}
            headerClassName="hidden"
            modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
          >
            <div>
              <div className="flex-between p-12">
                <p className="text-md font-bold">Thêm khách hàng</p>
                <div className="cursor-pointer" onClick={closeCustomerForm}>
                  <TimesIcon />
                </div>
              </div>

              <div className="max-h-[400px] h-fit overflow-scroll scrollbar-hide p-12">
                <CustomerForm className="mt-20" type="create" onSubmit={handleCreateCustomer} />
              </div>
            </div>
          </Modal>
        </div>
      </AccountContainer>
    </Main>
  )
}

export default CustomerPage
