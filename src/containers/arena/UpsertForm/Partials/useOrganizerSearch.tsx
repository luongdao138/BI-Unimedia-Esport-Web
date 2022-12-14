import { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import * as selectors from '@store/arena/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import { RecommendedUsers, PageMeta } from '@services/arena.service'

const getMeta = createMetaSelector(actions.getRecommendedUsersByName)

const useOrganizerSearch = (): {
  meta: Meta
  getRecommendedUsersByName: (keyword: string, page: number) => void
  recommendedUsers: RecommendedUsers[]
  page: PageMeta
  clearRecommendedUsers: () => void
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const page = useAppSelector(selectors.getRecommendedUsersMeta)
  const recommendedUsers = useAppSelector(selectors.getRecommendedUsers)

  const getRecommendedUsersByName = useCallback(
    _.debounce((keyword: string, page: number) => {
      dispatch(actions.getRecommendedUsersByName({ keyword, page: page }))
    }, 500),
    []
  )
  const clearRecommendedUsers = () => {
    dispatch(clearMetaData(actions.getRecommendedUsersByName.typePrefix))
    dispatch(actions.clearRecommendedUsers())
  }

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getRecommendedUsersByName.typePrefix))
    }
  }, [])

  return {
    meta,
    getRecommendedUsersByName,
    recommendedUsers,
    page,
    clearRecommendedUsers,
  }
}

export default useOrganizerSearch
