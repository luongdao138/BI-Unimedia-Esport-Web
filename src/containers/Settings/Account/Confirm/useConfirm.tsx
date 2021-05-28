import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import authStore from '@store/auth'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = userProfile
const { selectors } = authStore
const getChangeEmailConfirmMeta = createMetaSelector(actions.changeEmailConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmailConfirm = (confirmationCode: string) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const resetMeta = () => dispatch(clearMetaData(actions.changeEmailConfirm.typePrefix))
  const meta = useAppSelector(getChangeEmailConfirmMeta)
  const changeEmailConfirm = (params: services.ChangeEmailConfirmParams) => {
    dispatch(actions.changeEmailConfirm(params))
  }
  useEffect(() => {
    if (meta.loaded) {
      router.push(ESRoutes.USER_ACCOUNT_SETTINGS)
    }
  }, [meta.loaded])

  useEffect(() => {
    if (confirmationCode && !!meta.error) {
      resetMeta()
    }
  }, [confirmationCode])

  return { changeEmailConfirm, meta, user }
}

export default useChangeEmailConfirm
