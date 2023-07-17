import { glassBrigde, glassFrame, glassLenses } from '@/assets'
import { Breadcrumb, CustomImage, Image, NotFound, SearchForm, Spinner } from '@/components'
import { DOMAIN_URL, SWR_KEY, WEB_DESCRIPTION, WEB_TITTLE, thumbnailImageUrl } from '@/constants'
import { isObjectHasValue } from '@/helper'
import { useProductDetail } from '@/hooks'
import { productAPI } from '@/services'
import { Main } from '@/templates'
import { ProductDetail } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const TraCuuSanPhamPage = () => {
  const [currentProduct, setCurrentProduct] = useState<ProductDetail>()
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const { id } = router.query

  const { data, isValidating } = useProductDetail({
    key: `${SWR_KEY.get_product_detail}_${id}`,
    params: {
      product_id: Number(id),
    },
  })

  useEffect(() => {
    setCurrentProduct(data?.product_data)
  }, [data])

  const hanldeSearchProduct = async (val: string) => {
    try {
      setLoading(true)
      const res: any = await productAPI.getProductDetail({ product_code: val })
      if (res?.success) {
        setCurrentProduct(res?.data?.product_data)
      } else {
        setCurrentProduct(undefined)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

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
            placeholder="Nhập mã sản phẩm cần kiểm tra (vd: 6975888251537)"
            buttonLabel="Tra cứu"
            onSubmit={(val) => hanldeSearchProduct(val as string)}
          />
        </div>

        {isValidating || loading ? (
          <div className="flex-center my-12">
            <Spinner />
          </div>
        ) : isObjectHasValue(currentProduct) ? (
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
                    <p className="text-md uppercase">
                      {currentProduct?.category_id?.category_name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Mã sản phẩm</p>
                  </div>
                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{currentProduct?.product_code}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Cửa hàng</p>
                  </div>
                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{`Hào phát`}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-12">
                  <div className="w-[150px] bg-white rounded-lg p-4">
                    <p className="uppercase text-md font-bold">Địa chỉ</p>
                  </div>

                  <div className="flex-1 flex-center bg-white rounded-lg p-4">
                    <p className="text-md uppercase">{`153, Nguyễn Cơ Thạch, Quận 2, TP.HCM`}</p>
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
                      <p className="text-base md:text-md">{`${currentProduct?.lens_size}mm`}</p>
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
                      <p className="text-base md:text-md">{`${currentProduct?.bridge_size}mm`}</p>
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
                      <p className="text-base md:text-md">{`${currentProduct?.temple_size}mm`}</p>
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
                        currentProduct?.frame_color_attribute?.value_name || '...'
                      }`}</p>
                      <p className="flex-1 text-center text-md">{`${
                        currentProduct?.frame_material_attribute?.value_name || '...'
                      }`}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="flex-1 text-center text-md">{`${
                        currentProduct?.lens_color_attribute?.value_name || '...'
                      }`}</p>
                      <p className="flex-1 text-center text-md">{`${
                        currentProduct?.lens_material_attribute?.value_name || '...'
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
                  {currentProduct?.image_ids?.map((image, index) => (
                    <CustomImage
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
