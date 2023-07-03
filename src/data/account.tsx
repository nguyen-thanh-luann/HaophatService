import {
  DocumentListIcon,
  DonationIconOutline,
  FeatherOutlineIcon,
  HoneyIcon,
  LocationOutlineIcon,
  LockIconOutline,
  LogoutIconOutline,
  MenuSquareDotOutlineIcon,
  NotebookIconOutlinePlus,
  PackageBoxIconOutline,
  StarIconOutline,
  TagIcon,
  UserCircleIcon,
  UserDoubleCircleIcon,
  UserPoligonIcon,
} from '@/assets'

export const accountIconStyle = 'w-[20px] h-[20px]'

export const PublicAccessRule = ['th', 'nvkd', 'npp', 'gsbh', 'asm', 'admin', 'manager', ''] // all user

export const AdminAccessRule = ['manager']

export const PublicAccountTypePermissions = ['store_account', 'customer_account', '']
export const StoreAccountTypePermissions = ['store_account']
export const CustomerAccountTypePermissions = ['customer_account']

export const accountNavData = [
  {
    path: '/account/profile',
    icon: <UserCircleIcon className={accountIconStyle} />,
    title: 'Hồ sơ cá nhân',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/warranty-list',
    icon: <DocumentListIcon className={accountIconStyle} />,
    title: 'Danh sách bảo hành',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/store-create-warranty',
    icon: <HoneyIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành',
    account_type_permissions: StoreAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/customer-create-warranty',
    icon: <HoneyIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành',
    account_type_permissions: CustomerAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/customer',
    icon: <UserDoubleCircleIcon className={accountIconStyle} />,
    title: 'Khách hàng',
    account_type_permissions: StoreAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/create-warranty-for-customer',
    icon: <UserPoligonIcon className={accountIconStyle} />,
    title: 'Tạo bảo hành cho khách',
    account_type_permissions: StoreAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/purchased-order',
    icon: <DonationIconOutline className={accountIconStyle} />,
    title: 'Đơn hàng',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/rating-product',
    icon: <StarIconOutline className={accountIconStyle} />,
    title: 'Đánh giá của tôi',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/address',
    icon: <LocationOutlineIcon className={accountIconStyle} />,
    title: 'Địa chỉ',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/password',
    icon: <LockIconOutline className={accountIconStyle} />,
    title: 'Mật khẩu',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: PublicAccessRule,
  },
  {
    path: '/account/post',
    icon: <NotebookIconOutlinePlus className={accountIconStyle} />,
    title: 'Tin tức',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: AdminAccessRule,
  },
  {
    path: '/account/add-post',
    icon: <FeatherOutlineIcon className={accountIconStyle} />,
    title: 'Thêm tin tức',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: AdminAccessRule,
  },
  {
    path: '/account/post-category',
    icon: <MenuSquareDotOutlineIcon className={accountIconStyle} />,
    title: 'Danh mục tin tức',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: AdminAccessRule,
  },
  {
    path: '/account/post-tags',
    icon: <TagIcon className={accountIconStyle} />,
    title: 'Quản lí tags',
    account_type_permissions: PublicAccountTypePermissions,
    access_rules: AdminAccessRule,
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
