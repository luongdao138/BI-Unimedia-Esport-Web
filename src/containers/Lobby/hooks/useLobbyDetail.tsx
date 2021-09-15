import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'
import * as selectors from '@store/lobby/selectors'
import * as actions from '@store/lobby/actions'
import useGetProfile from '@utils/hooks/useGetProfile'
import { UserProfile } from '@services/user.service'
import { getIsAuthenticated } from '@store/auth/selectors'
import { LobbyDetail } from '@services/lobby.service'

const getMeta = createMetaSelector(actions.getLobbyDetail)

const useLobbyDetail = (): {
  lobby: LobbyDetail
  meta: Meta
  handleBack: () => void
  userProfile: UserProfile
  getUserProfileMeta: Meta
} => {
  const { back, query } = useRouter()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuthenticated)
  const lobby = useAppSelector(selectors.getLobbyDetail)
  const meta = useAppSelector(getMeta)
  const { userProfile, getUserProfileMeta } = useGetProfile()

  useEffect(() => {
    if (query.hash_key) {
      dispatch(actions.getDetailWithClear(String(query.hash_key)))
    }
  }, [query.hash_key, isAuth])

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getLobbyDetail.typePrefix))
    }
  }, [])

  const handleBack = () => back()

  return {
    lobby,
    meta,
    handleBack,
    userProfile,
    getUserProfileMeta,
  }
}

export default useLobbyDetail
