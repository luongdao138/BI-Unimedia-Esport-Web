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
    handleClose && handleClose()
    router.push(ESRoutes.TOP)
    dispatch(actions.logout())
    dispatch(searchStore.actions.setSearchParams({ keyword: '', type: 1 }))
    dispatch(arenaStore.actions.clearTournamentResult())
    dispatch(arenaStore.actions.clearRecommendedUsers())
  }

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
    }
  }, [meta.loaded])

  return { handleLogout, meta }
}

export default useLogout
