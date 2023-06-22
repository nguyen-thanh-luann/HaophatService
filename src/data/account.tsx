import {
  DonationIconOutline,
  LocationOutlineIcon,
  LockIconOutline,
  LogoutIconOutline,
  PackageBoxIconOutline,
  StarIconOutline,
  UserCircleIcon,
} from '@/assets'

export const accountIconStyle = 'w-[20px] h-[20px]'

export const PublicAccessRule = ['th', 'nvkd', 'npp', 'gsbh', 'asm', ''] // all user

export const UserAccessRule = ['th', 'nvkd', 'gsbh', 'asm', ''] //without 'npp'
export const AdminAccessRule = ['npp'] //only 'npp'

export const PublicAccountTypePermissions = ['store_account', 'customer_account', '']
export const StoreAccountTypePermissions = ['store_account']
export const CustomerAccountTypePermissions = ['customer_account']

export const accountNavData = [
  {
    path: '/account/profile',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Hồ sơ cá nhân',
    account_type_permissions: PublicAccountTypePermissions,
  },
  {
    path: '/account/warranty-list',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Danh sách bảo hành',
    account_type_permissions: PublicAccountTypePermissions,
  },
  {
    path: '/account/store-create-warranty',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành',
    account_type_permissions: StoreAccountTypePermissions,
  },
  {
    path: '/account/customer-create-warranty',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành',
    account_type_permissions: CustomerAccountTypePermissions,
  },
  {
    path: '/account/customer',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Khách hàng',
    account_type_permissions: StoreAccountTypePermissions,
  },
  {
    path: '/account/create-warranty-for-customer',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành cho khách',
    account_type_permissions: StoreAccountTypePermissions,
  },
  {
    path: '/purchased-order',
    icon: <DonationIconOutline className={accountIconStyle} />,
    title: 'Đơn hàng',
    account_type_permissions: PublicAccountTypePermissions,
  },
  {
    path: '/account/rating-product',
    icon: <StarIconOutline className={accountIconStyle} />,
    title: 'Đánh giá của tôi',
    account_type_permissions: PublicAccountTypePermissions,
  },
  {
    path: '/account/address',
    icon: <LocationOutlineIcon className={accountIconStyle} />,
    title: 'Địa chỉ',
    account_type_permissions: PublicAccountTypePermissions,
  },
  {
    path: '/account/password',
    icon: <LockIconOutline className={accountIconStyle} />,
    title: 'Mật khẩu',
    account_type_permissions: PublicAccountTypePermissions,
  },
]

const iconClassName = 'w-[20px] h-[20px]'

export const AccountMenuData = [
  {
    title: 'Trang cá nhân',
    icon: <UserCircleIcon className={iconClassName} />,
    path: '/account/profile',
  },
  {
    title: 'Đơn hàng',
    icon: <PackageBoxIconOutline className={iconClassName} />,
    path: '/purchased-order',
  },
  {
    title: 'Đăng xuất',
    icon: <LogoutIconOutline className={iconClassName} />,
    path: 'logout',
  },
]
