import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/chat/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import { singleUser, redirectDm } from '@store/chat/selectors'
import { DmUserData } from '@services/chat.service'

const _chatRoomMeta = createMetaSelector(actions.directRoomCheck)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDirectCheck = (): {
  checkRoom: (userCode: string) => void
  roomMeta: Meta
  resetRoomMeta: () => void
  singleUserData: DmUserData | null
  redirectRoomData: string | null
} => {
  const dispatch = useAppDispatch()
  const checkRoom = (userCode: string) => dispatch(actions.directRoomCheck(userCode))
  const roomMeta = useAppSelector(_chatRoomMeta)
  const singleUserData = useAppSelector(singleUser)
  const redirectRoomData = useAppSelector(redirectDm)
  const resetRoomMeta = () => dispatch(clearMetaData(actions.directRoomCheck.typePrefix))
  return { checkRoom, roomMeta, resetRoomMeta, singleUserData, redirectRoomData }
}

export default useDirectCheck
