import { useAddress, useAgency, useBrand } from '@/hooks'
import { GetListStoreReq, OptionType, UserAccount } from '@/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SearchField } from '../form'
import { SelectField } from '../inputs'

import { DEFAULT_LIMIT, LIMIT_DRUG_STORES, SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { toast } from 'react-hot-toast'
import { NotFound } from '../notFound'
import { Spinner } from '../spinner'
import { StoreItem } from '../store'

import InfiniteScroll from 'react-infinite-scroll-component'

interface StoresListProps {
  className?: string
}

export const StoresList = ({ className }: StoresListProps) => {
  const DEFAULT_SRC_MAP =
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3194.0964722432445!2d106.66689534644978!3d10.80605881000873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1689911417589!5m2!1svi!2s'

  const { control, getValues, resetField } = useForm({
    mode: 'all',
  })

  const { districts, getDistricts, states, getWards } = useAddress()
  const {
    data: brands,
    getMore: getMoreBrand,
    filter: filterBrand,
    isLoadingMore: isLoadingMoreBrand,
  } = useBrand({
    key: `${SWR_KEY.brand_list}`,
    params: {
      limit: LIMIT_DRUG_STORES,
    },
  })

  const [currentMapSrc, setCurrentMapSrc] = useState<string>(DEFAULT_SRC_MAP)

  const [filterParams, setFilterParams] = useState<GetListStoreReq>()

  const {
    data: stores,
    isValidating,
    filter,
    hasMore,
    fetchMore,
  } = useAgency({
    key: SWR_KEY.store_list,
    params: {
      limit: DEFAULT_LIMIT,
    },
    data_key: 'store',
  })

  const handleSelectState = (state: OptionType<number>) => {
    if (state === null) {
      setFilterParams({
        ...filterParams,
        province_id: undefined,
        district_id: undefined,
      })
    } else {
      setFilterParams({
        ...filterParams,
        province_id: state.value,
        district_id: undefined,
      })
    }

    getDistricts(state?.value)

    if (getValues('district')) {
      resetField('district')
    }
  }

  const handleSelectDistrict = (district: OptionType<number>) => {
    if (district === null) {
      setFilterParams({
        ...filterParams,
        district_id: undefined,
      })
    } else {
      setFilterParams({
        ...filterParams,
        district_id: district?.value,
      })
    }

    getWards(district?.value)
  }

  const hanldeSelectBrand = (brand: OptionType<number>) => {
    if (brand === null) {
      setFilterParams({
        ...filterParams,
        brand_id: undefined,
      })
    } else {
      setFilterParams({
        ...filterParams,
        brand_id: brand.value,
      })
    }
  }

  useEffect(() => {
    if (isArrayHasValue(stores)) {
      if (stores?.[0]?.google_map_iframe_id?.source) {
        setCurrentMapSrc(stores?.[0]?.google_map_iframe_id?.source || '')
      }
    }
  }, [stores])

  useEffect(() => {
    filter({
      params: {
        ...filterParams,
      },
    })
  }, [filterParams])

  const hanldeStoreClick = (store: UserAccount) => {
    if (store && store?.google_map_iframe_id?.source) {
      setCurrentMapSrc(store?.google_map_iframe_id?.source || '')
    } else {
      toast.error('Tọa độ không phù hợp')
    }
  }

  const customSelectStyle = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '20px',
    }),
  }

  return (
    <div
      className={classNames(
        'bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 shadow-lg mb-32',
        className
      )}
    >
      <div className="relative p-12 rounded-xl h-[300px] md:h-[600px] w-full">
        <iframe
          src={currentMapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>

      <div className="p-24">
        <div className="flex items-center flex-wrap gap-12 mb-12">
          <SearchField
            placeholder="Tìm theo tên cửa hàng"
            inputClassName="px-12"
            searchIconClassName="pr-12"
            className="flex-1 min-w-[200px] border border-gray-300 rounded-full py-8"
            onChangeWithDebounceValue={(val) => {
              filter({
                params: {
                  store_name: val,
                },
              })
            }}
          />

          <div className="flex-1 min-w-[200px]">
            <SelectField
              control={control}
              onChange={(val: any) => hanldeSelectBrand(val)}
              placeholder="Chọn thương hiệu"
              isLoading={isLoadingMoreBrand}
              onMenuScrollToBottom={getMoreBrand}
              name="brand"
              isClearable
              onBlur={() => {
                filterBrand({
                  brand_name: '',
                })
              }}
              styles={customSelectStyle}
              onSearchEmpty={(val) => {
                filterBrand({
                  brand_name: val,
                })
              }}
              options={brands?.map((item) => ({
                label: item.brand_name,
                value: item.brand_id,
              }))}
            />
          </div>
        </div>

        <div className="mb-12 hidden md:flex items-center justify-center">
          <div className="block min-w-[132px] w-[10%] h-[1px] border border-t border-gray-300"></div>
          <p className="title-lg text-center capitalize mx-12">Hoặc</p>
          <div className="block min-w-[132px] w-[10%] h-[1px] border border-t border-gray-300"></div>
        </div>

        <div className="flex items-center flex-wrap gap-12 mb-12">
          <div className="flex-1 min-w-[200px]">
            <SelectField
              value={getValues('state') || null}
              control={control}
              onChange={(val: any) => handleSelectState(val)}
              placeholder="Tỉnh/thành phố"
              name="state"
              isClearable
              styles={customSelectStyle}
              options={states?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <SelectField
              value={getValues('district') || null}
              control={control}
              onChange={(val: any) => {
                handleSelectDistrict(val)
              }}
              placeholder="Quận/huyện"
              name="district"
              isClearable
              styles={customSelectStyle}
              options={districts?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
        </div>

        <div className="h-[420px] overflow-auto">
          {isValidating ? (
            <div className="flex-center">
              <Spinner />
            </div>
          ) : isArrayHasValue(stores) ? (
            <div className="max-h-[400px] overflow-auto" id="storesScrollabelTarget">
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
                    className="mb-12 last:mb-0 cursor-pointer border hover:border-primary hover:shadow-md hover:shadow-primary-10 duration-300 ease-in-out"
                  />
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <NotFound notify="Không tìm thấy cửa hàng" />
          )}
        </div>
      </div>
    </div>
  )
}
