import {
  Breadcrumb,
  CustomerWarrantyList,
  StoreWarrantyList
} from '@/components'
import { WEB_DESCRIPTION } from '@/constants'
import { useUser } from '@/hooks'
import { AccountContainer, Main } from '@/templates'

const WarrantyListPage = () => {
  const { userInfo } = useUser({})

  return (
    <Main title={'Danh sách bảo hành'} description={WEB_DESCRIPTION}>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Danh sách bảo hành',
            },
          ]}
        />
      </div>

      <AccountContainer className="container mb-32">
        <div className="bg-white p-24 rounded-[10px] shadow-shadow-1">
          <p className="text-xl capitalize font-semibold border-b border-gray-200 pb-12 mb-24">
            Danh sách bảo hành
          </p>

          {userInfo?.account?.warranty_account_type === 'store_account' ? (
            <StoreWarrantyList />
          ) : (
            <CustomerWarrantyList />
          )}
        </div>
      </AccountContainer>
    </Main>
  )
}

export default WarrantyListPage
