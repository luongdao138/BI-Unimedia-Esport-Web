import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/game/selectors'
import * as actions from '@store/game/actions'
import { GameTitle } from '@services/game.service'

const useGameTitles = (): { games: GameTitle['attributes'][]; clearGames: () => void } => {
  const dispatch = useAppDispatch()
  const games = useAppSelector(selectors.getGames)

  const clearGames = () => dispatch(actions.clearGameTitles())

  return {
    clearGames,
    games,
  }
}

export default useGameTitles
