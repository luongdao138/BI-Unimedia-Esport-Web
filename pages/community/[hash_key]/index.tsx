import MainLayout from '@layouts/MainLayout'
import CommunityDetailContainer from '@containers/Community/Detail'
import PageWithLayoutType from '@constants/page'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/community/selectors'
import * as actions from '@store/community/actions'
import { useMediaQuery, useTheme } from '@material-ui/core'
import GoogleAd from '@components/GoogleAd'
import { useEffect, useState } from 'react'
import { GTMHelper } from '@utils/helpers/SendGTM'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getCommunityDetail(String(params.hash_key)))
  const community = selectors.getCommunityDetail(store.getState())
  const title = `${i18n.t('common:page_head.community_detail_title')}｜${community?.attributes?.name || ''}`
  const image = community?.attributes?.cover_image_url
  return {
    props: {
      title,
      image,
    },
  }
})

const CommunityDetailPage: PageWithLayoutType = () => {
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')

  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.COMMUNITY_DETAIL, screenDownSP))
  }, [screenDownSP])
  return (
    <>
      <MainLayout loginRequired={false} patternBg={true}>
        {!screenDownSP && <div id={'ad_community_detail_top'} className={'google_ad_patten_1'} style={{ marginTop: 60 }} />}
        {/* GADS: Community/ID 1-3*/}
        {!screenDownSP && (
          <GoogleAd id={{ idPatten1: 'ad_community_d' }} styleContainer={{ marginTop: 60 }} idTag={'ad_community_d'} slot={slotDataLayer} />
        )}
        <CommunityDetailContainer />
      </MainLayout>
      {screenDownSP && <div id={'ad_community_detail_bottom'} className={'google_ad_patten_3'} />}
      {screenDownSP && <GoogleAd id={{ idPatten3: 'ad_community_d_b' }} idTag={'ad_community_d_b'} slot={slotDataLayer} />}
    </>
  )
}

export default CommunityDetailPage
