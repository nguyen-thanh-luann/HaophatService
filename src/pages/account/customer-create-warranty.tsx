import { Breadcrumb, CustomerCreateWarrantyForm } from '@/components'
import { SWR_KEY, WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { useCustomerWarranty, useCustomerWarrantyDetail } from '@/hooks'
import { AccountContainer, Main } from '@/templates'
import { useRouter } from 'next/router'

const CustomerCreateWarrantyPage = () => {
  const router = useRouter()
  const warranty_receipt_customer_id = Number(router?.query?.id) || 0

  const { createWarrantyReceipt, updateCustomerWarrantyReceipt } = useCustomerWarranty({
    key: `${SWR_KEY.customer_warranty_receipt_list}`,
  })
  const { data: warrantyUpdate } = useCustomerWarrantyDetail({
    key: `${SWR_KEY.warranty_product_detail}_${warranty_receipt_customer_id}`,
    params: {
      warranty_receipt_customer_id,
    },
  })

  const handleSendWarrantyRequest = (data: any) => {
    const params = { ...data }

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
