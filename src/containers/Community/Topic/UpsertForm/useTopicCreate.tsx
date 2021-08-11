import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import lobbyStore from '@store/lobby'
import { LobbyDetail } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'
import _ from 'lodash'
import useTopicHelper from '../hooks/useTopicHelper'

const { actions, selectors } = lobbyStore
// TODO change when data is ready
export type EditableTypes = {
  title: boolean
  overview: boolean
  area_id: boolean
  address: boolean
  participation_approval: boolean
  t_type: boolean
  game_title: boolean
  tag_title: boolean
  cover_image: boolean
}

const useTopicCreate = (): {
  isEdit: boolean
  lobby: LobbyDetail
  editables: EditableTypes
} => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const lobby = useAppSelector(selectors.getLobbyDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    cover_image: true,
    title: true,
    overview: true,
    participation_approval: true,
    t_type: true,
    area_id: true,
    address: true,
    // always not editable
    game_title: true,
    tag_title: true,
  })
  const { isEditable } = useTopicHelper(lobby)

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
      _editables.game_title = false

      if (_status !== TOURNAMENT_STATUS.READY) {
        _editables = _.mapValues(_editables, () => false)

        // always editable (default for status COMPLETED)
        _editables.cover_image = true
        _editables.title = true
        _editables.overview = true
        _editables.participation_approval = true
        _editables.t_type = true
        _editables.area_id = true
        _editables.address = true
      }
      setEditables(_editables)
    }
  }, [lobby, router])

  return { isEdit, lobby, editables }
}

export default useTopicCreate
