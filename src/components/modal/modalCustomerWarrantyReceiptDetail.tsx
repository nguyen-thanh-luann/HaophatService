import { TimesIcon } from '@/assets'
import { useRef } from 'react'
import { WarrantyReceiptDetail } from '../warranty'
import { Modal } from './modal'
import { SWR_KEY } from '@/constants'
import { useCustomerWarranty, useModal } from '@/hooks'
import { useRouter } from 'next/router'
import { ModalConfirm } from './modalConfirm'

interface ModalCustomerWarrantyReceiptDetailProps {
  warranty_receipt_customer_id: number | undefined
  isOpen?: boolean
  onClose?: Function
  onApprove?: Function
  className?: string
}

export const ModalCustomerWarrantyReceiptDetail = ({
  warranty_receipt_customer_id,
  isOpen = false,
  onClose,
  onApprove,
}: ModalCustomerWarrantyReceiptDetailProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { confirmCreateWarrantyReceipt, deleteWarrantyReceiptDraft } = useCustomerWarranty({
    key: `${SWR_KEY.customer_warranty_receipt_list}`,
    data_key: 'warranty_receipt_customer',
  })

  const {
    visible: isConfirmWarrantyDraft,
    openModal: showConfirmWarrantyDraft,
    closeModal: closeConfirmWarrantyDraft,
  } = useModal()

  const {
    visible: isConfirmDeleteWarrantyDraft,
    openModal: showConfirmDeleteWarrantyDraft,
    closeModal: closeConfirmDeleteWarrantyDraft,
  } = useModal()

  const hanldeUpdate = () => {
    router.push({
      pathname: `/account/customer-create-warranty`,
      query: {
        id: warranty_receipt_customer_id,
      },
    })
  }

  const hanldeDeleteWarrantyReceipt = () => {
    deleteWarrantyReceiptDraft(warranty_receipt_customer_id, () => {
      closeConfirmDeleteWarrantyDraft()
      onClose?.()
    })
  }

  const hanldeConfirmWarrantyReceipt = () => {
    confirmCreateWarrantyReceipt(warranty_receipt_customer_id, () => {
      closeConfirmWarrantyDraft()
      onClose?.()
    })
  }

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
              onClose?.()
            }}
            className="absolute right-8 top-8 p-8 z-50 bg-white rounded-full"
          >
            <TimesIcon className="text-gray-400 text-xl hover:text-gray duration-150 ease-in-out" />
          </button>

          <div className="p-12">
            <WarrantyReceiptDetail
              warranty_receipt_id={warranty_receipt_customer_id}
              onApprove={() => {
                onApprove?.(warranty_receipt_customer_id)
              }}
              onDelete={() => {
                showConfirmDeleteWarrantyDraft()
              }}
              onConfirm={() => {
                showConfirmWarrantyDraft()
              }}
              onUpdate={() => {
                hanldeUpdate()
              }}
            />
          </div>
        </div>
      </Modal>

      <ModalConfirm
        visible={isConfirmWarrantyDraft}
        title="Xác nhận thông tin phiếu bảo hành?"
        onConfirm={() => {
          hanldeConfirmWarrantyReceipt()
        }}
        onDeny={closeConfirmWarrantyDraft}
      />

      <ModalConfirm
        visible={isConfirmDeleteWarrantyDraft}
        title="Xóa phiếu bảo hành?"
        onConfirm={() => {
          hanldeDeleteWarrantyReceipt()
        }}
        onDeny={() => {
          closeConfirmDeleteWarrantyDraft()
        }}
      />
    </div>
  )
}
