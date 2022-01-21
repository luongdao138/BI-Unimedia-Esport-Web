import MainLayout from '@layouts/MainLayout'
import { DetailContainer } from '@containers/Lobby'
import PageWithLayoutType from '@constants/page'
import { AppDispatch, storeWrapper } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/lobby/selectors'
import * as actions from '@store/lobby/actions'

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
  return (
    <MainLayout loginRequired={false}>
      <DetailContainer />
    </MainLayout>
  )
}

export default LobbyPage