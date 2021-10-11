import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import * as actions from '@store/game/actions'
import { CreateGameTitleParams, GameTitle } from '@services/game.service'
import { Meta } from '@store/metadata/actions/types'
import { useEffect } from 'react'
import { clearMetaData } from '@store/metadata/actions'
import * as selectors from '@store/game/selectors'

const getMeta = createMetaSelector(actions.createGameTitle)
const useAddGame = (): { meta: Meta; createGame: (params: CreateGameTitleParams) => void; createdGame: GameTitle['attributes'] } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const createdGame = useAppSelector(selectors.getCreatedGame)
  const createGame = (params: CreateGameTitleParams) => dispatch(actions.createGameTitle(params))
  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.createGameTitle.typePrefix))
    }
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      dispatch(clearMetaData(actions.createGameTitle.typePrefix))
    }
  }, [meta.loaded])
  return {
    meta,
    createGame,
    createdGame,
  }
}

export default useAddGame
