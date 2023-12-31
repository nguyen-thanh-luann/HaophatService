import { TimesIcon } from '@/assets'
import { changewarrantyDateToInputDatetype } from '@/helper'
import { useModal } from '@/hooks'
import { createWarrantyForStoreChema } from '@/schema'
import { StoreWarrantyReceiptDetail } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import { InputDate, InputField } from '../inputs'
import { Modal } from '../modal'
import { SelectPicking } from '../warranty'

export type StoreCreateWarrantyFormProps = {
  picking_id: string
  invoice_ref: string
  warranty_starting: string
}

interface IStoreCreateWarrantyForm {
  onSubmit: (props: any) => void
  type?: 'create' | 'update'
  warrantyUpdate?: StoreWarrantyReceiptDetail
}

export const StoreCreateWarrantyForm = ({
  onSubmit,
  type = 'create',
  warrantyUpdate,
}: IStoreCreateWarrantyForm) => {
  const {
    visible: isSelectPicking,
    openModal: showSelectPiking,
    closeModal: closeSelectPicking,
  } = useModal()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(createWarrantyForStoreChema),
    mode: 'all',
  })

  useEffect(() => {
    if (warrantyUpdate) {
      setValue(
        'picking_id',
        {
          label: warrantyUpdate?.picking_id?.name,
          value: warrantyUpdate?.picking_id?.picking_id,
        },
        { shouldValidate: true }
      )
    }
  }, [warrantyUpdate])

  const handleSelectPicking = (val: any) => {
    setValue('picking_id', {
      label: val?.name,
      value: val?.picking_id,
    })
    closeSelectPicking()
  }

  return (
    <form className="mx-auto md:w-[70%]" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-12">
        <InputField
          label={`Hóa đơn`}
          control={control}
          name="picking_id"
          placeholder={`Chọn hóa đơn`}
          required={true}
          readOnly
          onClick={() => {
            showSelectPiking()
          }}
          value={getValues('picking_id.label')}
        />
      </div>

      <div className="mb-12">
        <InputField
          label={`Mã tham chiếu`}
          required={true}
          control={control}
          name="invoice_ref"
          placeholder={`Nhập mã tham chiếu`}
          defaultValue={warrantyUpdate?.invoice_ref || undefined}
        />
      </div>

      <div className="mb-12">
        <InputDate
          defaultValue={
            changewarrantyDateToInputDatetype(warrantyUpdate?.warranty_starting || '') || undefined
          }
          label={`Chọn ngày kích hoạt`}
          control={control}
          name="date"
          required={true}
        />
      </div>

      <div className="flex justify-center">
        <Button
          title={type === 'create' ? `Tạo phiếu bảo hành` : `Cập nhật`}
          type="submit"
          disabled={!isValid}
          className={`w-full bg-primary p-8 ${
            !isValid ? '!cursor-not-allowed opacity-50 hover:opacity-50' : ''
          }`}
          textClassName="text-white text-md"
        />
      </div>

      <Modal
        visible={isSelectPicking}
        headerClassName="hidden"
        modalClassName="w-[90%] md:w-[500px] max-w-[90vw] h-fit"
      >
        <div>
          <div className="flex-between p-12">
            <p className="text-md">Chọn hóa đơn</p>
            <div className="cursor-pointer" onClick={closeSelectPicking}>
              <TimesIcon />
            </div>
          </div>

          <div className="p-12">
            <SelectPicking
              onClick={(val: any) => {
                handleSelectPicking(val)
              }}
            />
          </div>
        </div>
      </Modal>
    </form>
  )
}
