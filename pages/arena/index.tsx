import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { ArenaHomeContainer } from '@containers/arena'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { TournamentFilterOption } from '@services/arena.service'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

import { useEffect, useState } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

const TournamentPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  const isAuth = useAppSelector(getIsAuthenticated)
  const [render, setRender] = useState(false)

  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')
  // const classes = useStyles()

  useEffect(() => {
    if (!isAuth && ['joined', 'organized'].includes(filter)) {
      router.push(ESRoutes.LOGIN)
    } else if (isAuth || (!isAuth && !['joined', 'organized'].includes(filter))) {
      setRender(true)
    }
  }, [isAuth, router.query])
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.ARENA, screenDownSP))
  }, [screenDownSP])

  if (!render) {
    return <></>
  }

  return (
    <MainLayout
      loginRequired={false}
      adsOption={true}
      // styleContentMainLayout={classes.contentMainLayout}
      childrenAds={
        <>
          {screenDownSP && (
            <GoogleAd id={{ idPatten4: 'ad_arena_b' }} idTag={'ad_arena_b'} slot={slotDataLayer} currenPath={window.location.href} />
          )}
        </>
      }
    >
      <div
        id={!screenDownSP ? 'ad_arena_top' : 'ad_arena_bottom'}
        className={!screenDownSP ? 'google_ad_patten_1' : 'google_ad_patten_4'}
      />
      {!screenDownSP && (
        <GoogleAd
          id={{ idPatten1: !screenDownSP && 'ad_arena_t' }}
          slot={slotDataLayer}
          idTag={'ad_arena_t'}
          currenPath={window.location.href}
        />
      )}
      <ArenaHomeContainer filter={formatFilter(filter)} />
    </MainLayout>
  )
}
// const useStyles = makeStyles(() => ({
//   contentMainLayout: {
//     minHeight: 'auto',
//     height: 'calc(100vh - 110px)', //60px(header)+50px(ads)
//     overflow: 'auto',
//   },
// }))

function formatFilter(filterText: string) {
  if (!_.isString(filterText)) return TournamentFilterOption.all
  const possibleFilters = ['all', 'ready', 'recruiting', 'before_start', 'in_progress', 'completed', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as TournamentFilterOption
  }
  return TournamentFilterOption.all
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default TournamentPage
