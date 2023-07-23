import {
  District,
  GetDistrictParams,
  GetProvinceParams,
  GetWardParams,
  HTTPResponseV2,
  Province,
  Ward,
} from '@/types'
import axiosClient from '.'

const addressAPI = {
  listProvince: (params: GetProvinceParams): Promise<HTTPResponseV2<Province[]>> => {
    return axiosClient.get('/glasses_address_controller/list_province', { params })
  },

  listDistrict: (params: GetDistrictParams): Promise<HTTPResponseV2<District[]>> => {
    return axiosClient.get('/glasses_address_controller/list_district', { params })
  },

  listWard: (params: GetWardParams): Promise<HTTPResponseV2<Ward[]>> => {
    return axiosClient.get('/glasses_address_controller/list_ward', { params })
  },
}

export { addressAPI }
