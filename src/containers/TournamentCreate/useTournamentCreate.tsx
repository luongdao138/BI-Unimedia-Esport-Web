import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import tournamentStore from '@store/tournament'
import { TournamentFormParams } from '@services/tournament.service'

const { actions } = tournamentStore
const getTournamentMeta = createMetaSelector(actions.createTournament)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentCreate = () => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.createTournament.typePrefix))
  const submit = (params: TournamentFormParams) => dispatch(actions.createTournament(params))

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
    }
  }, [meta.loaded])

  return { submit, meta }
}

export default useTournamentCreate
