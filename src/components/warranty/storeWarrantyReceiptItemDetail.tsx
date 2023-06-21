import { isArrayHasValue } from '@/helper'
import { StoreWarrantyReceiptDetail } from '@/types'
import React from 'react'
import { WarrantyReceiptDetailLine } from './warrantyReceiptDetailLine'
import { Button } from '../button'
import { Spinner } from '../spinner'
import { CheckIcon, PenIconSolid, TrashIconSolid } from '@/assets'
import { StoreWarrantyProduct } from './storeWarrantyProduct'

interface IStoreWarrantyReceiptDetail {
  warranty: StoreWarrantyReceiptDetail
  onConfirm?: Function
  onDelete?: Function
  onUpdate?: Function
  isLoading?: boolean
}

export const StoreWarrantyReceiptItemDetail = ({
  warranty,
  onConfirm,
  onDelete,
  onUpdate,
  isLoading,
}: IStoreWarrantyReceiptDetail) => {
  return (
    <div className="bg-white p-16">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <p className="text-22 leading-28 font-semibold mb-12">{warranty?.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <WarrantyReceiptDetailLine
                  leftContent={`Đơn hàng`}
                  rightContent={warranty?.picking_id?.name}
                />
                <WarrantyReceiptDetailLine
                  leftContent={`Mã tham chiếu`}
                  rightContent={warranty?.invoice_ref}
                />
                <WarrantyReceiptDetailLine
                  leftContent={`Ngày bắt đầu`}
                  rightContent={warranty?.warranty_starting}
                />

                <WarrantyReceiptDetailLine
                  leftContent={`Người tạo`}
                  rightContent={warranty?.user_id?.user_name}
                />
              </div>
              <div>
                <WarrantyReceiptDetailLine
                  leftContent={`Cửa hàng`}
                  rightContent={warranty?.store_id?.partner_name}
                />
                {warranty?.ward_id?.ward_name ? (
                  <WarrantyReceiptDetailLine
                    leftContent={`Phường/Xã`}
                    rightContent={warranty?.ward_id?.ward_name}
                  />
                ) : null}
                {warranty?.district_id?.district_name ? (
                  <WarrantyReceiptDetailLine
                    leftContent={`Quận/Huyện`}
                    rightContent={warranty?.district_id?.district_name}
                  />
                ) : null}{' '}
                {warranty?.province_id?.province_name ? (
                  <WarrantyReceiptDetailLine
                    leftContent={`Tỉnh/Thành phố`}
                    rightContent={warranty?.province_id?.province_name}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {isArrayHasValue(warranty?.warranty_receipt_lines) ? (
            <div>
              {warranty?.warranty_receipt_lines?.map((item) => (
                <StoreWarrantyProduct item={item} key={item.warranty_receipt_line_id} />
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-12 justify-center mt-12 flex-wrap">
            {warranty?.state === 'draft' && onUpdate ? (
              <Button
                title="Cập nhật thông tin"
                className="default-button-second"
                icon={<PenIconSolid />}
                onClick={() => {
                  onUpdate?.()
                }}
              />
            ) : null}

            {onConfirm && warranty?.state === 'draft' ? (
              <Button
                onClick={() => {
                  onConfirm?.()
                }}
                title="Xác nhận"
                icon={<CheckIcon />}
                className="default-button"
              />
            ) : null}

            {onDelete && warranty?.state === 'draft' ? (
              <Button
                onClick={() => {
                  onDelete?.()
                }}
                title="Xóa"
                className="py-4 px-8 rounded-md !bg-white !text-error border-1"
                icon={<TrashIconSolid />}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
