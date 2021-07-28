import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import ArenaCreateContainer from '@containers/arena/UpsertForm'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import { useRouter } from 'next/router'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

const ArenaCreatePage: PageWithLayoutType = () => {
  const isAuth = useAppSelector(getIsAuthenticated)
  if (!isAuth) {
    const router = useRouter()
    router.push(ESRoutes.LOGIN)
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
