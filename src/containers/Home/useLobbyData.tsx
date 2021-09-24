import { RecentLobbiesParams } from '@services/lobby.service'
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
  const getRecentLobbies = (params: RecentLobbiesParams) => dispatch(actions.getRecentLobbies(params))
  const reset = () => {
    dispatch(actions.clearLobbyResult())
    dispatch(clearMetaData(actions.getRecentLobbies.typePrefix))
  }

  useEffect(() => {
    getRecentLobbies({ page: 1 })
    return () => reset()
  }, [])

  const loadMore = () => {
    if (recentLobbiesPageMeta && recentLobbiesPageMeta.current_page < recentLobbiesPageMeta.total_pages) {
      getRecentLobbies({ page: recentLobbiesPageMeta.current_page + 1 })
    }
  }

  return {
    recentLobbies,
    recentLobbiesPageMeta,
    getRecentLobbiesMeta,
    getRecentLobbies,
    loadMore,
  }
}

export default useLobbyData
