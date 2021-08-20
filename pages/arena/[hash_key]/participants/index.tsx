import PlainLayout from '@layouts/BlankLayout'
import { storeWrapper, AppDispatch } from '@store/store'
import i18n from '@locales/i18n'

import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import Participants from '@containers/arena/Detail/Participants'
import { TournamentDetail } from '@services/arena.service'
import { NextPage } from 'next'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'

export const getServerSideProps = storeWrapper.getServerSideProps(
  async ({
    store,
    params,
  }): Promise<{
    props: { title: string; detail: TournamentDetail }
  }> => {
    const { dispatch }: { dispatch: AppDispatch } = store
    await dispatch(actions.getTournamentDetail(String(params.hash_key)))
    const arena = selectors.getTournamentDetail(store.getState())
    const title = `${i18n.t('common:page_head.arena_members_title')}｜${arena?.attributes?.title || ''}`
    return {
      props: {
        title,
        detail: arena,
      },
    }
  }
)

const ArenaMatchesPage: NextPage = () => {
  const { tournament } = useTournamentDetail()
  return (
    <PlainLayout>
      <Participants detail={tournament} />
    </PlainLayout>
  )
}

export default ArenaMatchesPage
