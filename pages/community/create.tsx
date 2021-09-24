import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import CommunityCreateContainer from '@containers/Community/UpsertForm'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'

const CommunityCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout isWide={false}>
      <CommunityCreateContainer />
    </BlankLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.community_default_title'),
    },
  }
}

export default CommunityCreatePage
