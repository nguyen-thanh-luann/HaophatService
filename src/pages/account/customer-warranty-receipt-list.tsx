import {
  Breadcrumb
} from '@/components'
import { WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { AccountContainer, Main } from '@/templates'

const CustomerWarrantyReceiptListPage = () => {
  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Thông tin bảo hành của khách hàng',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <div className="border-b border-gray-200 pb-12 mb-24 flex-between flex-wrap">
            <p className="text-xl capitalize font-semibold">Thông tin bảo hành của khách hàng</p>
          </div>
        </div>
      </AccountContainer>
    </Main>
  )
}

export default CustomerWarrantyReceiptListPage
