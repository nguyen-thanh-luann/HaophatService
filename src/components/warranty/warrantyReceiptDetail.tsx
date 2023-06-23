import { CheckIcon, PenIconSolid, TrashIconOutline } from '@/assets'
import { CustomerWarrantyState } from '@/constants'
import { durationToName } from '@/helper'
import { useCustomerWarrantyDetail, useUser } from '@/hooks'
import { Button } from '../button'
import { CustomImage } from '../customImage'
import { WarrantyReceiptDetailLoading } from './warrantyReceiptDetailLoading'
import { WarrantyStateLabel } from './warrantyStateLabel'

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

  const { data, isValidating } = useCustomerWarrantyDetail({
    key: `get_warranty_product_info_${warranty_receipt_id}`,
    params: {
      warranty_receipt_customer_id: warranty_receipt_id,
    },
  })

  return (
    <div>
      {isValidating ? (
        <WarrantyReceiptDetailLoading />
      ) : (
        <div className="">
          <div className="mb-12">
            <div className="flex mb-12">
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
                  className="min-w-[100px]"
                  imageClassName="rounded-full object-cover w-[100px] h-[100px] mx-auto"
                />
                <div>
                  <p className="text-base font-bold mb-8">{data?.product_id?.product_name}</p>

                  <p className="text-base mb-8">{`Mã sản phẩm: ${data?.product_id?.product_code}`}</p>

                  <p className="text-base mb-8">{`Số lot: ${data?.lot_id?.lot_name}`}</p>

                  <p className="text-base mb-8">{`Thời gian bảo hành:${
                    data?.warranty_duration_id?.factor || 0
                  } ${durationToName(data?.warranty_duration_id?.time_unit?.value)}`}</p>

                  <p className="text-base mb-8">{`Ngày bắt đầu bảo hành: ${
                    data?.warranty_starting || ''
                  }`}</p>

                  <p className="text-base mb-8">{`Ngày kết thúc bảo hành: ${
                    data?.warranty_ending || ''
                  }`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin hóa đơn`}</p>

            <p className="text-base mb-8">{`Mã hóa đơn: ${data?.invoice_ref || ''}`}</p>

            <CustomImage
              src={data?.invoice_image_url?.image_url}
              className="w-[300px]"
              imageClassName="object-cover w-[300px] h-[250px] rounded-md"
            />
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin khách hàng`}</p>

            <div className="flex flex-col lg:flex-row gap-12">
              <div>
                <CustomImage
                  src={userInfo?.account?.avatar_url?.url || ''}
                  className="min-w-[100px]"
                  imageClassName="rounded-full object-cover w-[100px] h-[100px] mx-auto"
                />
              </div>
              <div>
                <p className="text-base mb-8">{`Tên khách hàng: ${data?.customer_id?.partner_name}`}</p>
                <p className="text-base mb-8">{`Số điện thoại: ${data?.customer_id?.phone}`}</p>
              </div>
            </div>
          </div>

          <div className="border-t-1 border-gray-200 py-12">
            <p className="text-md font-bold mb-12">{`Thông tin cửa hàng`}</p>

            <div className="flex flex-col lg:flex-row gap-12">
              <div>
                <CustomImage
                  src={data?.store_id?.avatar_url?.image_url || ''}
                  className="min-w-[100px]"
                  imageClassName="rounded-full object-cover w-[100px] h-[100px] mx-auto"
                />
              </div>

              <div>
                <p className="text-base mb-8">{`Tên cửa hàng: ${data?.store_id?.partner_name}`}</p>

                <p className="text-base mb-8">{`Số điện thoại: ${data?.store_id?.phone}`}</p>

                <p className="text-base mb-8">{`Địa chỉ: ${data?.ward_id?.ward_name} ${data?.district_id?.district_name} ${data?.province_id?.province_name}`}</p>
              </div>
            </div>
          </div>

          {userInfo ? (
            <div className="flex items-center gap-12 justify-center mt-12 flex-wrap">
              {data?.state === 'draft' && onUpdate ? (
                <Button
                  title="Cập nhật thông tin"
                  className={`bg-yellow px-12`}
                  textClassName="text-base text-white"
                  icon={<PenIconSolid className="text-base text-white" />}
                  onClick={() => {
                    onUpdate?.()
                  }}
                />
              ) : null}

              {data?.state === 'draft' && onConfirm ? (
                <Button
                  title="Xác nhận thông tin"
                  className={`bg-green px-12`}
                  textClassName="text-base text-white"
                  icon={<CheckIcon className="text-base text-white" />}
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
                  className={`bg-blue px-12`}
                  textClassName="text-base text-white"
                  icon={<CheckIcon className="text-base text-white" />}
                  onClick={() => {
                    onApprove?.()
                  }}
                />
              ) : null}

              {data?.state === 'draft' && onDelete ? (
                <Button
                  title="Xóa"
                  className={`bg-red px-12`}
                  textClassName="text-base text-white"
                  icon={<TrashIconOutline className="text-base text-white" />}
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
