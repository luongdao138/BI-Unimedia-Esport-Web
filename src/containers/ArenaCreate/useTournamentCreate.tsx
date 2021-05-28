import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import tournamentStore from '@store/tournament'
import { TournamentDetail, TournamentFormParams } from '@services/tournament.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Meta } from '@store/metadata/actions/types'

const { actions, selectors } = tournamentStore
const getTournamentMeta = createMetaSelector(actions.createTournament)

const useTournamentCreate = (): { submit(params: TournamentFormParams): void; meta: Meta; isEdit: boolean; arena: TournamentDetail } => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const [isEdit, setIsEdit] = useState(false)
  const resetMeta = () => dispatch(clearMetaData(actions.createTournament.typePrefix))
  const submit = (params: TournamentFormParams) => dispatch(actions.createTournament(params))

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
      router.push(ESRoutes.ARENA)
    }
  }, [meta.loaded])

  useEffect(() => {
    if (router.pathname === '/arena/[hash_key]/edit' && router.query.hash_key) {
      setIsEdit(true)
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router])

  return { submit, meta, isEdit, arena }
}

export default useTournamentCreate
