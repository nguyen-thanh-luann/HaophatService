import { PhotoIcon, TimesIcon } from '@/assets'
import { LIMIT_ATTACHMENT } from '@/constants'
import { useAsync, useModal, useWarrantyAttachment } from '@/hooks'
import { createWarrantyForCustomer } from '@/schema'
import { warrantyAPI } from '@/services'
import { CreateWarrantyAttachmentReq, WarrantyAttachment } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../button'
import { CustomImage } from '../customImage'
import { InputDate, InputField } from '../inputs'
import { Modal } from '../modal'
import { SelectCustomer, SelectLot, SelectProductWarranty } from '../warranty'

export type CreateWarrantyForCustomerFormProps = {
  customer: Object
  warranty_product: Object
  serial: Object
  date: string
  invoice_ref: string
  warranty_attachment: Object
}

interface ICreateWarrantyForCustomerForm {
  onSubmit: (props: any) => void
}

export const CreateWarrantyForCustomerForm = ({ onSubmit }: ICreateWarrantyForCustomerForm) => {
  const { asyncHandler } = useAsync()
  const [attachmentUrls, setAttachmentUrls] = useState<WarrantyAttachment[]>()

  const {
    visible: isSelectCustomer,
    openModal: showSelectCustomer,
    closeModal: closeSelectCustomer,
  } = useModal()

  const {
    visible: isSelectProductWarranty,
    openModal: showSelectProductWarranty,
    closeModal: closeSelectProductWarranty,
  } = useModal()

  const { visible: isSelectLot, openModal: showSelectLot, closeModal: closeSelectLot } = useModal()

  const { getBase64Images } = useWarrantyAttachment({
    limit: LIMIT_ATTACHMENT,
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(createWarrantyForCustomer),
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

  const handleSelectCustomer = (val: any) => {
    setValue(
      'customer',
      {
        label: val?.partner_name,
        value: val?.partner_id,
      },
      { shouldValidate: true }
    )
    closeSelectCustomer()
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

  const hanldeDeleteImage = (props: WarrantyAttachment) => {
    if (!props || !attachmentUrls?.length) return

    setAttachmentUrls(attachmentUrls?.filter((att) => att?.attachment_id !== props.attachment_id))
  }

  const hanldeSubmitForm = (data: any) => {
    if (!attachmentUrls || !data) {
      toast.error('Vui lòng cung cấp đầy đủ thông tin!')
    }

    onSubmit?.({
      product_id: data?.warranty_product?.value,
      lot_id: data?.serial?.value,
      customer_id: data?.customer?.value,
      warranty_starting: data?.date,
      invoice_ref: data?.invoice_ref,
      invoice_image_url: attachmentUrls?.map((att) => att?.attachment_id),
    })
  }

  return (
    <form onSubmit={handleSubmit(hanldeSubmitForm)}>
      <div>
        {/* customer information */}
        <div className="mb-18">
          <p className="text-md font-bold mb-12">{`Thông tin khách hàng`}</p>
          <div className="grid lg:grid-cols-2 gap-16">
            <InputField
              label={`Chọn khách hàng`}
              control={control}
              name="customer"
              placeholder="Chọn khách hàng"
              required={true}
              readOnly
              onClick={() => {
                showSelectCustomer()
              }}
              value={getValues('customer.label')}
            />
          </div>
        </div>

        {/* warranty infomation */}
        <div className="mb-18">
          <p className="text-md font-bold mb-12">{`Thông tin sản phẩm`}</p>
          <div className="grid lg:grid-cols-2 gap-16 mb-12">
            <InputField
              label={`Chọn sản phẩm`}
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
              label={`Số serial`}
              control={control}
              name="serial"
              placeholder="Nhập số serial"
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
              label={`Mã hóa đơn`}
              required={true}
              control={control}
              name="invoice_ref"
              placeholder="Mã hóa đơn"
            />

            <InputDate label={`Ngày bắt đầu`} control={control} name="date" required={true} />
          </div>
        </div>

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
          title={`Gửi yêu cầu`}
          type="submit"
          disabled={!isValid || !attachmentUrls}
          className={`w-full p-8 bg-primary ${
            !isValid || !attachmentUrls ? 'cursor-not-allowed opacity-50 hover:opacity-50' : ''
          }`}
          textClassName="text-white text-md"
        />
      </div>

      {/* modal select data */}
      <Modal
        visible={isSelectCustomer}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
      >
        <div>
          <div className="flex-between p-12">
            <p className="text-md">Chọn khách hàng</p>
            <div className="cursor-pointer" onClick={closeSelectCustomer}>
              <TimesIcon />
            </div>
          </div>

          <div className="p-12">
            <SelectCustomer
              onClick={(val: any) => {
                handleSelectCustomer(val)
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
            <p className="text-md">Số seri</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                closeSelectLot()
              }}
            >
              <TimesIcon />
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
