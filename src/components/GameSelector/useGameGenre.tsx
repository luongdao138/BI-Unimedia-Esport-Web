import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/game/selectors'
import * as actions from '@store/game/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { GameGenre } from '@services/game.service'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getGameGenres)

const useGameGenre = (): { genres: GameGenre[]; meta: Meta } => {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectors.getGameGenres)
  const meta = useAppSelector(getMeta)
  useEffect(() => {
    dispatch(actions.getGameGenres())
  }, [])
  useEffect(() => {
    if (meta.loaded) {
      dispatch(clearMetaData(actions.getGameGenres.typePrefix))
    }
  }, [meta])
  return {
    genres,
    meta,
  }
}

export default useGameGenre
