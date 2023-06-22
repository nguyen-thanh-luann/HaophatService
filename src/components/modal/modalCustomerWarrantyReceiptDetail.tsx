import React, { useRef } from 'react'
import { Modal } from './modal'
import { TimesIcon } from '@/assets'
import { useClickOutside } from '@/hooks'
import { WarrantyReceiptDetail } from '../warranty'

interface ModalCustomerWarrantyReceiptDetailProps {
  warranty_receipt_customer_id: number | undefined
  isOpen?: boolean
  onClose?: Function
  onApprove?: Function
  onDelete?: Function
  className?: string
}

export const ModalCustomerWarrantyReceiptDetail = ({
  warranty_receipt_customer_id,
  isOpen = false,
  onClose,
  onApprove,
  onDelete,
}: ModalCustomerWarrantyReceiptDetailProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    onClose?.()
  }

  useClickOutside([ref], () => {
    handleCloseModal()
  })

  if (!warranty_receipt_customer_id) return null
  
  return (
    <div>
      <Modal
        visible={isOpen}
        animationType={'fade'}
        headerClassName="hidden"
        modalClassName="relative w-[90%] md:w-[60%] mx-auto rounded-md bg-white h-[70vh]"
      >
        <div ref={ref}>
          <button
            onClick={() => {
              handleCloseModal()
            }}
            className="absolute right-8 top-8 p-8 z-50 bg-white rounded-full"
          >
            <TimesIcon className="text-gray-400 text-xl hover:text-gray duration-150 ease-in-out" />
          </button>

          <div className='p-12'>
            {onApprove || onDelete ? (
              <WarrantyReceiptDetail
                warranty_receipt_id={warranty_receipt_customer_id}
                onApprove={() => {
                  onApprove?.(warranty_receipt_customer_id)
                }}
                onDelete={() => {
                  onDelete?.(warranty_receipt_customer_id)
                }}
              />
            ) : (
              <WarrantyReceiptDetail warranty_receipt_id={warranty_receipt_customer_id} />
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
