import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import lobbyStore from '@store/lobby'
import { LobbyDetail, LobbyFormParams } from '@services/lobby.service'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'
import * as commonActions from '@store/common/actions'
import _ from 'lodash'
import useTopicHelper from '../hooks/useTopicHelper'
import { useTranslation } from 'react-i18next'

const { actions, selectors } = lobbyStore
// TODO change when data is ready
export type EditableTypes = {
  title: boolean
  overview: boolean
  cover_image: boolean
}

const useTopicCreate = (): {
  isEdit: boolean
  lobby: LobbyDetail
  editables: EditableTypes
  submit(params: LobbyFormParams): void
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const lobby = useAppSelector(selectors.getLobbyDetail)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    cover_image: true,
    title: true,
    overview: true,
  })
  const { isEditable } = useTopicHelper(lobby)
  const resetMeta = () => dispatch(clearMetaData(actions.createLobby.typePrefix))

  const submit = async (/* params: LobbyFormParams */) => {
    // const resultAction = await dispatch(actions.createLobby(params))
    // if (actions.createLobby.fulfilled.match(resultAction)) {
    //   resetMeta()
    //   router.push(`${ESRoutes.COMMUNITY}/1/${ESRoutes.TOPIC}/1`)

    //   dispatch(commonActions.addToast(t('common:topic_create.create_success')))
    // }
    resetMeta()
    router.push(`${ESRoutes.COMMUNITY}/1${ESRoutes.TOPIC}/1`)

    dispatch(commonActions.addToast(t('common:topic_create.create_success')))
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
      // always not editabl

      if (_status !== TOURNAMENT_STATUS.READY) {
        _editables = _.mapValues(_editables, () => false)

        // always editable (default for status COMPLETED)
        _editables.cover_image = true
        _editables.title = true
        _editables.overview = true
      }
      setEditables(_editables)
    }
  }, [lobby, router])

  return { submit, isEdit, lobby, editables }
}

export default useTopicCreate
