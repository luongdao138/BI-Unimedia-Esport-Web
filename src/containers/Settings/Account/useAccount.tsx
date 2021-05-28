import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'

const { actions } = userProfile
const getChangePasswordMeta = createMetaSelector(actions.changePassword)
const getChangeConfirmMeta = createMetaSelector(actions.changeEmailConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAccount = () => {
  const dispatch = useAppDispatch()

  const metaChangePassword = useAppSelector(getChangePasswordMeta)
  const metaChangeEmailConfirm = useAppSelector(getChangeConfirmMeta)
  const changePasswordMeta = () => dispatch(clearMetaData(actions.changePassword.typePrefix))
  const changeEmailConfirmMeta = () => dispatch(clearMetaData(actions.changeEmailConfirm.typePrefix))

  return { metaChangePassword, changePasswordMeta, metaChangeEmailConfirm, changeEmailConfirmMeta }
}

export default useAccount
