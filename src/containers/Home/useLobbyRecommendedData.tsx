import { RecommendedLobbiesParams } from '@services/lobby.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import lobbyStore from '@store/lobby'
import { clearMetaData } from '@store/metadata/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useEffect } from 'react'

const { selectors, actions } = lobbyStore
const _getRecommendedLobbiesMeta = createMetaSelector(actions.getRecommendedLobbies)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLobbyRecommendedData = () => {
  const dispatch = useAppDispatch()
  const lobbies = useAppSelector(selectors.getRecommendedLobbies)
  const page = useAppSelector(selectors.getRecommendedLobbiesPageMeta)
  const meta = useAppSelector(_getRecommendedLobbiesMeta)
  const getRecommendedLobbies = (params: RecommendedLobbiesParams) => dispatch(actions.getRecommendedLobbies(params))
  const reset = () => {
    dispatch(actions.clearLobbyRecommended())
    dispatch(clearMetaData(actions.getRecommendedLobbies.typePrefix))
  }

  useEffect(() => {
    getRecommendedLobbies({ page: 1 })
    return () => reset()
  }, [])

  const loadMore = () => {
    if (page && page.current_page < page.total_pages) {
      getRecommendedLobbies({ page: page.current_page + 1 })
    }
  }

  return {
    lobbies,
    page,
    meta,
    getRecommendedLobbies,
    loadMore,
  }
}

export default useLobbyRecommendedData
