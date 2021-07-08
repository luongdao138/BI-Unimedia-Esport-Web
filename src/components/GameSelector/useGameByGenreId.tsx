import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/game/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getGameByGenreId)

const useGameGenre = (): { meta: Meta; getGameByGenreId: (id: number) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getGameByGenreId.typePrefix))
    }
  }, [])
  const getGameByGenreId = (id: number) => dispatch(actions.getGameByGenreId(id))
  return {
    meta,
    getGameByGenreId,
  }
}

export default useGameGenre
