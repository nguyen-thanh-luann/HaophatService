import { TimesIcon } from '@/assets'
import { isObjectHasValue } from '@/helper'
import { useStoreWarrantyDetail } from '@/hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Spinner } from '../spinner'
import { StoreWarrantyReceiptItemDetail } from '../warranty'
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
  const [confirmWarrantyDraft, setConfirmWarrantyDraft] = useState<boolean>(false)
  const [confirmDeleteWarrantyDraft, setConfirmDeleteWarrantyDraft] = useState<boolean>(false)

  const { data, isValidating, confirmWarrantyReceiptDraft, deleteWarrantyReceiptDraft } =
    useStoreWarrantyDetail({
      key: `get_store_warranty_receipt_detail_${warranty_receipt_id}`,
      params: {
        warranty_receipt_id,
      },
    })

  const handleConfirmWarrantyReceiptDraft = () => {
    setConfirmWarrantyDraft(true)
  }

  const handleDeleteWarrantyReceiptDraft = () => {
    setConfirmDeleteWarrantyDraft(true)
  }

  const handleUpdateWarrantyReceiptDraft = () => {
    router.push(`/account/warranty/store-create-warranty?id=${data?.warranty_receipt_id}`)
  }

  return (
    <div>
      <Modal
        visible={isOpen}
        modalClassName={`mx-auto mt-[5vh] p-8 rounded-md w-[90vw] lg:w-[60vw] max-h-[90vh] bg-white`}
      >
        {isValidating ? (
          <Spinner />
        ) : (
          <div>
            {isObjectHasValue(data) ? (
              <div>
                <div className="flex items-center justify-between p-12">
                  <p className="title-lg">{`Thông tin phiếu bảo hành`}</p>
                  <button
                    onClick={() => {
                      onClose?.()
                    }}
                  >
                    <TimesIcon className="text-gray-400 text-2xl hover:text-gray duration-150 ease-in-out" />
                  </button>
                </div>

                <div>
                  <StoreWarrantyReceiptItemDetail
                    warranty={data}
                    isLoading={isValidating}
                    onDelete={() => {
                      handleDeleteWarrantyReceiptDraft()
                    }}
                    onConfirm={() => {
                      handleConfirmWarrantyReceiptDraft()
                    }}
                    onUpdate={() => {
                      handleUpdateWarrantyReceiptDraft()
                    }}
                  />
                </div>

                <ModalConfirm
                  visible={confirmWarrantyDraft}
                  title="Xác nhận phiếu bảo hành"
                  onConfirm={() => {
                    confirmWarrantyReceiptDraft(warranty_receipt_id, () => {
                      externalMutate?.(
                        [...(externalDataMutate || [])].filter(
                          (item) => item.warranty_receipt_id !== warranty_receipt_id
                        ),
                        false
                      )
                    })
                  }}
                  onDeny={() => {}}
                />

                <ModalConfirm
                  visible={confirmDeleteWarrantyDraft}
                  title="Xóa phiếu bảo hành?"
                  onConfirm={() => {
                    deleteWarrantyReceiptDraft(warranty_receipt_id, () => {
                      externalMutate?.(
                        [...(externalDataMutate || [])].filter(
                          (item) => item.warranty_receipt_id !== warranty_receipt_id
                        ),
                        false
                      )
                    })
                  }}
                  onDeny={() => {}}
                />
              </div>
            ) : null}
          </div>
        )}
      </Modal>
    </div>
  )
}
