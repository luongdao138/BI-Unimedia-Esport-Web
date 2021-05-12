import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import * as actions from '@store/game/actions'
import { CreateGameTitleParams } from '@services/game.service'
import { Meta } from '@store/metadata/actions/types'
import { useEffect } from 'react'
import { clearMetaData } from '@store/metadata/actions'

const getMeta = createMetaSelector(actions.createGameTitle)
const useAddGame = (): { meta: Meta; createGame: (params: CreateGameTitleParams) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const createGame = (params: CreateGameTitleParams) => dispatch(actions.createGameTitle(params))
  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.createGameTitle.typePrefix))
    }
  }, [])
  return {
    meta,
    createGame,
  }
}

export default useAddGame
