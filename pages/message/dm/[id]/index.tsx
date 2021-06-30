import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, makeStyles } from '@material-ui/core'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'
import useDirectCheck from '@containers/ChatRoomCreateContainer/useDirectCheck'
import i18n from '@locales/i18n'
import Loader from '@components/Loader'

const DirectCreate: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  const { checkRoom, roomMeta, singleUserData, redirectRoomData, resetRoomMeta } = useDirectCheck()
  const singleUser = singleUserData
  const roomId = redirectRoomData

  const classes = useStyles()

  useEffect(() => {
    if (id) {
      resetRoomMeta()
      checkRoom(id as string)
    }
  }, [id])

  useEffect(() => {
    if (roomId && singleUser && roomMeta.loaded && !roomMeta.pending && !roomMeta.error) {
      router.push(`${ESRoutes.MESSAGE}${roomId}?active=true`)
    }
  }, [roomId])

  // Loader error msg refactor needed

  const renderLoader = () => {
    if (_.isEmpty(singleUser) && !roomMeta.loaded && roomMeta.pending && !roomMeta.error) {
      return (
        <Box display="flex" height={'100%'} justifyContent="center" alignItems="center">
          <Box className={classes.loaderBox}>
            <Loader />
          </Box>
        </Box>
      )
    }
    return null
  }

  const renderPermission = () => {
    if (singleUser === null && roomId === null && !roomMeta.pending && !roomMeta.error && roomMeta.loaded) {
      return (
        <Box display="flex" height={'100%'} justifyContent="center" alignItems="center">
          {i18n.t('common:chat.placeholder_dm')}
        </Box>
      )
    }
    return null
  }

  const renderEditContainer = () => {
    if (!_.isEmpty(singleUser) && roomMeta.loaded && !roomMeta.pending && !roomMeta.error) {
      return <ChatRoomCreateContainer dm={true} singleUser={singleUser} />
    }
    return null
  }

  const renderError = () => {
    if (roomMeta.loaded && roomMeta.pending && roomMeta.error && !singleUser && !roomId) {
      return (
        <Box display="flex" height={'100%'} justifyContent="center" alignItems="center">
          {i18n.t('common:chat.placeholder_dm')}
        </Box>
      )
    }
    return null
  }

  return (
    <>
      {renderLoader()}
      {renderEditContainer()}
      {renderError()}
      {renderPermission()}
    </>
  )
}

DirectCreate.Layout = MessageLayout

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: 0,
  },
  loaderBox: {
    width: 20,
    height: 20,
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
}))

export default DirectCreate
