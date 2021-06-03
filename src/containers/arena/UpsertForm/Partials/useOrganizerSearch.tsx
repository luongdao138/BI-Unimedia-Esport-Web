import { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import * as selectors from '@store/tournament/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import { RecommendedUsers, Meta as RecommendedMeta } from '@services/tournament.service'

const getMeta = createMetaSelector(actions.getRecommendedUsersByName)

const useOrganizerSearch = (): {
  meta: Meta
  getRecommendedUsersByName: (keyword: string, page: number) => void
  recommendedUsers: RecommendedUsers[]
  page: RecommendedMeta
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const page = useAppSelector(selectors.getRecommendedUsersMeta)
  const recommendedUsers = useAppSelector(selectors.getRecommendedUsers)

  const getRecommendedUsersByName = useCallback(
    _.debounce((keyword: string, page: number) => {
      if (keyword !== '') {
        dispatch(actions.getRecommendedUsersByName({ keyword, page: page }))
      } else {
        dispatch(actions.clearRecommendedUsers())
      }
    }, 500),
    []
  )

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
  }
}

export default useOrganizerSearch
