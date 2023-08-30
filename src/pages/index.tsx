import {
  CategoryBrandNews,
  FirstSectionProductByAttributeMinor,
  HomeBanner,
  HomeBannerMobile,
  HomePosts,
  ListProductByAttributeMinor,
  VisceraAttribute,
} from '@/components'

import { DOMAIN_URL, thumbnailImageUrl, WEB_DESCRIPTION, WEB_TITTLE } from '@/constants'
import { useDevice } from '@/hooks'
import { Main } from '@/templates'

// this is final branch.
const HomePage = () => {
  const { isDesktop } = useDevice()

  return (
    <Main title={WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div>
        <div className="mb-24">{isDesktop ? <HomeBanner /> : <HomeBannerMobile />}</div>

        <div className="container px-12">
          <CategoryBrandNews className='mb-24 md:p-24'/>

          <FirstSectionProductByAttributeMinor />

          <VisceraAttribute />

          <ListProductByAttributeMinor />
        </div>

        <div className="container px-12">
          <HomePosts className="mb-12 last:mb-0" />
        </div>
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
