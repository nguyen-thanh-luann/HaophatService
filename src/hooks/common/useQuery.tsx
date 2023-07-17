import useSWR from 'swr'
import _ from 'lodash'
import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { QueryList, QueryListFunction, UseQueryRes } from '@/types'
import { PublicConfiguration } from 'swr/_internal'
import { DEFAULT_LIMIT } from '@/constants'

// KDL khi khởi tạo custom hook này: sẽ có 2 types cần truyền vào: T là KDL của data, V là KDL của params
interface Props<T, V> {
  key: string
  initialData?: T[] | []
  fetcher: (params?: V & QueryList) => Promise<AxiosResponse<T[]>>
  initialParams?: V & QueryList
  data_key?: string // nếu không truyền thì sẽ truy xuất đến key để lấy data
  config?: Partial<PublicConfiguration<any, any, (args_0: string) => any>>
}

export const useQuery = <T, V>({
  key,
  initialData,
  fetcher,
  data_key,
  config,
  initialParams,
}: Props<T, V>): UseQueryRes<T, V> => {
  const limit = initialParams?.limit || DEFAULT_LIMIT

  const { data, isValidating, mutate, error } = useSWR<any>(
    key,
    fetcher
      ? () =>
          fetcher(initialParams)
            .then((res) => {
              const data = getDataResponse<T>(res)

              setHasMore(data.length >= limit)
              return data
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...config,
      fallbackData: initialData,
    }
  )

  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [params, setParams] = useState<(V & QueryList) | undefined>(initialParams)

  const getDataResponse = <T,>(res: any): T[] => {
    if (data_key) {
      return res?.result?.data?.[data_key || key] || res?.data?.[data_key || key]
    }

    if (res?.result) {
      return res.result || []
    }

    if (res?.data) {
      return res?.data || []
    }

    return res?.result?.data || []
  }

  const filter = async (_: QueryListFunction<T, V>) => {
    const { params: _params, onError, onSuccess } = _

    try {
      setLoading(true)
      const newParams = { ...params, ..._params, limit, offset: 0 }

      const res = await fetcher(newParams)
      const data = getDataResponse<T>(res)

      setParams(newParams)
      setLoading(false)
      setOffset(0)
      setHasMore(data.length >= limit)

      mutate(data, false)
      onSuccess?.(data)
    } catch (error) {
      setLoading(false)
      onError?.()
      console.log(error)
    }
  }

  const fetchMore = async (_: QueryListFunction<T, V>) => {
    if (data?.length < limit || !hasMore || isValidating || isLoading) return

    const { params: _params, onError, onSuccess } = _

    try {
      setFetchingMore(true)
      const newOffset = offset + limit
      const newParams = { ...params, ..._params, limit, offset: newOffset }

      const res = await fetcher(newParams)
      const list = getDataResponse<T>(res)

      setFetchingMore(false)
      setParams(newParams)
      setOffset(offset + limit)
      setHasMore((list?.length || 0) >= limit)

      mutate([...(data || []), ...list], false)
      onSuccess?.(list)
    } catch (error) {
      setFetchingMore(false)
      onError?.()
    }
  }
  

  return {
    data,
    isValidating: isValidating || isLoading,
    isFirstLoading: data === undefined && error === undefined,
    isFetchingMore,
    hasMore: hasMore && (data?.length || 0) >= limit,
    fetchMore,
    filter,
    offset,
    error,
    mutate,
    params,
  }
}
