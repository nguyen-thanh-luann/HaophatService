import { Breadcrumb, CustomerCreateWarrantyForm } from '@/components'
import { WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { useCustomerWarranty, useCustomerWarrantyDetail } from '@/hooks'
import { AccountContainer, Main } from '@/templates'
import { useRouter } from 'next/router'

const CustomerCreateWarrantyPage = () => {
  const router = useRouter()
  const warranty_receipt_customer_id = Number(router?.query?.id) || 0

  const { createWarrantyReceipt, updateCustomerWarrantyReceipt } = useCustomerWarranty({
    key: '', //update later
  })
  const { data: warrantyUpdate } = useCustomerWarrantyDetail({
    key: `get_warranty_product_info_${warranty_receipt_customer_id}`,
    params: {
      warranty_receipt_customer_id,
    },
  })

  const handleSendWarrantyRequest = (data: any) => {
    if (!data?.warranty_attachment?.attachment_id) return

    const params = {
      product_id: data?.warranty_product?.value,
      lot_id: data?.serial?.value,
      store_id: data?.agency?.value,
      warranty_starting: data?.date,
      invoice_ref: data?.invoice_ref,
      invoice_image_url: data?.warranty_attachment?.attachment_id,
    }

    if (warranty_receipt_customer_id) {
      updateCustomerWarrantyReceipt(
        {
          warranty_receipt_customer_id,
          ...params,
        },
        () => {
          router.push('/account/warranty-list')
        }
      )
    } else {
      createWarrantyReceipt(params, () => {
        router.push('/account/warranty-list')
      })
    }
  }

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Tạo bảo hành',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <p className="text-xl capitalize font-semibold border-b border-gray-200 pb-12 mb-24">
            Tạo bảo hành
          </p>

          <div className="w-[80%] mx-auto">
            <CustomerCreateWarrantyForm
              onSubmit={handleSendWarrantyRequest}
              type={warranty_receipt_customer_id ? 'update' : 'create'}
              warrantyUpdate={warrantyUpdate}
            />
          </div>
        </div>
      </AccountContainer>
    </Main>
  )
}

export default CustomerCreateWarrantyPage
