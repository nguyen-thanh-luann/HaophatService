import {
  Breadcrumb,
  NotFound,
  Pagination,
  PostCategoryMenu,
  PostDetail,
  PostDetailLoading,
  PostItemLoading,
  PostListItemHorizontal,
} from '@/components'
import {
  DEFAULT_POST_LIMIT,
  SWR_KEY,
  WEB_DESCRIPTION,
  WEB_TITTLE
} from '@/constants'
import {
  fromProductSlugToProductId,
  generateProductSlug,
  isArrayHasValue,
  isObjectHasValue,
} from '@/helper'
import { usePostDetail, usePostList } from '@/hooks'
import { Main } from '@/templates'
import { Post } from '@/types'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const PostDetailPage = () => {
  const router = useRouter()
  const post_id = fromProductSlugToProductId((router.query.slug as string) || '')

  const { data: postDetail, isValidating } = usePostDetail({
    key: `${SWR_KEY.get_post_detail}_${post_id}`,
    params: { post_id },
  })

  const {
    data: postList,
    isValidating: isLoadingPostList,
    paginate,
    limit,
    total,
    offset,
  } = usePostList({
    key: `${SWR_KEY.get_post_list_related}`,
    params: {
      limit: DEFAULT_POST_LIMIT,
    },
  })

  const renderderPostLoading = () => {
    return (
      <div>
        {Array.from({ length: 4 }).map((_, index) => (
          <PostItemLoading key={index} />
        ))}
      </div>
    )
  }

  const hanldePostClick = (data: Post) => {
    router.push({
      pathname: '/post-detail',
      query: {
        ...router.query,
        slug: generateProductSlug(data?.title, data?.id),
      },
    })
  }

  const handlePaginate = (page: number) => {
    paginate({ page })
  }

  return (
    <Main title={postDetail?.title || WEB_TITTLE} description={WEB_DESCRIPTION}>
      <div className="container my-24">
        {isValidating ? (
          <PostDetailLoading />
        ) : isObjectHasValue(postDetail) ? (
          <div>
            <Breadcrumb
              breadcrumbList={[
                {
                  path: '/',
                  name: 'Tin tức',
                },
              ]}
            />

            <div className="flex gap-24">
              <div className="w-[300px] hidden md:block ">
                <div className="bg-white p-12 sticky top-header_group_height">
                  <PostCategoryMenu />
                </div>
              </div>
              <div className="flex-1 overflow-scroll scrollbar-hide">
                <PostDetail className="mb-32 bg-white" data={postDetail} />

                <div className="bg-white p-12">
                  {isLoadingPostList || isArrayHasValue(postList) ? (
                    <div>
                      <p className="mb-12 text-2xl font-bold capitalize border-b-2 border-primary">
                        Xem thêm bài viết
                      </p>

                      <div>
                        {isValidating ? (
                          <div>{renderderPostLoading()}</div>
                        ) : (
                          <div>
                            {postList?.map((post) =>
                              post?.id !== post_id ? (
                                <PostListItemHorizontal data={post} onClick={hanldePostClick} />
                              ) : null
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {!isValidating && isArrayHasValue(postList) && (
                    <Pagination
                      forcePage={offset / limit}
                      className={classNames('mt-[24px]')}
                      pageCount={Math.ceil(total / DEFAULT_POST_LIMIT)}
                      onPageChange={({ selected }) => handlePaginate(selected + 1)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound notify="Không tìm thấy thông tin bài viết" />
        )}
      </div>
    </Main>
  )
}

export default PostDetailPage
