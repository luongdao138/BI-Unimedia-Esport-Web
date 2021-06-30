import { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/game/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const getMeta = createMetaSelector(actions.getGameByTitle)

const useGameSearchByTitle = (): { meta: Meta; getGameByTitle: (keyword: string) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const getGameByTitle = useCallback(
    _.debounce((keyword: string) => {
      dispatch(actions.getGameByTitle(keyword))
    }, 500),
    []
  )
  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getGameByTitle.typePrefix))
    }
  }, [])
  return {
    meta,
    getGameByTitle,
  }
}

export default useGameSearchByTitle
