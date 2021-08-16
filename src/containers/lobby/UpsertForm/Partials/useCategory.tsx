import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/lobby/actions'
import * as selectors from '@store/lobby/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'
import { CategoryItem } from '@services/lobby.service'

const getMeta = createMetaSelector(actions.getLobbyCategories)

const useCategory = (): { getLobbyCategories: () => void; meta: Meta; categories: CategoryItem['attributes'][] } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)

  const categories = useAppSelector(selectors.getLobbyCategories)

  // const clearGames = () => dispatch(actions.clearGameTitles())

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getLobbyCategories.typePrefix))
    }
  }, [])

  const getLobbyCategories = () => dispatch(actions.getLobbyCategories())

  return {
    meta,
    getLobbyCategories,
    categories,
  }
}

export default useCategory
