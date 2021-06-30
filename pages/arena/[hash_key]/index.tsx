import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/arena'
import { storeWrapper, AppDispatch } from '@store/store'

import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getTournamentDetail(String(params.hash_key)))
  const arena = selectors.getTournamentDetail(store.getState())
  const title = `eXeLAB｜大会情報｜${arena?.attributes?.title || ''}`
  return {
    props: {
      title,
    },
  }
})

const TournamentsPage: PageWithLayoutType = () => {
  return (
    <MainLayout footer>
      <DetailContainer />
    </MainLayout>
  )
}

export default storeWrapper.withRedux(TournamentsPage)
