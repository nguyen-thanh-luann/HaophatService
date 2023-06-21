import { createCustomerWarrantyShema } from '@/schema'
import { UserAccount } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import { InputField } from '../inputs'

export type CustomerFormProps = {
  customer_phone: string
  customer_name: string
}

interface ICustomerForm {
  onSubmit: (props: any) => void
  className?: string
  type: 'create' | 'update'
  updateCustomer?: UserAccount
}

export const CustomerForm = ({
  onSubmit,
  className: style,
  type,
  updateCustomer,
}: ICustomerForm) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(createCustomerWarrantyShema),
    mode: 'all',
  })

  return (
    <div className={style ? style : ''}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-20">
          <InputField
            label={`Tên khách hàng`}
            control={control}
            name="customer_name"
            required={true}
            type="text"
            defaultValue={updateCustomer ? updateCustomer?.partner_name : undefined}
            placeholder="Nhập tên khách hàng"
          />
        </div>

        <div className="mb-20">
          <InputField
            label={`Số điện thoại`}
            control={control}
            name="customer_phone"
            required={true}
            type="text"
            defaultValue={updateCustomer ? updateCustomer?.phone : undefined}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="flex justify-center">
          <Button
            title={`${type === 'create' ? `Thêm khách hàng` : `Cập nhật`}`}
            type="submit"
            disabled={!isValid}
            className={`w-full bg-primary p-8 ${
              !isValid ? 'cursor-not-allowed opacity-50 hover:opacity-50' : ''
            }`}
            textClassName="text-white"
          />
        </div>
      </form>
    </div>
  )
}
