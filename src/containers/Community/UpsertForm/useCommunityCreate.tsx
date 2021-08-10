import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import lobbyStore from '@store/lobby'
import { LobbyDetail } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'
import _ from 'lodash'
import useCommunityHelper from '../hooks/useCommunityHelper'

const { actions, selectors } = lobbyStore

export type EditableTypes = {
  title: boolean
  overview: boolean
  notes: boolean
  rule: boolean
  max_participants: boolean
  is_organizer_join: boolean
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
  tag_title: boolean
  game_hardware: boolean
  co_organizers: boolean
  cover_image: boolean
}

const useCommunityCreate = (): {
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
    prize: true, // has_prize, prize_amount
    is_organizer_join: true,
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
    tag_title: true,
    // conditional editable
    max_participants: true,
    retain_history: true,
    start_date: true,
    end_date: true,
    acceptance_start_date: true,
    acceptance_end_date: true,
  })
  const { isEditable } = useCommunityHelper(lobby)

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
      }
      setEditables(_editables)
    }
  }, [lobby, router])

  return { isEdit, lobby, editables }
}

export default useCommunityCreate
