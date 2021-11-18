import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/lobby/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { clearMetaData } from '@store/metadata/actions'

const getMeta = createMetaSelector(actions.cancelLobby)

const useCancelDialog = (): {
  meta: Meta
  cancelLobby: (hashKey: string) => void
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const router = useRouter()

  const resetCancelMeta = () => dispatch(clearMetaData(actions.cancelLobby.typePrefix))

  const cancelLobby = async (hashKey: string) => {
    const cancelAction = await dispatch(actions.cancelLobby(hashKey))
    if (actions.cancelLobby.fulfilled.match(cancelAction)) {
      resetCancelMeta()
      router.push(`${ESRoutes.LOBBY}/${hashKey}`)
      dispatch(actions.getLobbyDetail(String(hashKey)))
    }
  }

  return {
    meta,
    cancelLobby,
  }
}

export default useCancelDialog
