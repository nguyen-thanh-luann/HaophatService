import { PhotoIcon, TimesIcon, companyIconSm } from '@/assets'
import { API_URL } from '@/constants'
import { useAsync, useModal, useWarrantyAttachment } from '@/hooks'
import { createWarrantyForCustomer } from '@/schema'
import { warrantyAPI } from '@/services'
import { CreateWarrantyAttachmentReq, WarrantyAttachment } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import { Image } from '../image'
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
  const [attachment, setAttachment] = useState<WarrantyAttachment>()

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

  const { getBase64Images } = useWarrantyAttachment({ limit: 1 })

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
      asyncHandler<CreateWarrantyAttachmentReq>({
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex flex-col justify-center items-center mb-12">
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
              {attachment ? (
                <div className={`relative mt-8`}>
                  <Image
                    src={
                      attachment?.attachment_url
                        ? `${API_URL}${attachment.attachment_url}`
                        : companyIconSm
                    }
                    alt="warranty receipt"
                    className="w-[100px]"
                    imageClassName="w-[100px] h-[100px] object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="">
                  <PhotoIcon className="w-90 h-90 text-gray" />
                  <p className="mt-8 text-center text-base">Tải ảnh lên</p>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          title={`Gửi yêu cầu`}
          type="submit"
          disabled={!isValid || !attachment}
          className={`w-full p-8 bg-primary ${
            !isValid || !attachment ? 'cursor-not-allowed opacity-50 hover:opacity-50' : ''
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
