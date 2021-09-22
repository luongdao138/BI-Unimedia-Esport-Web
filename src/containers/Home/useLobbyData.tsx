import { useAppDispatch, useAppSelector } from '@store/hooks'
import lobbyStore from '@store/lobby'
import { clearMetaData } from '@store/metadata/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useEffect } from 'react'

const { selectors, actions } = lobbyStore
const _getRecentLobbiesMeta = createMetaSelector(actions.getRecentLobbies)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLobbyData = () => {
  const dispatch = useAppDispatch()

  const recentLobbies = useAppSelector(selectors.getRecentLobbies)
  const recentLobbiesPageMeta = useAppSelector(selectors.getRecentLobbiesPageMeta)
  const getRecentLobbiesMeta = useAppSelector(_getRecentLobbiesMeta)
  const getRecentLobbies = () => dispatch(actions.getRecentLobbies({ page: 1 }))
  const reset = () => {
    dispatch(actions.clearLobbyResult())
    dispatch(clearMetaData(actions.searchLobby.typePrefix))
  }

  useEffect(() => {
    getRecentLobbies()
    return () => reset()
  }, [])

  return {
    recentLobbies,
    recentLobbiesPageMeta,
    getRecentLobbiesMeta,
    getRecentLobbies,
  }
}

export default useLobbyData
