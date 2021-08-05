import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import lobbyStore from '@store/lobby'
import { LobbyFormParams, UpdateParams } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Meta } from '@store/metadata/actions/types'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'
import _ from 'lodash'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const { actions, selectors } = lobbyStore
const getTournamentMeta = createMetaSelector(actions.createTournament)
const getUpdateMeta = createMetaSelector(actions.updateTournament)

export type EditableTypes = {
  title: boolean
  overview: boolean
  notes: boolean
  rule: boolean
  max_participants: boolean
  is_organizer_joinable: boolean
  start_date: boolean
  end_date: boolean
  acceptance_start_date: boolean
  acceptance_end_date: boolean
  participant_type: boolean
  area_id: boolean
  address: boolean
  prize: boolean
  terms_of_participation: boolean
  organizer_name: boolean
  retain_history: boolean
  t_type: boolean
  game_title: boolean
  game_hardware: boolean
  co_organizers: boolean
  cover_image: boolean
}

const useLobbyCreate = (): {
  submit(params: LobbyFormParams): void
  update(params: UpdateParams): void
  meta: Meta
  updateMeta: Meta
  isEdit: boolean
  // arena: LobbyDetail
  editables: EditableTypes
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const updateMeta = useAppSelector(getUpdateMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    cover_image: true,
    title: true,
    overview: true,
    prize: true, // has_prize, prize_amount
    is_organizer_joinable: true,
    game_hardware: true,
    terms_of_participation: true,
    t_type: true,
    notes: true,
    area_id: true,
    address: true,
    co_organizers: true,
    organizer_name: true,
    // always not editable
    rule: true, // rule, has_third_place
    participant_type: true,
    game_title: true,
    // conditional editable
    max_participants: true,
    retain_history: true,
    start_date: true,
    end_date: true,
    acceptance_start_date: true,
    acceptance_end_date: true,
  })
  const resetMeta = () => dispatch(clearMetaData(actions.createTournament.typePrefix))
  const resetUpdateMeta = () => dispatch(clearMetaData(actions.updateTournament.typePrefix))
  const submit = async (params: LobbyFormParams) => {
    const resultAction = await dispatch(actions.createTournament(params))
    if (actions.createTournament.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.ARENA}/${resultAction.payload.hash_key}`)

      dispatch(commonActions.addToast(t('common:arena.create_success')))
    }
  }
  const update = async (params: UpdateParams) => {
    const resultAction = await dispatch(actions.updateTournament(params))
    if (actions.updateTournament.fulfilled.match(resultAction)) {
      resetUpdateMeta()
      router.push(`${ESRoutes.ARENA}/${resultAction.meta.arg.hash_key}`)
      dispatch(actions.getTournamentDetail(String(resultAction.meta.arg.hash_key)))
      dispatch(commonActions.addToast(t('common:arena.update_success')))
    }
  }

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      setIsEdit(true)
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router])

  useEffect(() => {
    if (arena && router.asPath.endsWith('/edit') && router.query.hash_key) {
      // if (!isEditable) {
      //   router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, String(router.query.hash_key)))
      //   return
      // }

      const _status = arena.attributes.status

      let _editables = { ...editables }
      // always not editable
      _editables.rule = false // rule, has_third_place
      _editables.participant_type = false
      _editables.game_title = false

      if (_status !== TOURNAMENT_STATUS.READY) {
        _editables = _.mapValues(_editables, () => false)

        // always editable (default for status COMPLETED)
        _editables.cover_image = true
        _editables.title = true
        _editables.overview = true
        _editables.prize = true // has_prize, prize_amount
        _editables.game_hardware = true
        _editables.terms_of_participation = true
        _editables.t_type = true
        _editables.notes = true
        _editables.area_id = true
        _editables.address = true
        _editables.co_organizers = true
        _editables.organizer_name = true

        // conditional editable
        if (_status === TOURNAMENT_STATUS.RECRUITING) {
          _editables.max_participants = true
          _editables.retain_history = true
          _editables.acceptance_start_date = false
          _editables.acceptance_end_date = true
          _editables.start_date = true
          _editables.end_date = true
        } else if (_status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || _status === TOURNAMENT_STATUS.READY_TO_START) {
          // max_participants, retain_history,
          // acceptance_start_date, acceptance_end_date are already false on top
          _editables.start_date = true
          _editables.end_date = true
        } else if (_status === TOURNAMENT_STATUS.IN_PROGRESS) {
          // max_participants, retain_history,
          // acceptance_start_date, acceptance_end_date are already false on top
          _editables.start_date = false
          _editables.end_date = true
        }
      }
      setEditables(_editables)
    }
  }, [arena, router])

  return { submit, update, updateMeta, meta, isEdit, editables }
}

export default useLobbyCreate
