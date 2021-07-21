import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import searchStore from '@store/search'
import arenaStore from '@store/arena'

const { actions } = authStore
const getLogoutMeta = createMetaSelector(actions.logout)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLogout = (handleClose?: () => void) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getLogoutMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.logout.typePrefix))
  const handleLogout = () => {
    dispatch(actions.logout())
    dispatch(searchStore.actions.setSearchParams({ keyword: '', type: 0 }))
    dispatch(searchStore.actions.resetSearchUsers())
    dispatch(arenaStore.actions.resetSearchTournaments())
  }

  useEffect(() => {
    if (meta.loaded) {
      handleClose && handleClose()
      resetMeta()
      router.push(ESRoutes.TOP)
    }
  }, [meta.loaded])

  return { handleLogout, meta }
}

export default useLogout
