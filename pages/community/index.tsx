import CommunityContainer from '@containers/Community'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { CommunityFilterOption } from '@services/community.service'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useEffect, useState } from 'react'
import { ESRoutes } from '@constants/route.constants'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'

const CommunityPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  const isAuth = useAppSelector(getIsAuthenticated)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (!isAuth && ['joined', 'organized'].includes(filter)) {
      router.push(ESRoutes.LOGIN)
    } else if (isAuth || (!isAuth && !['joined', 'organized'].includes(filter))) {
      setRender(true)
    }
  }, [isAuth, router.query])

  if (!render) {
    return <></>
  }

  return (
    <MainLayout loginRequired={false} patternBg={true}>
      <CommunityContainer filter={formatFilter(filter)} />
    </MainLayout>
  )
}

function formatFilter(filterText: string) {
  if (!_.isString(filterText)) return CommunityFilterOption.all
  const possibleFilters = ['all', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as CommunityFilterOption
  }
  return CommunityFilterOption.all
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.community_default_title'),
    },
  }
}

export default CommunityPage
