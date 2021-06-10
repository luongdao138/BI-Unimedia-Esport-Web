import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'

const { actions } = authStore
const getResetPasswordMeta = createMetaSelector(actions.resetPassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLoginByEmail = () => {
  const dispatch = useAppDispatch()
  const metaReset = useAppSelector(getResetPasswordMeta)
  const resetPasswordMeta = () => dispatch(clearMetaData(actions.resetPassword.typePrefix))

  return { metaReset, resetPasswordMeta }
}

export default useLoginByEmail
