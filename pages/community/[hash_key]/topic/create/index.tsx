import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'
import withAuth from '@utils/withAuth'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'

const TopicCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout isWide>
      <TopicCreateContainer />
    </BlankLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.community_topic_default_title'),
    },
  }
}

export default withAuth(TopicCreatePage)
