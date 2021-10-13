import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import { MatchesContainer } from '@containers/arena'
import { storeWrapper, AppDispatch } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { ESRoutes } from '@constants/route.constants'

export const getServerSideProps = storeWrapper.getServerSideProps(async ({ store, params }) => {
  const { dispatch }: { dispatch: AppDispatch } = store
  await dispatch(actions.getTournamentDetail(String(params.hash_key)))
  const arena = selectors.getTournamentDetail(store.getState())
  if (TournamentHelper.isBattleRoyale(arena.attributes?.rule)) {
    return {
      redirect: {
        destination: ESRoutes.ARENA_BATTLES.replace(/:id/gi, String(params.hash_key)),
        permanent: false,
      },
    }
  }
  const title = `${i18n.t('common:page_head.arena_matches_title')}｜${arena?.attributes?.title || ''}`

  return {
    props: {
      title,
    },
  }
})

const ArenaMatchesPage: PageWithLayoutType = () => {
  return (
    <PlainLayout patternBg={true}>
      <MatchesContainer />
    </PlainLayout>
  )
}

export default ArenaMatchesPage
