import { StoresList } from '@/components'
import { DOMAIN_URL, thumbnailImageUrl, WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { Main } from '@/templates'

const HomePage = () => {
  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container px-12 min-h-[80vh]">
        <div className="flex-center gap-12 my-32">
          <div className="hidden md:block min-w-[132px] max-w-[10%] h-[0.5px] border border-t border-primary"></div>
          <p className="text-md md:text-xl text-primary font-bold uppercase">Hệ thống cửa hàng</p>
          <div className="hidden md:block min-w-[132px] max-w-[10%] h-[0.5px] border border-t border-primary"></div>
        </div>

        <StoresList />


      </div>
    </Main>
  )
}

export default HomePage

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
