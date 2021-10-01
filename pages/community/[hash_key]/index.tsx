import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import CommunityDetailContainer from '@containers/Community/Detail'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/community/selectors'
import * as actions from '@store/community/actions'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getCommunityDetail(String(params.hash_key)))
  const community = selectors.getCommunityDetail(store.getState())
  const title = `${i18n.t('common:page_head.community_detail_title')}｜${community?.attributes?.name || ''}`
  return {
    props: {
      title,
    },
  }
})

const CommunityDetailPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={false} patternBg={true}>
      <CommunityDetailContainer />
    </MainLayout>
  )
}

export default CommunityDetailPage
