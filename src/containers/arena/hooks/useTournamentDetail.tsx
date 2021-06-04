import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'

import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { TournamentDetail } from '@services/arena.service'
import useGetProfile from '@utils/hooks/useGetProfile'
import { UserProfile } from '@services/user.service'

const getMeta = createMetaSelector(actions.getTournamentDetail)

const useTournamentDetail = (): {
  tournament: TournamentDetail
  meta: Meta
  handleBack: () => void
  userProfile: UserProfile
  getUserProfileMeta: Meta
} => {
  const { back, query } = useRouter()
  const dispatch = useAppDispatch()
  const tournament = useAppSelector(selectors.getTournamentDetail)
  const meta = useAppSelector(getMeta)
  const { userProfile, getUserProfileMeta } = useGetProfile()

  useEffect(() => {
    if (query.hash_key) {
      dispatch(actions.getTournamentDetail(String(query.hash_key)))
    }
  }, [query.hash_key])

  useEffect(() => {
    if (query.hash_key && tournament) {
      dispatch(actions.getEntryStatus(String(query.hash_key)))
    }
  }, [tournament])

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getTournamentDetail.typePrefix))
    }
  }, [])

  const handleBack = () => back()

  return {
    tournament,
    meta,
    handleBack,
    userProfile,
    getUserProfileMeta,
  }
}

export default useTournamentDetail
