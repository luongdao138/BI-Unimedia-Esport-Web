import MainLayout from '@layouts/MainLayout'
import CommunityDetailContainer from '@containers/Community/Detail'
import TwitterHead from '@components/TwitterHead'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/community/selectors'
import * as actions from '@store/community/actions'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getCommunityDetail(String(params.hash_key)))
  const community = selectors.getCommunityDetail(store.getState())
  const title = `${i18n.t('common:page_head.community_detail_title')}｜${community?.attributes?.name || ''}`
  const image = community?.attributes?.cover_image_url
  return {
    props: {
      title,
      image,
    },
  }
})

interface Props {
  image: string
  title: string
}

const CommunityDetailPage: React.FC<Props> = ({ image, title }) => {
  return (
    <MainLayout loginRequired={false} patternBg={true}>
      <TwitterHead title={title} image={image} />
      <CommunityDetailContainer />
    </MainLayout>
  )
}

export default CommunityDetailPage
