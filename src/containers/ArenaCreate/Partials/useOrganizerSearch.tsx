import { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import * as selectors from '@store/tournament/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import { RecommendedUsers } from '@services/tournament.service'

const getMeta = createMetaSelector(actions.getRecommendedUsersByName)

const useOrganizerSearch = (): {
  meta: Meta
  getRecommendedUsersByName: (keyword: string) => void
  recommendedUsers: RecommendedUsers[]
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const recommendedUsers = useAppSelector(selectors.getRecommendedUsers)

  const getRecommendedUsersByName = useCallback(
    _.debounce((keyword: string) => {
      if (keyword !== '') {
        dispatch(actions.getRecommendedUsersByName({ keyword, page: 1 }))
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
  }
}

export default useOrganizerSearch
