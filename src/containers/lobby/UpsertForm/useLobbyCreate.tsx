import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import lobbyStore from '@store/lobby'
import { LobbyDetail, UpdateParams } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Meta } from '@store/metadata/actions/types'
import { LOBBY_STATUS } from '@constants/lobby.constants'
import _ from 'lodash'
import useLobbyHelper from '../hooks/useLobbyHelper'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { LobbyUpsertParams } from '@services/lobby.service'

const { actions, selectors } = lobbyStore
const getTournamentMeta = createMetaSelector(actions.createLobby)
const getUpdateMeta = createMetaSelector(actions.updateLobby)

export type EditableTypes = {
  title: boolean
  overview: boolean
  notes: boolean
  rule: boolean
  max_participants: boolean
  organizer_participated: boolean
  start_datetime: boolean
  end_date: boolean
  entry_start_datetime: boolean
  entry_end_datetime: boolean
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
  categories: boolean
}

const useLobbyCreate = (): {
  submit(params: LobbyUpsertParams): void
  update(params: UpdateParams): void
  meta: Meta
  updateMeta: Meta
  isEdit: boolean
  lobby: LobbyDetail
  editables: EditableTypes
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const updateMeta = useAppSelector(getUpdateMeta)
  const lobby = useAppSelector(selectors.getLobbyDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    cover_image: true,
    title: true,
    overview: true,
    prize: true, // has_prize, prize_amount
    organizer_participated: true,
    game_hardware: true,
    terms_of_participation: true,
    t_type: true,
    notes: true,
    area_id: true,
    address: true,
    co_organizers: true,
    organizer_name: true,
    categories: true,
    // always not editable
    rule: true, // rule, has_third_place
    participant_type: true,
    game_title: true,
    // conditional editable
    max_participants: true,
    retain_history: true,
    start_datetime: true,
    end_date: true,
    entry_start_datetime: true,
    entry_end_datetime: true,
  })
  const { isEditable } = useLobbyHelper(lobby)
  const resetMeta = () => dispatch(clearMetaData(actions.createLobby.typePrefix))
  const resetUpdateMeta = () => dispatch(clearMetaData(actions.updateLobby.typePrefix))
  const submit = async (params: LobbyUpsertParams) => {
    const resultAction = await dispatch(actions.createLobby(params))
    if (actions.createLobby.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.LOBBY}/${resultAction.payload.hash_key}`)

      dispatch(commonActions.addToast(t('common:arena.create_success')))
    }
  }
  const update = async (params: UpdateParams) => {
    const resultAction = await dispatch(actions.updateLobby(params))
    if (actions.updateLobby.fulfilled.match(resultAction)) {
      resetUpdateMeta()
      router.push(`${ESRoutes.ARENA}/${resultAction.meta.arg.hash_key}`)
      dispatch(actions.getLobbyDetail(String(resultAction.meta.arg.hash_key)))
      dispatch(commonActions.addToast(t('common:arena.update_success')))
    }
  }

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      setIsEdit(true)
      dispatch(actions.getLobbyDetail(router.query.hash_key))
    }
  }, [router])

  useEffect(() => {
    if (lobby && router.asPath.endsWith('/edit') && router.query.hash_key) {
      if (!isEditable) {
        router.push(ESRoutes.LOBBY_DETAIL.replace(/:id/gi, String(router.query.hash_key)))
        return
      }

      const _status = lobby.attributes.status

      let _editables = { ...editables }
      // always not editable
      _editables.rule = false // rule, has_third_place
      _editables.participant_type = false
      _editables.game_title = false

      if (_status !== LOBBY_STATUS.READY) {
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
        if (_status === LOBBY_STATUS.RECRUITING) {
          _editables.max_participants = true
          _editables.retain_history = true
          _editables.entry_start_datetime = false
          _editables.entry_end_datetime = true
          _editables.start_datetime = true
          _editables.end_date = true
        } else if (_status === LOBBY_STATUS.ENTRY_CLOSED) {
          // max_participants, retain_history,
          // acceptance_start_date, acceptance_end_date are already false on top
          _editables.start_datetime = true
          _editables.end_date = true
        } else if (_status === LOBBY_STATUS.IN_PROGRESS) {
          // max_participants, retain_history,
          // acceptance_start_date, acceptance_end_date are already false on top
          _editables.start_datetime = false
          _editables.end_date = true
        }
      }
      setEditables(_editables)
    }
  }, [lobby, router])

  return { submit, update, updateMeta, meta, isEdit, lobby, editables }
}

export default useLobbyCreate
