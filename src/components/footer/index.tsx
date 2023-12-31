import {
  TelePhoneIcon,
  companyIconSm,
  downloadAppStore,
  downloadGooglePlay,
  facebookIcon,
  zaloIcon,
} from '@/assets'
import { CONTACT_EMAIL_ADDRESS, CONTACT_PHONE_NUMBER, DOMAIN_URL } from '@/constants'
import { AboutUsData, WebCategoryData } from '@/data'
import Link from 'next/link'
import { Image } from '../image'

export const Footer = () => {
  return (
    <footer className="footer relative w-full py-80 px-24">
      <div className="container px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40">
        <div className="col-span-1 z-10">
          <div className="mb-24">
            <Image
              src={companyIconSm}
              className="w-[80px] h-[60px]"
              imageClassName="w-full max-w-[180px] object-cover"
            />
          </div>

          <p className="text-md text-text-color font-normal mb-12"></p>

          <p className="text-md text-text-color font-normal mb-12">
            Địa chỉ: SH1-08 Khu Đô Thị Sala, 153 Nguyễn Cơ Thạch, Phường An Lợi Đông, Thành phố thủ
            đức, Thành Phố Hồ Chí Minh, Việt Nam
          </p>
          <p className="text-md text-text-color font-normal mb-12">GPĐKKD: XXXX</p>

          <p className="text-md text-text-color font-normal mb-12">
            Website:{' '}
            <a href={DOMAIN_URL} target="_blank">
              {DOMAIN_URL}
            </a>
          </p>
          <p className="text-md text-text-color font-normal mb-12">
            Tổng đài tư vấn: <a href={`tel:${CONTACT_PHONE_NUMBER}`}>{CONTACT_PHONE_NUMBER}</a>
          </p>

          <p className="text-md text-text-color font-normal mb-12">
            Email: <a href={`mailto:${CONTACT_EMAIL_ADDRESS}`}>{CONTACT_EMAIL_ADDRESS}</a>
          </p>
        </div>

        <div className="col-span-1 z-10">
          <p className="text-primary font-bold text-lg leading-10 mb-24">Shops</p>

          {WebCategoryData.map((item, index) => (
            <Link className="forward-link" key={index} href={item?.path || ''}>
              <p className="text-md text-text-color font-normal leading-8 mb-16">
                {item?.title || ''}
              </p>
            </Link>
          ))}
        </div>

        <div className="col-span-1 z-10">
          <p className="text-primary font-bold text-lg leading-10 mb-24">Về chúng tôi</p>
          {AboutUsData.map((item, index) => (
            <Link className="forward-link" key={index} href={item.path}>
              <p className="text-md text-text-color font-normal leading-8 mb-16">{item.title}</p>
            </Link>
          ))}
        </div>

        <div className="col-span-1 z-10">
          <div className="mb-24">
            <div className="mb-16 text-center">
              <p className="text-md uppercase">Tải ứng dụng</p>
              <p className="text-md uppercase">
                <span className="text-primary">HÀO PHÁT SERVICE</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-16">
              <Link href={'/'}>
                <Image src={downloadGooglePlay} imageClassName="w-[134px]" />
              </Link>

              <Link href={'/'}>
                <Image src={downloadAppStore} imageClassName="w-[134px]" />
              </Link>
            </div>
          </div>

          <div className="">
            <p className="text-md text-center text-text-color uppercase mb-12">
              Kết nối cùng Hào Phát
            </p>

            <div className="flex items-center justify-center gap-16">
              <Link href={'/'} target="_blank">
                <Image
                  src={facebookIcon}
                  className="w-[40px] h-[40px] object-cover cursor-pointer"
                />
              </Link>

              <Link href={`https://zalo.me`} target="_blank">
                <Image src={zaloIcon} className="w-[40px] h-[40px] object-cover cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <a
        href={`tel:${CONTACT_PHONE_NUMBER}`}
        className="absolute top-[-25px] z-10 right-[5%] py-8 px-16 rounded-full bg-primary text-white flex-center gap-12"
      >
        <TelePhoneIcon className="w-16 h-16 text-white" />

        <p className="text-white text-base font-normal leading-10">{`${CONTACT_PHONE_NUMBER}`}</p>
      </a>

      {/* background linear */}
      <div className="absolute top-0 bottom-0 left-0 right-0 background-default z-0"></div>
    </footer>
  )
}
