import { Breadcrumb, CreateWarrantyForCustomerForm } from '@/components'
import { WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { useStoreWarranty } from '@/hooks'
import { AccountContainer, Main } from '@/templates'
import { useRouter } from 'next/router'

const CreateWarrantyForCustomerPage = () => {
  const router = useRouter()

  const { createCustomerWarrantyReceipt } = useStoreWarranty()

  const handleSendWarrantyRequest = (data: any) => {
    if (!data?.warranty_attachment?.attachment_id) return

    const params = {
      product_id: data?.warranty_product?.value,
      lot_id: data?.serial?.value,
      customer_id: data?.customer?.value,
      warranty_starting: data?.date,
      invoice_ref: data?.invoice_ref,
      invoice_image_url: data?.warranty_attachment?.attachment_id,
    }

    createCustomerWarrantyReceipt(params, () => {
      router.push('/account/customer')
    })
  }

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Tạo bảo hành cho khách',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <p className="text-xl capitalize font-semibold border-b border-gray-200 pb-12 mb-24">
            Tạo bảo hành cho khách
          </p>

          <div className="w-[80%] mx-auto">
            <CreateWarrantyForCustomerForm onSubmit={handleSendWarrantyRequest} />
          </div>
        </div>
      </AccountContainer>
    </Main>
  )
}

export default CreateWarrantyForCustomerPage
