import { Breadcrumb, StoreCreateWarrantyForm } from '@/components'
import { SWR_KEY, WEB_DESCRIPTION } from '@/constants'
import { useStoreWarranty, useStoreWarrantyDetail } from '@/hooks'
import { AccountContainer, Main } from '@/templates'
import { useRouter } from 'next/router'

const StoreCreateWarrantyPage = () => {
  const router = useRouter()
  const warranty_receipt_id = Number(router?.query?.id) || 0
  const { createStoreWarrantyReceipt, updateWarrantyReceiptDraft } = useStoreWarranty()

  const { data: warrantyUpdateInfo } = useStoreWarrantyDetail({
    key: `${SWR_KEY?.get_store_warranty_receipt_detail}_${warranty_receipt_id}`,
    params: {
      warranty_receipt_id,
    },
  })

  const handleCreate = (data: any) => {
    const params = {
      picking_id: data?.picking_id?.value,
      invoice_ref: data?.invoice_ref,
      warranty_starting: data?.date,
    }
    if (warranty_receipt_id) {
      updateWarrantyReceiptDraft(
        {
          warranty_receipt_id,
          ...params,
        },
        () => {
          router.push('/account/warranty')
        }
      )
    } else {
      createStoreWarrantyReceipt(params, () => {
        router.push('/account/warranty')
      })
    }
  }

  return (
    <Main title={'Bảo hành'} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Bảo hành',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <p className="text-xl capitalize font-semibold border-b border-gray-200 pb-12 mb-24">
            Bảo hành
          </p>

          <StoreCreateWarrantyForm
            onSubmit={handleCreate}
            type={warranty_receipt_id ? 'update' : 'create'}
            warrantyUpdate={warrantyUpdateInfo}
          />
        </div>
      </AccountContainer>
    </Main>
  )
}

export default StoreCreateWarrantyPage
