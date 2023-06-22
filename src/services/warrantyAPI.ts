import {
  CreateCustomerWarrantyReq,
  CreateWarrantyAttachmentReq,
  CreateWarrantyReceiptReq,
  GetListStoreReq,
  SearchWarrantyReceiptReq,
  StoreWarrantyReceiptDetail,
  UpdateCustomerWarrantyReq,
  WarrantyParams,
  WarrantyProductDetailReq,
  WarrantyReceiptDeatil,
} from '@/types'
import { AxiosResponse } from 'axios'
import axiosClient from '.'

const warrantyAPI = {
  //lấy danh sách phiếu bảo hành của khách hàng

  getCustomerListWarrantyReceipt: (params: any) => {
    return axiosClient.post('/warranty_receipt_customer_controller/get_list_warranty_receipt', {
      params,
    })
  },

  //lấy danh sách phiếu bảo hành của đại lí
  getStoreListWarrantyReceipt: (params: any) => {
    return axiosClient.post('/warranty_receipt_store_controller/get_list_warranty_receipt', {
      params,
    })
  },

  //danh sách đơn hàng của đại lí

  getStoreListPickingOrder: (params: any) => {
    return axiosClient.post('/warranty_receipt_store_controller/get_list_picking_order', {
      params,
    })
  },

  //Tìm Phiếu Bảo Hành của khách hàng
  searchWarrantyReceipt: (params?: SearchWarrantyReceiptReq) => {
    return axiosClient.post('/warranty_receipt_customer_controller/search_warranty_receipt', {
      params,
    })
  },

  //Xem chi tiết Phiếu Bảo Hành của khách hàng
  getWarrantyProductDetail: (
    params: WarrantyProductDetailReq
  ): Promise<AxiosResponse<{ warranty_receipt_customer: WarrantyReceiptDeatil }>> => {
    return axiosClient.post('/warranty_receipt_customer_controller/get_detail_warranty_receipt', {
      params,
    })
  },

  //Xem chi tiết Phiếu Bảo Hành của đại lí
  getStoreWarrantyReceiptDetail: (
    params: WarrantyParams
  ): Promise<AxiosResponse<{ warranty_receipt: StoreWarrantyReceiptDetail }>> => {
    return axiosClient.post('/warranty_receipt_store_controller/get_detail_warranty_receipt', {
      params,
    })
  },

  //Lấy danh sách sản phẩm - bộ lọc sản phẩm theo tên/mã
  getListWarrantyProduct: (params?: WarrantyParams) => {
    return axiosClient.post('/detail_data_controller/get_list_product', {
      params,
    })
  },

  // Lấy danh sách những lô hàng theo sản phẩm
  getListProductLot: (params?: WarrantyParams) => {
    return axiosClient.post('/detail_data_controller/get_list_product_lot', {
      params,
    })
  },

  getListStore: (params?: GetListStoreReq) => {
    return axiosClient.post('/account_controller/get_store', {
      params,
    })
  },

  //Tạo Phiếu Bảo Hành cho Khách Hàng
  createCustomerWarrantyReceipt: (params?: CreateWarrantyReceiptReq) => {
    return axiosClient.post('/warranty_receipt_customer_controller/create_warranty_receipt', {
      params,
    })
  },

  //Tạo Phiếu Bảo Hành cho đại lý
  createStoreWarrantyReceipt: (params?: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_store_controller/create_warranty_receipt', {
      params,
    })
  },

  //Đại lí xác nhận phiếu bảo hành cho mình
  storeConfirmCreateWarrantyReceipt: (params?: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_store_controller/waiting_confirm_warranty_receipt', {
      params,
    })
  },

  //Khách hàng xác nhận tạo phiếu bảo hành của mình
  customerConfirmCreateWarrantyReceipt: (params?: WarrantyParams) => {
    return axiosClient.post(
      '/warranty_receipt_customer_controller/waiting_confirm_warranty_receipt',
      {
        params,
      }
    )
  },

  //Đại lí xác nhận phiếu bảo hành cho khách hàng
  storeConfirmCustomerWarrantyReceipt: (params?: WarrantyParams) => {
    return axiosClient.post(
      '/warranty_receipt_customer_controller/confirm_warranty_receipt_customer',
      {
        params,
      }
    )
  },

  //Lấy danh sách khách hàng (dành cho đại lý)
  getListCustomer: (params?: WarrantyParams) => {
    return axiosClient.post('/register_account_warranty_controller/get_list_customer', { params })
  },

  //Tìm kiếm tài khoản khách hàng (dành cho đại lí)
  searchCustomer: (params: WarrantyParams) => {
    return axiosClient.post('/register_account_warranty_controller/search_customer', { params })
  },

  //upload hình ảnh hóa đơn
  createWarrantyAttachment: (params: CreateWarrantyAttachmentReq) => {
    return axiosClient.post('/detail_data_controller/create_attachment_data', { params })
  },

  //đại lí tạo mới tài khoản khách hàng bảo hành
  createCustomerWarranty: (params: CreateCustomerWarrantyReq) => {
    return axiosClient.post('/register_account_warranty_controller/create_customer', { params })
  },

  //Lấy thông tin chi tiết của khách hàng
  getCustomerInfoDetail: (params: WarrantyParams) => {
    return axiosClient.post('/register_account_warranty_controller/get_detail_customer', {
      params,
    })
  },

  //Cập nhật lại thông tin tài khoản
  updateCustomerInfo: (params: UpdateCustomerWarrantyReq) => {
    return axiosClient.post('/register_account_warranty_controller/update_customer', {
      params,
    })
  },

  //Đại lí tìm phiếu bảo hành cho mình
  storeSearchWarrantyReceipt: (params: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_store_controller/search_warranty_receipt', {
      params,
    })
  },

  //cập nhật lại phiếu bảo hành khách hàng (ở trạng thái draft)
  updateCustomerWarrantyReceipt: (params: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_customer_controller/update_warranty_receipt', {
      params,
    })
  },

  //cập nhật lại phiếu bảo hành đại lí (ở trạng thái draft)
  updateStoreWarrantyReceipt: (params: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_store_controller/update_warranty_receipt', {
      params,
    })
  },

  //xóa phiếu bảo hành cho khách hàng (ở trạng thái draft)
  deleteCustomerWarrantyReceipt: (params: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_customer_controller/delete_warranty_receipt', {
      params,
    })
  },

  //Đại lí xóa phiếu bảo hành của mình (ở trạng thái draft)
  deteleStoreWarrantyReceipt: (params: WarrantyParams) => {
    return axiosClient.post('/warranty_receipt_store_controller/delete_warranty_receipt', {
      params,
    })
  },
}

export { warrantyAPI }
