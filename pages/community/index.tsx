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
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { GTMHelper } from '@utils/helpers/SendGTM'
import GoogleAd from '@components/GoogleAd'

const CommunityPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  const isAuth = useAppSelector(getIsAuthenticated)
  const [render, setRender] = useState(false)

  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (!isAuth && ['joined', 'organized'].includes(filter)) {
      router.push(ESRoutes.LOGIN)
    } else if (isAuth || (!isAuth && !['joined', 'organized'].includes(filter))) {
      setRender(true)
    }
  }, [isAuth, router.query])
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.COMMUNITY, screenDownSP))
  }, [screenDownSP])

  if (!render) {
    return <></>
  }

  return (
    <MainLayout
      loginRequired={false}
      patternBg={true}
      adsOption={true}
      styleContentMainLayout={classes.contentMainLayout}
      childrenAds={
        <>
          {screenDownSP && (
            <GoogleAd
              id={{ idPatten3: 'ad_community_b' }}
              idTag={'ad_community_b'}
              slot={slotDataLayer}
              currenPath={window.location.href}
            />
          )}
        </>
      }
    >
      <CommunityContainer filter={formatFilter(filter)} />
    </MainLayout>
  )
}

const useStyles = makeStyles(() => ({
  contentMainLayout: {
    minHeight: 'auto',
    height: 'calc(100vh - 110px)', //60px(header)+50px(ads)
    overflow: 'auto',
  },
}))

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
