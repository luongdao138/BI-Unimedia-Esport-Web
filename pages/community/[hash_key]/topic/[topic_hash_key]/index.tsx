import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import TopicDetailContainer from '@containers/Community/TopicDetail'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/community/selectors'
import * as actions from '@store/community/actions'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getTopicDetail({ community_hash: String(params.hash_key), topic_hash: String(params.topic_hash_key) }))
  const topic = selectors.getTopicDetail(store.getState())
  const title = `${i18n.t('common:page_head.community_topic_detail_title')}｜${topic?.attributes?.title || ''}`
  return {
    props: {
      title,
    },
  }
})

const TopicDetailPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true} patternBg={true}>
      <TopicDetailContainer />
    </MainLayout>
  )
}

export default TopicDetailPage
