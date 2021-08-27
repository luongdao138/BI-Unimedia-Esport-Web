import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import lobbyStore from '@store/lobby'
import { LobbyDetail, UpdateParams } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Meta } from '@store/metadata/actions/types'
import useLobbyHelper from '../hooks/useLobbyHelper'
import { LobbyUpsertParams } from '@services/lobby.service'
import { LOBBY_STATUS } from '@constants/lobby.constants'
import _ from 'lodash'

const { actions, selectors } = lobbyStore
const getTournamentMeta = createMetaSelector(actions.createLobby)
const getUpdateMeta = createMetaSelector(actions.updateLobby)

export type EditableTypes = {
  title: boolean
  message: boolean
  game_title: boolean
  game_hardware: boolean
  categories: boolean
  max_participants: boolean
  entry_start_datetime: boolean
  entry_end_datetime: boolean
  start_datetime: boolean
  area: boolean
  address: boolean
  organizer_participated: boolean
  cover_image_url: boolean
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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getTournamentMeta)
  const updateMeta = useAppSelector(getUpdateMeta)
  const lobby = useAppSelector(selectors.getLobbyDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    title: true,
    message: true,
    game_title: true,
    game_hardware: true,
    categories: true,
    max_participants: true,
    entry_start_datetime: true,
    entry_end_datetime: true,
    start_datetime: true,
    area: true,
    address: true,
    organizer_participated: true,
    cover_image_url: true,
  })

  const { isEditable } = useLobbyHelper(lobby)
  const resetMeta = () => dispatch(clearMetaData(actions.createLobby.typePrefix))
  const resetUpdateMeta = () => dispatch(clearMetaData(actions.updateLobby.typePrefix))
  const submit = async (params: LobbyUpsertParams) => {
    const resultAction = await dispatch(actions.createLobby(params))
    if (actions.createLobby.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.LOBBY}/${resultAction.payload.hash_key}`)
    }
  }
  const update = async (params: UpdateParams) => {
    const resultAction = await dispatch(actions.updateLobby(params))
    if (actions.updateLobby.fulfilled.match(resultAction)) {
      resetUpdateMeta()
      router.push(`${ESRoutes.LOBBY}/${resultAction.meta.arg.hash_key}`)
      dispatch(actions.getLobbyDetail(String(resultAction.meta.arg.hash_key)))
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
      _editables = _.mapValues(_editables, () => false)

      if (_status === LOBBY_STATUS.READY) {
        // 受付前
        _editables.title = true
        _editables.game_hardware = true
        _editables.max_participants = true
        _editables.organizer_participated = true
        _editables.cover_image_url = true
        _editables.entry_start_datetime = true
        _editables.area = true
        _editables.address = true
        _editables.categories = true
        _editables.message = true
      } else if (_status === LOBBY_STATUS.RECRUITING) {
        // 受付中
        _editables.title = true
        _editables.game_hardware = true
        _editables.max_participants = true
        _editables.organizer_participated = true
        _editables.cover_image_url = true
        _editables.entry_start_datetime = true
        _editables.entry_end_datetime = true
        _editables.area = true
        _editables.address = true
        _editables.categories = true
        _editables.message = true
      } else if (_status === LOBBY_STATUS.ENTRY_CLOSED) {
        // 受付締め切り
        _editables.title = true
        _editables.game_hardware = true
        _editables.cover_image_url = true
        _editables.entry_start_datetime = true
        _editables.entry_end_datetime = true
        _editables.start_datetime = true
        _editables.area = true
        _editables.address = true
        _editables.categories = true
        _editables.message = true
      } else if (_status === LOBBY_STATUS.IN_PROGRESS) {
        // 本日実施
        _editables.title = true
        _editables.game_hardware = true
        _editables.cover_image_url = true
        _editables.area = true
        _editables.address = true
        _editables.categories = true
        _editables.message = true
      } else if (_status === LOBBY_STATUS.ENDED) {
        // 終了
        _editables.title = true
        _editables.game_hardware = true
        _editables.cover_image_url = true
        _editables.area = true
        _editables.address = true
        _editables.categories = true
        _editables.message = true
      }

      setEditables(_editables)
    }
  }, [lobby, router])

  return { submit, update, updateMeta, meta, isEdit, lobby, editables }
}

export default useLobbyCreate
