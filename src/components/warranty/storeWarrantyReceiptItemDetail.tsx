import { CheckIcon, PenIconSolid, TrashIconSolid } from '@/assets'
import { isArrayHasValue } from '@/helper'
import { StoreWarrantyReceiptDetail } from '@/types'
import { Button } from '../button'
import { Spinner } from '../spinner'
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
              <p className="text-md font-bold">{warranty?.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <p className="text-md">{`Đơn hàng: ${warranty?.picking_id?.name}`}</p>
                <p className="text-md">{`Mã tham chiếu: ${warranty?.invoice_ref}`}</p>
                <p className="text-md">{`Ngày kích hoạt: ${warranty?.warranty_starting}`}</p>
                <p className="text-md">{`Người tạo: ${warranty?.user_id?.user_name}`}</p>
              </div>
              <div>
                <p className="text-md">{`Cửa hàng: ${warranty?.store_id?.partner_name}`}</p>
                <p className="text-md">{`Địa chỉ: ${warranty?.ward_id?.ward_name || ''} ${
                  warranty?.district_id?.district_name || ''
                } ${warranty?.province_id?.province_name || ''}`}</p>
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
                className="bg-yellow px-12"
                textClassName="text-base text-white"
                icon={<PenIconSolid className="text-base text-white" />}
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
                title="Xác nhận thông tin"
                icon={<CheckIcon className="text-base text-white" />}
                className="bg-green text-white px-12"
                textClassName="text-base text-white"
              />
            ) : null}

            {onDelete && warranty?.state === 'draft' ? (
              <Button
                onClick={() => {
                  onDelete?.()
                }}
                title="Xóa"
                className="px-12 bg-red"
                textClassName="text-base text-white"
                icon={<TrashIconSolid className="text-base text-white" />}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
