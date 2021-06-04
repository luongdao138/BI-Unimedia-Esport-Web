import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import tournamentStore from '@store/arena'
import { TournamentDetail, TournamentFormParams, UpdateParams } from '@services/arena.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Meta } from '@store/metadata/actions/types'
import { TOURNAMENT_STATUS } from '@constants/tournament.constants'
import _ from 'lodash'
import useArenaHelper from '../hooks/useArenaHelper'

const { actions, selectors } = tournamentStore
const getTournamentMeta = createMetaSelector(actions.createTournament)
const getUpdateMeta = createMetaSelector(actions.updateTournament)

export type EditableTypes = {
  title: boolean
  overview: boolean
  notes: boolean
  rule: boolean
  max_participants: boolean
  start_date: boolean
  end_date: boolean
  acceptance_start_date: boolean
  acceptance_end_date: boolean
  participant_type: boolean
  area_id: boolean
  area_name: boolean
  address: boolean
  has_prize: boolean
  prize_amount: boolean
  terms_of_participation: boolean
  organizer_name: boolean
  has_third_place: boolean
  retain_history: boolean
  t_type: boolean
  game_title: boolean
  game_hardware: boolean
  co_organizers: boolean
  cover_image: boolean
}

const useTournamentCreate = (): {
  submit(params: TournamentFormParams): void
  update(params: UpdateParams): void
  meta: Meta
  updateMeta: Meta
  isEdit: boolean
  arena: TournamentDetail
  editables: EditableTypes
} => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const updateMeta = useAppSelector(getUpdateMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    title: true,
    overview: true,
    notes: true,
    rule: true,
    max_participants: true,
    start_date: true,
    end_date: true,
    acceptance_start_date: true,
    acceptance_end_date: true,
    participant_type: true,
    area_id: true,
    area_name: true,
    address: true,
    has_prize: true,
    prize_amount: true,
    terms_of_participation: true,
    organizer_name: true,
    has_third_place: true,
    retain_history: true,
    t_type: true,
    game_title: true,
    game_hardware: true,
    co_organizers: true,
    cover_image: true,
  })
  const { isEditable } = useArenaHelper(arena)
  const resetMeta = () => dispatch(clearMetaData(actions.createTournament.typePrefix))
  const resetUpdateMeta = () => dispatch(clearMetaData(actions.updateTournament.typePrefix))
  const submit = (params: TournamentFormParams) => dispatch(actions.createTournament(params))
  const update = (params: UpdateParams) => dispatch(actions.updateTournament(params))

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
      router.push(ESRoutes.ARENA)
    }
  }, [meta.loaded])

  useEffect(() => {
    if (updateMeta.loaded) {
      resetUpdateMeta()
      router.push(ESRoutes.ARENA)
    }
  }, [updateMeta.loaded])

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      setIsEdit(true)
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router])

  useEffect(() => {
    if (arena) {
      const _status = arena.attributes.status
      if (!isEditable) {
        router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, String(router.query.hash_key)))
      }

      let _editables = { ...editables }

      if (_status !== TOURNAMENT_STATUS.READY) {
        _editables = _.mapValues(_editables, () => false)

        _editables.notes = true
        _editables.co_organizers = true
        _editables.t_type = true
        if (_status === TOURNAMENT_STATUS.RECRUITING) {
          _editables.acceptance_end_date = true
          _editables.start_date = true
          _editables.end_date = true
          _editables.max_participants = true
        } else if (_status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || _status === TOURNAMENT_STATUS.READY_TO_START) {
          _editables.start_date = true
          _editables.end_date = true
        }
      }
      setEditables(_editables)
    }
  }, [arena])

  return { submit, update, updateMeta, meta, isEdit, arena, editables }
}

export default useTournamentCreate
