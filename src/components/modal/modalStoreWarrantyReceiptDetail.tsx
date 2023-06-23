import { TimesIcon } from '@/assets'
import { SWR_KEY } from '@/constants'
import { isObjectHasValue } from '@/helper'
import { useModal, useStoreWarrantyDetail } from '@/hooks'
import { useRouter } from 'next/router'
import { StoreWarrantyReceiptItemDetail, WarrantyReceiptDetailLoading } from '../warranty'
import { Modal } from './modal'
import { ModalConfirm } from './modalConfirm'

interface ModalStoreWarrantyReceiptDetailProps {
  warranty_receipt_id: number
  isOpen?: boolean
  onClose?: Function
  externalMutate?: Function
  externalDataMutate?: any
}

export const ModalStoreWarrantyReceiptDetail = ({
  warranty_receipt_id,
  isOpen = false,
  onClose,
  externalMutate,
  externalDataMutate,
}: ModalStoreWarrantyReceiptDetailProps) => {
  const router = useRouter()

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

  const { data, isValidating, confirmWarrantyReceiptDraft, deleteWarrantyReceiptDraft } =
    useStoreWarrantyDetail({
      key: `${SWR_KEY.store_warranty_receipt_detail}_${warranty_receipt_id}`,
      params: {
        warranty_receipt_id,
      },
    })

  const handleUpdateWarrantyReceiptDraft = () => {
    router.push(`/account/store-create-warranty?id=${data?.warranty_receipt_id}`)
  }

  const hanldeDeleteWarrantyReceipt = () => {
    deleteWarrantyReceiptDraft(warranty_receipt_id, () => {
      externalMutate?.(
        [...(externalDataMutate || [])].filter(
          (item) => item.warranty_receipt_id !== warranty_receipt_id
        ),
        false
      )
      closeConfirmDeleteWarrantyDraft()
      onClose?.()
    })
  }

  const hanldeConfirmWarrantyReceipt = () => {
    confirmWarrantyReceiptDraft(warranty_receipt_id, () => {
      externalMutate?.(
        [...(externalDataMutate || [])].filter(
          (item) => item.warranty_receipt_id !== warranty_receipt_id
        ),
        false
      )
      closeConfirmWarrantyDraft()
      onClose?.()
    })
  }

  return (
    <div>
      <Modal
        visible={isOpen}
        animationType={'fade'}
        headerClassName="hidden"
        modalClassName="relative w-[90%] md:w-[60%] mx-auto rounded-md bg-white h-[70vh]"
      >
        {isValidating ? (
          <div className="p-12">
            <WarrantyReceiptDetailLoading />
          </div>
        ) : (
          <div>
            {isObjectHasValue(data) ? (
              <div>
                <div className="flex items-center justify-between p-12 static top-0">
                  <p className="text-md font-bold">{`Thông tin phiếu bảo hành`}</p>
                  <button
                    onClick={() => {
                      onClose?.()
                    }}
                  >
                    <TimesIcon className="text-gray-400 text-xl hover:text-gray duration-150 ease-in-out" />
                  </button>
                </div>

                <div>
                  <StoreWarrantyReceiptItemDetail
                    warranty={data}
                    isLoading={isValidating}
                    onDelete={() => {
                      showConfirmDeleteWarrantyDraft()
                    }}
                    onConfirm={() => {
                      showConfirmWarrantyDraft()
                    }}
                    onUpdate={() => {
                      handleUpdateWarrantyReceiptDraft()
                    }}
                  />
                </div>

                <ModalConfirm
                  visible={isConfirmWarrantyDraft}
                  title="Xác nhận phiếu bảo hành"
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
                  onDeny={closeConfirmDeleteWarrantyDraft}
                />
              </div>
            ) : null}
          </div>
        )}
      </Modal>
    </div>
  )
}
