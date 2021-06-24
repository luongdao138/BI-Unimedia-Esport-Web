import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/chat'
import { GetFriendsParam } from '@services/chat.service'
import { Meta } from '@store/metadata/actions/types'
import { PageMeta } from '@store/chat/actions/types'
import { members as chatmembers } from '@store/socket/selectors'
import { currentUserId as id } from '@store/auth/selectors'
import { socketActions } from '@store/socket/actions'
import { addToast } from '@store/common/actions'
import i18n from '@locales/i18n'

const { selectors, actions } = store
const getMeta = createMetaSelector(actions.getFriendList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useMemberAdd = () => {
  const dispatch = useAppDispatch()
  const friends = useAppSelector(selectors.friendList)
  const roomMembers = useAppSelector(chatmembers)
  const page: PageMeta = useAppSelector(selectors.friendListMeta)
  const currentUserId = useAppSelector(id)
  const meta: Meta = useAppSelector(getMeta)
  const getFriends = (param: GetFriendsParam) => dispatch(actions.getFriendList(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getFriendList.typePrefix))
  const socketSend = (param: any) => {
    dispatch(socketActions.socketSend(param))
    dispatch(addToast(i18n.t('common:chat.member_add_toast')))
  }
  const cleanFriendsData = () => dispatch(actions.resetAddUsers())
  return { friends, getFriends, resetMeta, meta, page, roomMembers, currentUserId, socketSend, cleanFriendsData }
}

export default useMemberAdd
