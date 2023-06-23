import { TimesIcon } from '@/assets'
import { API_URL } from '@/constants'
import { changewarrantyDateToInputDatetype } from '@/helper'
import { useAsync, useModal, useWarrantyAttachment } from '@/hooks'
import { customerCreateWarrantySchema } from '@/schema'
import { warrantyAPI } from '@/services'
import { CreateAttachmentReq, WarrantyAttachment, WarrantyReceiptDeatil } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import { Image } from '../image'
import { InputDate, InputField } from '../inputs'
import { Modal } from '../modal'
import { SelectAgency, SelectLot, SelectProductWarranty } from '../warranty'

export type CustomerCreateWarrantyFormProps = {
  agency: Object
  warranty_product: Object
  serial: Object
  date: string
  invoice_ref: string
  warranty_attachment: Object
}

interface ICreateWarrantyForCustomerForm {
  // onSubmit: (props: CustomerCreateWarrantyFormProps) => void;
  onSubmit: (props: any) => void

  type?: 'create' | 'update'
  warrantyUpdate?: WarrantyReceiptDeatil
}

export const CustomerCreateWarrantyForm = ({
  onSubmit,
  type = 'create',
  warrantyUpdate,
}: ICreateWarrantyForCustomerForm) => {
  const { asyncHandler } = useAsync()
  const [attachment, setAttachment] = useState<WarrantyAttachment>()

  const {
    visible: isSelectAgency,
    openModal: showSelectAgency,
    closeModal: closeSelectAgency,
  } = useModal()

  const {
    visible: isSelectProductWarranty,
    openModal: showSelectProductWarranty,
    closeModal: closeSelectProductWarranty,
  } = useModal()

  const { visible: isSelectLot, openModal: showSelectLot, closeModal: closeSelectLot } = useModal()

  const { getBase64Images } = useWarrantyAttachment({ limit: 1 })

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(customerCreateWarrantySchema),
    mode: 'all',
  })

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    getBase64Images(e.target.files, async (urls: Array<string>) => {
      asyncHandler<CreateAttachmentReq>({
        fetcher: warrantyAPI.createWarrantyAttachment({
          attachments: urls.map((url) => ({
            file: url.replace(/^data:image\/\w+;base64,/, ''),
            type: 'image',
          })),
        }),
        onSuccess: (res: any) => {
          setAttachment(res?.[0])
          setValue('warranty_attachment', {
            attachment_id: res?.[0]?.attachment_id,
            attachment_url: res?.[0]?.attachment_url,
          })
        },
        config: {
          showSuccessMsg: false,
        },
      })
    })
  }

  const hanldeSelectAgency = (val: any) => {
    setValue('agency', {
      label: val?.label,
      value: val?.value,
    })
    closeSelectAgency()
  }

  const handleSelectProductWarranty = (val: any) => {
    setValue(
      'warranty_product',
      {
        label: val?.product_name,
        value: val?.product_id,
      },
      { shouldValidate: true }
    )

    if (getValues('serial')) {
      setValue('serial', ' ')
      trigger(['serial'])
    }

    closeSelectProductWarranty()
  }

  const hanldeSelectLot = (val: any) => {
    setValue(
      'serial',
      {
        label: val?.lot_name,
        value: val?.lot_id,
      },
      { shouldValidate: true }
    )

    closeSelectLot()
  }

  useEffect(() => {
    if (warrantyUpdate) {
      setValue(
        'agency',
        {
          label: warrantyUpdate?.store_id?.partner_name,
          value: warrantyUpdate?.store_id?.partner_id,
        },
        { shouldValidate: true }
      )

      setValue(
        'warranty_product',
        {
          label: warrantyUpdate?.product_id?.product_name,
          value: warrantyUpdate?.product_id?.product_id,
        },
        { shouldValidate: true }
      )

      setValue(
        'serial',
        {
          label: warrantyUpdate?.lot_id?.lot_name,
          value: warrantyUpdate?.lot_id?.lot_id,
        },
        { shouldValidate: true }
      )

      setValue(
        'warranty_attachment',
        {
          attachment_id: warrantyUpdate?.invoice_image_url?.image_id,
          attachment_url: warrantyUpdate?.invoice_image_url?.image_url,
        },
        { shouldValidate: true }
      )

      setAttachment({
        attachment_id: warrantyUpdate?.invoice_image_url?.image_id,
        attachment_url: warrantyUpdate?.invoice_image_url?.image_url,
      })
    }
  }, [warrantyUpdate])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-12">
        {/* store information */}
        <div className="mb-12">
          <p className="text-md font-bold mb-12">{`Thông tin cửa hàng`}</p>
          <div className="grid lg:grid-cols-2 gap-12">
            <InputField
              label="Đại lý"
              control={control}
              name="agency"
              placeholder="Chọn Đại lý"
              required={true}
              readOnly
              onClick={() => {
                showSelectAgency()
              }}
              value={getValues('agency.label')}
            />
          </div>
        </div>

        {/* warranty infomation */}
        <div className="mb-12">
          <p className="text-md font-bold mb-12">{`Thông tin sản phẩm`}</p>
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <InputField
              label="Chọn sản phẩm"
              control={control}
              name="warranty_product"
              placeholder="Chọn sản phẩm"
              required={true}
              readOnly
              onClick={() => {
                showSelectProductWarranty()
              }}
              value={getValues('warranty_product.label')}
            />

            <InputField
              label="Số lot"
              control={control}
              name="serial"
              placeholder="Là mã seri được ghi trên hóa đơn"
              required={true}
              readOnly
              onClick={() => {
                showSelectLot()
              }}
              value={getValues('serial.label')}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <InputField
              label="Mã hóa đơn"
              required={true}
              control={control}
              name="invoice_ref"
              placeholder="Nhập mã hóa đơn"
              defaultValue={warrantyUpdate?.invoice_ref || undefined}
            />

            <InputDate
              label="Chọn ngày kích hoạt"
              placeholder=''
              control={control}
              name="date"
              required={true}
              defaultValue={
                changewarrantyDateToInputDatetype(warrantyUpdate?.warranty_starting || '') ||
                undefined
              }
            />
          </div>
        </div>

        {/* choose image */}
        <div className="flex flex-col justify-center items-center">
          <div>
            <input
              onChange={(e) => handleUploadImages(e)}
              name="warranty_attachment"
              type="file"
              id="warranty_attachment"
              hidden
            />
            <label
              htmlFor="warranty_attachment"
              className={`flex items-center p-8 gap-8 cursor-pointer rounded-md border
										text-primary border-primary hover:bg-primary-opacity-10 duration-150 ease-linear active:bg-white`}
            >
              Thêm hình ảnh
            </label>
          </div>
          {attachment ? (
            <div className={`relative w-[100px] h-[100px] mt-8`}>
              <Image
                src={attachment?.attachment_url ? `${API_URL}${attachment.attachment_url}` : ''}
                alt="warranty receipt"
                className="w-[100px] h-[100px] object-cover"
                imageClassName="w-[100px] h-[100px] object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          title={type === 'create' ? 'Gửi yêu cầu' : 'Cập nhật thông tin'}
          type="submit"
          disabled={!isValid || !attachment}
          className={`w-full p-8 bg-primary ${
            !isValid || !attachment ? 'cursor-not-allowed opacity-50 hover:opacity-50' : ''
          }`}
          textClassName="text-white"
        />
      </div>

      {/* modal select agency */}
      <Modal
        visible={isSelectAgency}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
      >
        <div>
          <div className="flex-between p-12">
            <p className="text-md">Chọn đại lý</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                closeSelectAgency()
              }}
            >
              <TimesIcon />
            </div>
          </div>

          <div className="max-h-[400px] h-fit overflow-scroll scrollbar-hide p-12">
            <SelectAgency
              onClick={(val: any) => {
                hanldeSelectAgency(val)
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        visible={isSelectProductWarranty}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
      >
        <div>
          <div className="flex-between p-12">
            <p className="text-md">Chọn sản phẩm</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                closeSelectProductWarranty()
              }}
            >
              <TimesIcon />
            </div>
          </div>

          <div className="max-h-[400px] h-fit overflow-scroll scrollbar-hide p-12">
            <SelectProductWarranty
              onClick={(val: any) => {
                handleSelectProductWarranty(val)
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        visible={isSelectLot}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
      >
        <div>
          <div className="flex-between p-12">
            <p className="text-md">Chọn số lot</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                closeSelectLot()
              }}
            >
              <TimesIcon />
            </div>
          </div>

          <div className="max-h-[400px] h-fit overflow-scroll scrollbar-hide p-12">
            <SelectLot
              onClick={(val: any) => {
                hanldeSelectLot(val)
              }}
              product_id={getValues('warranty_product.value')}
            />
          </div>
        </div>
      </Modal>
    </form>
  )
}
