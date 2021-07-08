import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import blockStore from '@store/block'
import { UnblockParams } from '@services/block.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = blockStore
const getUnblockMeta = createMetaSelector(actions.unblockUser)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUnblock = (): { unblockMeta: Meta; unblockUser: (params: UnblockParams) => void } => {
  const dispatch = useAppDispatch()
  const unblockMeta = useAppSelector(getUnblockMeta)
  const unblockUser = (param: UnblockParams) => dispatch(actions.unblockUser(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.unblockUser.typePrefix))
    }
  }, [])
  return {
    unblockMeta,
    unblockUser,
  }
}

export default useUnblock
