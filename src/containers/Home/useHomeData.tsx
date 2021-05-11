import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserLoginParams } from '@services/auth.service'

const { selectors, actions } = authStore
const getLoginMeta = createMetaSelector(actions.loginByEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHomeData = () => {
  // const dispatch = useAppDispatch()
  // const user = useAppSelector(selectors.getAuth)
  // const meta = useAppSelector(getLoginMeta)
  // const loginByEmail = (param: UserLoginParams) => dispatch(actions.loginByEmail(param))
  // const resetMeta = () => dispatch(clearMetaData(actions.loginByEmail.typePrefix))
  // return { user, loginByEmail, resetMeta, meta }
}

export default useHomeData
