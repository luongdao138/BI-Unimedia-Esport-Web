import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import { withAuth } from '@utils/withAuth'

const TopicCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <TopicCreateContainer />
    </BlankLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default withAuth(TopicCreatePage)
