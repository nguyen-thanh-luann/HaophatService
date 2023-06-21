import React from 'react'
import { Button } from '../button'
import { Spinner } from '../spinner'
import { WarrantyStateLabel } from './warrantyStateLabel'
import { useCustomerWarrantyDetail, useGuest, useUser } from '@/hooks'
import { WarrantyReceiptDetailLine } from './warrantyReceiptDetailLine'
import { CheckIcon, PenIconSolid, TrashIconOutline } from '@/assets'
import { CustomImage } from '../customImage'
import { CustomerWarrantyState } from '@/constants'
import { durationToName } from '@/helper'

interface IWarrantyReceiptDetail {
  warranty_receipt_id: number
  onDelete?: Function
  onConfirm?: Function
  onUpdate?: Function
  onApprove?: Function
}

export const WarrantyReceiptDetail = ({
  warranty_receipt_id,
  onConfirm,
  onDelete,
  onUpdate,
  onApprove,
}: IWarrantyReceiptDetail) => {
  const { userInfo } = useUser({})
  const { guestInfo } = useGuest()
  const deviceCode = guestInfo?.device_code

  const { data, isValidating } = useCustomerWarrantyDetail({
    key: `get_warranty_product_info_${warranty_receipt_id}`,
    params: {
      warranty_receipt_customer_id: warranty_receipt_id,
    },
  })

  return (
    <div>
      {isValidating ? (
        <Spinner />
      ) : (
        <div className="p-12">
          <div className="mb-12">
            <div className="flex justify-end">
              <WarrantyStateLabel
                state={
                  CustomerWarrantyState.filter((warranty) => warranty.state === data?.state)?.[0]
                }
              />
            </div>

            <div>
              <p className="text-md mb-12 font-bold">{`Thông tin sản phẩm`}</p>

              <div className="relative flex flex-col lg:flex-row gap-12">
                <CustomImage
                  src={data?.product_id?.representation_image?.image_url}
                  className="rounded-full w-[100px] h-[100px] object-cover mx-auto lg:mx-0"
                  imageClassName="w-[100px] h-[100px] object-cover"
                />
                <div>
                  <p className="title-sm lg:title-md mb-12 line-clamp-2">
                    {data?.product_id?.product_name}
                  </p>

                  <WarrantyReceiptDetailLine
                    leftContent={`Mã sản phẩm:`}
                    rightContent={data?.product_id?.product_code}
                  />

                  <WarrantyReceiptDetailLine
                    leftContent={`Số lô:`}
                    rightContent={data?.lot_id?.lot_name}
                  />

                  <WarrantyReceiptDetailLine
                    leftContent="Thời gian bảo hành:"
                    rightContent={`${data?.warranty_duration_id?.factor || 0} ${durationToName(
                      data?.warranty_duration_id?.time_unit?.value
                    )}`}
                  />
                  <WarrantyReceiptDetailLine
                    leftContent="Ngày bắt đầu bảo hành:"
                    rightContent={`${data?.warranty_starting || ''}`}
                  />
                  <WarrantyReceiptDetailLine
                    leftContent="Ngày kết thúc bảo hành:"
                    rightContent={`${data?.warranty_ending || ''}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin hóa đơn`}</p>

            <WarrantyReceiptDetailLine
              leftContent={`Mã hóa đơn:`}
              rightContent={data?.invoice_ref}
            />

            <CustomImage
              src={data?.invoice_image_url?.image_url}
              className="object-cover w-[300px] h-[250px] rounded-sm"
              imageClassName="object-cover w-[300px] h-[250px] rounded-sm"
            />
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin khách hàng`}</p>

            <div className="flex flex-col lg:flex-row gap-12">
              <div>
                <CustomImage
                  src={userInfo?.account?.avatar_url?.url || ''}
                  className="rounded-full object-cover w-[100px] h-[100px] mx-auto lg:mx-0"
                />
              </div>
              <div>
                <WarrantyReceiptDetailLine
                  leftContent={`Tên khách hàng:`}
                  rightContent={data?.customer_id?.partner_name}
                />
                <WarrantyReceiptDetailLine
                  leftContent={`Số điện thoại:`}
                  rightContent={data?.customer_id?.phone}
                />
              </div>
            </div>
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin cửa hàng`}</p>

            <div className="flex flex-col lg:flex-row gap-12">
              <div>
                <CustomImage
                  src={data?.store_id?.avatar_url?.image_url || ''}
                  className="rounded-full object-cover w-[100px] h-[100px] mx-auto lg:mx-0"
                />
              </div>

              <div>
                <WarrantyReceiptDetailLine
                  leftContent={`Tên cửa hàng:`}
                  rightContent={data?.store_id?.partner_name}
                />

                <WarrantyReceiptDetailLine
                  leftContent={`Số điện thoại:`}
                  rightContent={data?.store_id?.phone}
                />

                <WarrantyReceiptDetailLine
                  leftContent={`Địa chỉ:`}
                  rightContent={`${data?.ward_id?.ward_name ? `${data?.ward_id?.ward_name}, ` : ''} 

									${data?.district_id?.district_name ? `${data.district_id.district_name}, ` : ``}
									
									${data?.province_id?.province_name ? `${data.province_id.province_name}` : ``}
									`}
                />
              </div>
            </div>
          </div>

          {!deviceCode ? (
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {data?.state === 'draft' && onUpdate ? (
                <Button
                  title="Cập nhật thông tin"
                  className={`w-full default-button !bg-warning`}
                  icon={<PenIconSolid />}
                  onClick={() => {
                    onUpdate?.()
                  }}
                />
              ) : null}

              {data?.state === 'draft' && onConfirm ? (
                <Button
                  title="Xác nhận thông tin"
                  className={`w-full default-button-second`}
                  icon={<CheckIcon />}
                  onClick={() => {
                    onConfirm?.()
                  }}
                />
              ) : null}

              {data?.state === 'waiting' &&
              userInfo?.account?.warranty_account_type === 'store_account' &&
              onApprove ? (
                <Button
                  title="Duyệt phiếu bảo hành"
                  className={`w-full default-button`}
                  icon={<CheckIcon />}
                  onClick={() => {
                    onApprove?.()
                  }}
                />
              ) : null}

              {data?.state === 'draft' && onDelete ? (
                <Button
                  title="Xóa đơn nháp"
                  className={`py-4 px-8 rounded-md !bg-white !text-error border-1`}
                  icon={<TrashIconOutline />}
                  onClick={() => {
                    onDelete?.()
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
