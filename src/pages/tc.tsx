import { glassBrigde, glassFrame, glassLenses } from '@/assets'
import { AntdImageCustom, Breadcrumb, Image, NotFound, SearchForm, Spinner } from '@/components'
import { DOMAIN_URL, WEB_DESCRIPTION, WEB_TITTLE, thumbnailImageUrl } from '@/constants'
import { isObjectHasValue } from '@/helper'
import { useCheckProductAuthen } from '@/hooks'
import { Main } from '@/templates'
import { useRouter } from 'next/router'
import {
  useEffect,
  // useEffect,
  useState,
} from 'react'
// import { useSWRConfig } from 'swr'

const TraCuuSanPhamPage = () => {
  // const { cache } = useSWRConfig()
  const { query, isReady } = useRouter()

  const [checkParams, setCheckParams] = useState<string>(query?.id as string)

  const { data, isValidating } = useCheckProductAuthen({
    params: { uuid_code: checkParams as string },
  })

  const hanldeSearchProduct = async (val: string) => {
    if (!val || val?.trim() === '') return

    // const currentData = cache.get(`${SWR_KEY.check_product_authen}_${val}`)?.data
    // console.log({currentData});

    if (isValidating || !isReady) return

    setCheckParams(val)
  }

  useEffect(() => {
    hanldeSearchProduct(query?.id as string)
  }, [query?.id])

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container px-12 min-h-[80vh]">
        <Breadcrumb
          breadcrumbList={[
            {
              path: '/',
              name: 'Tra cứu chính hãng',
            },
          ]}
        />

        <div className="flex-center gap-12 my-32">
          <div className="hidden md:block min-w-[132px] max-w-[10%] h-[0.5px] border border-t border-primary"></div>
          <p className="text-md md:text-xl text-center text-primary font-bold uppercase">
            Tra cứu thông tin sản phẩm chính hãng
          </p>
          <div className="hidden md:block min-w-[132px] max-w-[10%] h-[0.5px] border border-t border-primary"></div>
        </div>

        <div>
          <SearchForm
            placeholder="Nhập mã sản phẩm cần kiểm tra"
            buttonLabel="Tra cứu"
            onSubmit={(val: any) => {
              hanldeSearchProduct(val as string)
            }}
          />
        </div>

        {isValidating ? (
          <div className="flex-center my-12">
            <Spinner />
          </div>
        ) : isObjectHasValue(data) ? (
          <div className="my-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="bg-primary rounded-lg p-12">
                <p className="uppercase font-bold text-lg text-white text-center mb-12">
                  Thông tin sản phẩm
                </p>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Thương hiệu</p>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg flex-center">
                    <p className="text-md uppercase">{data?.category_id?.category_name}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Mã sản phẩm</p>
                  </div>
                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{data?.product_code}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Cửa hàng</p>
                  </div>
                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{data?.responsible_store_name}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Địa chỉ</p>
                  </div>

                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{data?.responsible_store_street || ''}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] flex items-center bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Kích thước</p>
                  </div>

                  <div className="flex-1 flex flex-wrap justify-between bg-white p-4 rounded-lg">
                    <div className="flex-col items-center justify-center flex">
                      <p className="text-base md:text-md">Tròng</p>
                      <div className="">
                        <Image
                          src={glassLenses}
                          imageClassName="w-[50px] h-[25px] md:w-[70px] md:h-[30px]"
                          className=""
                        />
                      </div>
                      <p className="text-base md:text-md">{`${data?.lens_size}mm`}</p>
                    </div>

                    <div className="flex-col items-center justify-center flex">
                      <p className="text-base md:text-md">Cầu</p>
                      <div className="">
                        <Image
                          src={glassBrigde}
                          imageClassName="w-[50px] h-[25px] md:w-[70px] md:h-[30px]"
                          className=""
                        />
                      </div>
                      <p className="text-base md:text-md">{`${data?.bridge_size}mm`}</p>
                    </div>

                    <div className="flex-col items-center justify-center flex">
                      <p className="text-base md:text-md">Càng kính</p>
                      <div className="">
                        <Image
                          src={glassFrame}
                          imageClassName="w-[50px] h-[25px] md:w-[70px] md:h-[30px]"
                          className=""
                        />
                      </div>
                      <p className="text-base md:text-md">{`${data?.temple_size}mm`}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="w-[150px] bg-white rounded-tl-lg p-4"></div>
                  <div className="flex-1 flex justify-between items-center bg-white rounded-tr-lg p-4">
                    <p className="flex-1 text-center text-md uppercase">{`Màu`}</p>
                    <p className="flex-1 text-center text-md uppercase">{`Chất liệu`}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-bl-lg p-4">
                    <p className="uppercase text-md font-bold mb-4">Gọng</p>
                    <p className="uppercase text-md font-bold">Tròng</p>
                  </div>
                  <div className="flex-1 flex-col justify-between items-center bg-white rounded-br-lg p-4">
                    <div className="flex justify-between items-center">
                      <p className="flex-1 text-center text-md">{`${
                        data?.frame_color_attribute?.value_name || '...'
                      }`}</p>
                      <p className="flex-1 text-center text-md">{`${
                        data?.frame_material_attribute?.value_name || '...'
                      }`}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="flex-1 text-center text-md">{`${
                        data?.lens_color_attribute?.value_name || '...'
                      }`}</p>
                      <p className="flex-1 text-center text-md">{`${
                        data?.lens_material_attribute?.value_name || '...'
                      }`}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="bg-red rounded-lg mb-12">
                  <p className="text-lg font-bold uppercase text-white text-center p-4">
                    Hình ảnh sản phẩm
                  </p>
                </div>

                <div className="flex flex-wrap justify-between gap-12">
                  {data?.image_ids?.map((image, index) => (
                    <AntdImageCustom
                      key={index}
                      src={image?.image_url}
                      className="flex-1 max-w-[50%]"
                      imageClassName="object-contain w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NotFound notify="Không tìm thấy thông tin sản phẩm" />
          </div>
        )}
      </div>
    </Main>
  )
}

export default TraCuuSanPhamPage

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: 'og:image',
          content: thumbnailImageUrl,
          key: 'ogimage',
        },
        {
          property: 'og:image:alt',
          content: thumbnailImageUrl,
          key: 'ogimagealt',
        },
        {
          property: 'og:image:width',
          content: '400',
          key: 'ogimagewidth',
        },
        {
          property: 'og:image:height',
          content: '300',
          key: 'ogimageheight',
        },
        {
          property: 'og:url',
          content: DOMAIN_URL,
          key: 'ogurl',
        },
        {
          property: 'og:image:secure_url',
          content: thumbnailImageUrl,
          key: 'ogimagesecureurl',
        },
        {
          property: 'og:title',
          content: WEB_TITTLE,
          key: 'ogtitle',
        },
        {
          property: 'og:description',
          content: WEB_DESCRIPTION,
          key: 'ogdesc',
        },
        {
          property: 'og:type',
          content: 'website',
          key: 'website',
        },
      ],
    },
  }
}
