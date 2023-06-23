import { Button, InputField } from '@/components'
import { checkWarrantySchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'

interface ICheckWarrantyformProps {
  onSubmit?: ({}) => void
  className?: string
}
export const CheckWarrantyform = ({ onSubmit, className }: ICheckWarrantyformProps) => {
  const {
    control,
    handleSubmit,

  } = useForm({
    resolver: yupResolver(checkWarrantySchema),
    mode: 'all',
  })

  const handleCheckWarranty = (data: any) => {
    onSubmit?.({ lot_name: data?.serialNumber, customer_phone: data.phoneNumber })
  }

  return (
    <div className={classNames('', className)}>
      <form onSubmit={handleSubmit(handleCheckWarranty)}>
        <div className="mb-18">
          <InputField
            label={`Số điện thoại`}
            control={control}
            name="phoneNumber"
            type="text"
            placeholder={`Nhập số điện thoại`}
            required={true}
          />
        </div>

        <div className="mb-18">
          <InputField
            label={`Số seri`}
            control={control}
            name="serialNumber"
            type="text"
            placeholder={`Nhập số seri`}
          />
        </div>

        <div className="w-[80%] m-auto">
          <Button
            title="Kiểm tra"
            className="w-full p-8 rounded-full bg-primary"
            textClassName="text-md text-white"
          />
        </div>
      </form>
    </div>
  )
}
