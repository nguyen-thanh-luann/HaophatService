import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddress, useAgency } from '@/hooks'
import { OptionType, UserAccount } from '@/types'
import { Button } from '../button'
import { SelectField } from '../inputs'
import { DEFAULT_LIMIT, SWR_KEY } from '@/constants'
import { SearchField } from '../form'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '../spinner'
import { StoreItem } from '../store'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { isArrayHasValue } from '@/helper'
import { NotFound } from '../notFound'

interface ISelectProductWarranty {
  onClick?: Function
}

export const SelectAgency = ({ onClick: onExternalClick }: ISelectProductWarranty) => {
  const { control, getValues, resetField, setValue } = useForm({
    mode: 'all',
  })

  const { districts, getDistricts, getWards, states } = useAddress()

  const [selectedStore, setSelectedStore] = useState<UserAccount>()

  const {
    data: stores,
    filter,
    hasMore,
    fetchMore,
    isValidating,
  } = useAgency({
    key: SWR_KEY.store_list,
    params: {
      limit: DEFAULT_LIMIT,
    },
    data_key: 'store',
  })

  // tỉnh
  const handleSelectState = (val: OptionType<number>) => {
    getDistricts(val.value)
    filter({ params: { province_id: val.value } })

    if (getValues('district') || getValues('ward')) {
      resetField('district')
      resetField('ward')
    }
  }

  // huyện
  const handleSelectDistrict = (district: OptionType<number>) => {
    getWards(district.value)
    filter({ params: { province_id: getValues('state').value, district_id: district?.value } })
  }

  const hanldeStoreClick = (store: UserAccount) => {
    if (!store) {
      toast.error('Vui lòng chọn đại lý')
      return
    }

    setSelectedStore(store)

    setValue('agency', {
      label: store.partner_name,
      value: store.partner_id,
    })
  }

  return (
    <div className="">
      <SearchField
        placeholder="Tìm theo tên cửa hàng"
        className="border mb-12 rounded-full px-12 py-6"
        onChangeWithDebounceValue={(val) => {
          filter({
            params: {
              store_name: val,
            },
          })
        }}
      />

      <div className="mb-12 hidden md:flex items-center justify-center">
        <div className="block min-w-[132px] w-[10%] h-[1px] border border-t border-gray-300"></div>
        <p className="title-lg text-center capitalize mx-12">Hoặc</p>
        <div className="block min-w-[132px] w-[10%] h-[1px] border border-t border-gray-300"></div>
      </div>

      <div className="flex items-center flex-wrap gap-12 mb-12">
        <div className="flex-1 min-w-[200px]">
          <SelectField
            label="Tỉnh / Thành Phố"
            control={control}
            onChange={(val: any) => {
              handleSelectState(val)
            }}
            placeholder="Tỉnh thành phố"
            name="state"
            options={states?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <SelectField
            label="Quận / Huyện"
            value={getValues('district') || null}
            control={control}
            onChange={(val: any) => {
              handleSelectDistrict(val)
              if (getValues('ward')) resetField('ward')
            }}
            placeholder={'Quận / Huyện'}
            name="district"
            options={districts?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>
      </div>

      {/* <div className="mb-24">
        <SelectField
          label="Đại lý"
          name="agency"
          control={control}
          required={true}
          placeholder="Chọn đại lý"
          options={stores?.map((item) => ({
            label: item.partner_name,
            value: item.partner_id,
          }))}
        />
      </div> */}

      {isValidating ? (
        <div className="flex-center mb-12">
          <Spinner />
        </div>
      ) : isArrayHasValue(stores) ? (
        <div className="max-h-[350px] overflow-auto mb-12" id="storesScrollabelTarget">
          <InfiniteScroll
            scrollableTarget="storesScrollabelTarget"
            dataLength={stores?.length}
            next={() => {
              fetchMore({
                params: {},
              })
            }}
            hasMore={hasMore}
            loader={
              hasMore ? (
                <div className="flex-center">
                  <Spinner />
                </div>
              ) : null
            }
          >
            {stores?.map((store) => (
              <StoreItem
                onClick={() => hanldeStoreClick(store)}
                key={store?.partner_id}
                data={store}
                className={classNames(
                  'mb-12 last:mb-0 cursor-pointer border hover:border-primary hover:shadow-md hover:shadow-primary-10 duration-300 ease-in-out',
                  selectedStore?.partner_id === store?.partner_id ? 'border-primary' : ''
                )}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <NotFound notify="Không tìm thấy cửa hàng" />
      )}

      <Button
        title="Xác nhận"
        className={`w-full bg-primary p-8`}
        textClassName="text-white"
        onClick={() => {
          onExternalClick?.(getValues('agency'))
        }}
      />
    </div>
  )
}
