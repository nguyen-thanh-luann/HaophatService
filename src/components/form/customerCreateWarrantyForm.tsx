import { PhotoIcon, TimesIcon } from '@/assets'
import { LIMIT_ATTACHMENT } from '@/constants'
import { changewarrantyDateToInputDatetype } from '@/helper'
import { useAsync, useModal, useWarrantyAttachment } from '@/hooks'
import { customerCreateWarrantySchema } from '@/schema'
import { warrantyAPI } from '@/services'
import { CreateWarrantyAttachmentReq, WarrantyAttachment, WarrantyReceiptDeatil } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import { CustomImage } from '../customImage'
import { InputDate, InputField } from '../inputs'
import { Modal } from '../modal'
import { SelectAgency, SelectLot, SelectProductWarranty } from '../warranty'
import { toast } from 'react-hot-toast'

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
  const [attachmentUrls, setAttachmentUrls] = useState<WarrantyAttachment[]>()

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

  const { getBase64Images } = useWarrantyAttachment({ limit: LIMIT_ATTACHMENT })

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
      if (!urls?.[0]) return

      asyncHandler<CreateWarrantyAttachmentReq>({
        fetcher: warrantyAPI.createWarrantyAttachment({
          attachments: [
            {
              file: urls?.[0].replace(/^data:image\/\w+;base64,/, ''),
              type: 'image',
            },
          ],
        }),
        onSuccess: (res: any) => {
          setAttachmentUrls([...(attachmentUrls || []), res?.[0]])
        },
        config: {
          showSuccessMsg: false,
        },
      })
    })
  }

  const hanldeDeleteImage = (props: WarrantyAttachment) => {
    if (!props || !attachmentUrls?.length) return

    setAttachmentUrls(attachmentUrls?.filter((att) => att?.attachment_id !== props.attachment_id))
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

      setValue('invoice_ref', warrantyUpdate?.invoice_ref, { shouldValidate: true })

      setAttachmentUrls(
        warrantyUpdate?.invoice_image_url?.map((image) => ({
          attachment_id: image?.image_id,
          attachment_url: image?.image_url,
        }))
      )
    }
  }, [warrantyUpdate])

  const hanldeSubmitForm = (data: any) => {
    if (!attachmentUrls || !data) {
      toast.error('Vui lòng cung cấp đầy đủ thông tin!')
    }

    onSubmit?.({
      product_id: data?.warranty_product?.value,
      lot_id: data?.serial?.value,
      store_id: data?.agency?.value,
      warranty_starting: data?.date,
      invoice_ref: data?.invoice_ref,
      invoice_image_url: attachmentUrls?.map((att) => att?.attachment_id),
    })
  }

  return (
    <form onSubmit={handleSubmit(hanldeSubmitForm)}>
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
              placeholder=""
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
        <div className="flex flex-col items-center justify-center mb-12">
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
              className={`flex items-center p-8 gap-8 cursor-pointer
										text-primary border-primary duration-150`}
            >
              <div className="">
                <PhotoIcon className="w-80 h-80 text-gray" />
                <p className="mt-8 text-center text-base">Tải ảnh lên</p>
              </div>
            </label>
          </div>

          {attachmentUrls ? (
            <div className="flex items-center gap-12 mt-12">
              {attachmentUrls.map((att, index) => (
                <div key={index} className="relative w-[80px]">
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      hanldeDeleteImage(att)
                    }}
                    className="absolute z-40 top-0 right-0 cursor-pointer bg-white rounded-full p-4"
                  >
                    <TimesIcon className="text-gray text-xs" />
                  </span>

                  <div className="">
                    <CustomImage
                      src={att?.attachment_url}
                      alt="attachment"
                      imageClassName="w-[80px] h-[80px] object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          title={type === 'create' ? 'Gửi yêu cầu' : 'Cập nhật thông tin'}
          type="submit"
          disabled={!isValid || !attachmentUrls}
          className={`w-full p-8 bg-primary ${
            !isValid || !attachmentUrls ? 'cursor-not-allowed opacity-50 hover:opacity-50' : ''
          }`}
          textClassName="text-white"
        />
      </div>

      {/* modal select agency */}
      <Modal
        visible={isSelectAgency}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[600px] max-w-[90vw] h-fit"
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
              <TimesIcon className="text-gray" />
            </div>
          </div>

          <div className="p-12">
            <SelectAgency
              onClick={(val: any) => {
                if (val) {
                  hanldeSelectAgency(val)
                }
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
              <TimesIcon className="text-gray" />
            </div>
          </div>

          <div className="p-12">
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
              <TimesIcon className="text-gray" />
            </div>
          </div>

          <div className="p-12">
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
