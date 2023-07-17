import { useAddress, useAgency } from '@/hooks'
import { OptionType, UserAccount } from '@/types'
import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SearchField } from '../form'
import { SelectField } from '../inputs'

import { DEFAULT_LIMIT, GOOGLE_API_KEY, SWR_KEY } from '@/constants'
import { isArrayHasValue } from '@/helper'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { toast } from 'react-hot-toast'
import { NotFound } from '../notFound'
import { Spinner } from '../spinner'
import { StoreItem } from '../store'

import InfiniteScroll from 'react-infinite-scroll-component'

interface StoresListProps {
  className?: string
}

interface PositionType {
  lat: number
  lng: number
}

export const StoresList = ({ className }: StoresListProps) => {
  const mapRef = useRef<any>(null)

  const { control, getValues, resetField } = useForm({
    mode: 'all',
  })

  const { districts, getDistricts, states, getWards } = useAddress()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY as string,
  })

  const DEFAULT_POSITION = {
    lng: 106.666804,
    lat: 10.806001,
  }

  const [currentPosition, setCurrentPosition] = useState<PositionType>(DEFAULT_POSITION)

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

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
    if (!state) return

    filter({
      params: {
        province_id: state?.value,
        district_id: undefined,
      },
    })

    getDistricts(state.value)

    if (getValues('district')) {
      resetField('district')
    }
  }

  const handleSelectDistrict = (district: OptionType<number>) => {
    if (!district) return

    filter({
      params: {
        province_id: getValues('state')?.value,
        district_id: district?.value,
      },
    })

    getWards(district.value)
  }

  useEffect(() => {
    if (isArrayHasValue(stores)) {
      if (Number(stores[0]?.latitude) <= 0 || Number(stores[0]?.longitude) <= 0) {
        setCurrentPosition(DEFAULT_POSITION)
      } else {
        setCurrentPosition({
          lat: Number(stores?.[0]?.latitude),
          lng: Number(stores?.[0]?.longitude),
        })
      }
    }
  }, [stores])

  const hanldeStoreClick = (store: UserAccount) => {
    if (Number(store?.latitude) <= 0 || Number(store?.longitude) <= 0) {
      toast.error('Không tìm thấy tọa độ phù hợp')
      return
    }

    const newPosition = {
      lat: Number(store?.latitude),
      lng: Number(store?.longitude),
    }

    setCurrentPosition(newPosition)

    mapRef?.current?.panTo(newPosition)
  }

  return (
    <div
      className={classNames(
        'bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 shadow-lg mb-32',
        className
      )}
    >
      <div className="relative p-12 rounded-xl h-[300px] md:h-[600px] w-full">
        {isLoaded && (
          <GoogleMap
            ref={mapRef}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={currentPosition}
            zoom={10}
            onLoad={onLoad}
          >
            <MarkerF position={currentPosition} visible />
          </GoogleMap>
        )}
      </div>

      <div className="p-24">
        <div className="flex items-center">
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
