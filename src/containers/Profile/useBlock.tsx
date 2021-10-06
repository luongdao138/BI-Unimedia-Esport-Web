import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import blockStore from '@store/block'
import { BlockParams } from '@services/block.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = blockStore
const getBlockMeta = createMetaSelector(actions.blockUser)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useBlock = (): { blockMeta: Meta; blockUser: (params: BlockParams) => void } => {
  const dispatch = useAppDispatch()
  const blockMeta = useAppSelector(getBlockMeta)
  const blockUser = (param: BlockParams) => dispatch(actions.blockUser(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.blockUser.typePrefix))
    }
  }, [])
  useEffect(() => {
    if (blockMeta.loaded) {
      dispatch(clearMetaData(actions.blockUser.typePrefix))
    }
  }, [blockMeta.loaded])
  return {
    blockMeta,
    blockUser,
  }
}

export default useBlock
