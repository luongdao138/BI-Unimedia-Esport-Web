import MainLayout from '@layouts/MainLayout'
import { DetailContainer } from '@containers/Lobby'
import PageWithLayoutType from '@constants/page'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/lobby/selectors'
import * as actions from '@store/lobby/actions'
import GoogleAd from '@components/GoogleAd'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { GTMHelper } from '@utils/helpers/SendGTM'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getLobbyDetail(String(params.hash_key)))
  const lobby = selectors.getLobbyDetail(store.getState())
  const title = `${i18n.t('common:page_head.lobby_detail_title')}｜${lobby?.attributes?.title || ''}`
  const image = lobby?.attributes?.cover_image_url
  return {
    props: {
      title,
      image,
    },
  }
})

const LobbyPage: PageWithLayoutType = () => {
  const [slotDataLayer, setSlotDataLayer] = useState('')
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.LOBBY_DETAIL, screenDownSP))
  }, [screenDownSP])
  return (
    <MainLayout loginRequired={false}>
      {!screenDownSP && <div id={'ad_lobby_detail_top'} className={'google_ad_patten_1'} style={{ marginTop: 60 }} />}
      {/* GADS: lobby/ID 1-3*/}
      {!screenDownSP && (
        <GoogleAd id={{ idPatten1: 'ad_lobby_d' }} styleContainer={{ marginTop: 60 }} idTag={'ad_lobby_d'} slot={slotDataLayer} />
      )}
      <DetailContainer />
      {screenDownSP && <GoogleAd id={{ idPatten3: 'ad_lobby_d_b' }} idTag={'ad_lobby_d_b'} slot={slotDataLayer} />}
      {screenDownSP && <div id={'ad_lobby_detail_bottom'} className={'google_ad_patten_3'} />}
    </MainLayout>
  )
}

export default LobbyPage
