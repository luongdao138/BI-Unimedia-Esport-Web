import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/arena'
import { storeWrapper, AppDispatch } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getTournamentDetail(String(params.hash_key)))
  const arena = selectors.getTournamentDetail(store.getState())
  const title = `${i18n.t('common:page_head.arena_detail_title')}｜${arena?.attributes?.title || ''}`
  const image = arena?.attributes?.cover_image
  return {
    props: {
      title,
      image,
    },
  }
})

const TournamentsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={false}>
      <DetailContainer />
    </MainLayout>
  )
}

export default TournamentsPage
