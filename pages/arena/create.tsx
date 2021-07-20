import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import ArenaCreateContainer from '@containers/arena/UpsertForm'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'

const ArenaCreatePage: PageWithLayoutType = () => {
  const router = useRouter()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  if (!isAuthenticated) {
    router.push(ESRoutes.TOP)
    return <></>
  }
  return <ArenaCreateContainer />
}

ArenaCreatePage.Layout = BlankLayout

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default ArenaCreatePage
