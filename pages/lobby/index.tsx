import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React, { useEffect, useState } from 'react'
import { LobbyHomeContainer } from '@containers/Lobby'
import { useRouter } from 'next/router'
import { LobbyFilterOption } from '@services/lobby.service'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import _ from 'lodash'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { GTMHelper } from '@utils/helpers/SendGTM'
import GoogleAd from '@components/GoogleAd'

const LobbyPage: PageWithLayoutType = () => {
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
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.LOBBY, screenDownSP))
  }, [screenDownSP])

  if (!render) {
    return <></>
  }

  return (
    <MainLayout
      loginRequired={false}
      adsOption={true}
      styleContentMainLayout={classes.contentMainLayout}
      childrenAds={
        <>
          {screenDownSP && (
            <GoogleAd id={{ idPatten3: 'ad_lobby_b' }} idTag={'ad_lobby_b'} slot={slotDataLayer} currenPath={window.location.href} />
          )}
        </>
      }
    >
      <LobbyHomeContainer filter={formatFilter(filter)} />
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
const formatFilter = (filterText: string) => {
  if (!_.isString(filterText)) return LobbyFilterOption.all

  const filterVal = filterText as LobbyFilterOption
  if (Object.values(LobbyFilterOption).includes(filterVal)) return filterVal
  return LobbyFilterOption.all
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.lobby_default_title'),
    },
  }
}

export default LobbyPage
