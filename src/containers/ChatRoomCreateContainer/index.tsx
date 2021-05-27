import React, { useEffect } from 'react'
import _ from 'lodash'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { createMetaSelector } from '@store/metadata/selectors'
import { getFriendList } from '@store/chat/actions'
import { friendList } from '@store/chat/selectors'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { currentUserId } from '@store/auth/selectors'
import { members } from '@store/socket/selectors'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import TextMessage from '@components/Chat/elements/TextMessage'
import ESSelectInput from '@components/SelectInput'
import chatStore from '@store/chat'

const { actions } = chatStore

const _getFriendsMeta = createMetaSelector(actions.getFriendList)

const ChatRoomCreateContainer: React.FC = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const friends = useAppSelector(friendList)
  const getFriendsMeta = useAppSelector(_getFriendsMeta)
  const userId = useAppSelector(currentUserId)
  const users = useAppSelector(members)

  useEffect(() => {
    if (userId) {
      dispatch(getFriendList({ type: 'group' }))
    }
  }, [userId])

  const handlePress = (text: string) => {
    text
  }
  const handlePressActionButton = (type: number) => {
    type
  }

  const handleOnUserSelected = (selected) => {
    selected
  }
  const handleSearchInput = (text: string) => {
    dispatch(getFriendList({ type: 'group', keyword: text }))
  }

  return (
    <Box className={classes.room}>
      <Box className={classes.memberSelectContainer} px={2.5} py={1.5}>
        <Box>
          <Typography variant="h2">宛先</Typography>
        </Box>
        <ESSelectInput
          items={
            _.isArray(friends)
              ? friends.map((friend) => ({
                  id: parseInt(friend.id),
                  nickName: friend.attributes.nickname,
                  avatar: friend.attributes.avatar,
                  userCode: friend.attributes.user_code,
                }))
              : []
          }
          onItemsSelected={handleOnUserSelected}
          onSearchInput={handleSearchInput}
          loading={getFriendsMeta.pending}
        />
      </Box>

      <Box></Box>
      <Box className={classes.list}>
        <Box className={`${classes.content} scroll-bar`}>
          <Box style={{ padding: 10, marginBottom: 5, maxWidth: 'auto', background: '#555', display: 'block' }}>
            <TextMessage members={users} text={'welcome'} />
          </Box>
        </Box>
      </Box>
      <Box className={classes.input}>
        <MessageInputArea onPressSend={handlePress} users={users} onPressActionButton={handlePressActionButton} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  header: {
    padding: 24,
  },
  dropZone: {
    display: 'none',
  },
  loaderBox: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
  content: {
    flexDirection: 'column-reverse',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    overflowY: 'auto',
    padding: 20,
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      opacity: 1,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
      opacity: 1,
      visibility: 'visible',
    },
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#000',
  },
  list: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    minHeight: '1.25em',
    position: 'relative',
  },
  input: {
    padding: 9,
    position: 'relative',
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
    background: '#101010',
  },
  memberSelectContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    borderBottom: '1px solid #212121',
    alignItems: 'center',
    columnGap: 14,
  },
}))

export default ChatRoomCreateContainer
