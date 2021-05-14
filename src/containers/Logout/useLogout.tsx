import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'

const { actions } = authStore
const getLogoutMeta = createMetaSelector(actions.logout)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLogout = (handleClose) => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getLogoutMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.logout.typePrefix))
  const handleLogout = () => dispatch(actions.logout())

  useEffect(() => {
    if (meta.loaded) {
      handleClose()
      resetMeta()
    }
  }, [meta.loaded])

  return { handleLogout, meta }
}

export default useLogout
