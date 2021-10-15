import { useState } from 'react'
import useLobbyDetail from '../hooks/useLobbyDetail'
import LobbyStatusHeader from '@components/LobbyStatusHeader'
import DetailInfo from '@containers/Lobby/Detail/Partials/DetailInfo'
import ESLoader from '@components/FullScreenLoader'
import useLobbyHelper from '../hooks/useLobbyHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
import MainDatePeriod from '../MainDatePeriod'
import SubStatusInfo from '../SubStatusInfo'
import SubActionButtons from '@containers/Lobby/SubActionButtons'
import MainActionButtons from '@containers/Lobby/MainActionButtons'
import useLobbyActions from '../hooks/useLobbyActions'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import HeaderBar from '@components/LobbyStatusHeader/HeaderBar'
import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import Participants from '@containers/Lobby/Participants'
import ConfirmParticipants from '../ConfirmParticipants'
import { useConfirm } from '@components/Confirm'
import { LOBBY_DIALOGS, LOBBY_STATUS } from '@constants/lobby.constants'

const LobbyDetailBody: React.FC = () => {
  const [openList, setList] = useState<boolean>(false)
  const [openConfirmList, setConfirmList] = useState<boolean>(false)
  const classes = useStyles()
  const { unjoin, entry, entryMeta, unjoinMeta } = useLobbyActions()
  const confirm = useConfirm()
  const { handleBack, lobby } = useLobbyDetail()
  const { status, title, cover_image_url } = _.get(lobby, 'attributes', { status: -1, title: '', cover_image_url: null })
  const isFreezed = _.get(lobby, 'attributes.is_freezed', false)
  const isOwner = _.get(lobby, 'attributes.is_owner', false)
  const isEditable = status !== LOBBY_STATUS.CANCELLED
  const isConfirmable =
    (status === LOBBY_STATUS.RECRUITING || status === LOBBY_STATUS.ENTRY_CLOSED || status === LOBBY_STATUS.IN_PROGRESS) &&
    isOwner &&
    !isFreezed

  const hashKey = _.get(lobby, 'attributes.hash_key', null)

  const { toEdit } = useLobbyHelper(lobby)
  const router = useRouter()

  const openChat = () => {
    const chatRoomId = _.get(lobby, 'attributes.chatroom_id', null)
    if (chatRoomId) router.push(ESRoutes.GROUP_CHAT.replace(/:id/gi, chatRoomId))
  }
  const openMemberList = () => {
    setList(true)
  }

  const onEntry = () => {
    confirm({ ...LOBBY_DIALOGS.ENTRY_CONFIRMATION })
      .then(() => {
        hashKey && entry(hashKey)
      })
      .catch(() => {
        /* ... */
      })
  }

  const onDecline = () => {
    confirm({ ...LOBBY_DIALOGS.DECLINE_ENTRY })
      .then(() => {
        hashKey && unjoin(hashKey)
      })
      .catch(() => {
        /* ... */
      })
  }

  const onMemberConfirm = () => {
    setConfirmList(true)
  }

  const renderBody = () => {
    return (
      <>
        <HeaderBar title={title} cover={cover_image_url} onHandleBack={handleBack} />
        <Box className={classes.root}>
          <LobbyStatusHeader status={status} />
          <Box className={classes.statusContainer}>
            <MainDatePeriod lobby={lobby} />
            <SubStatusInfo lobby={lobby} />
            <SubActionButtons lobby={lobby} openChat={openChat} openMemberList={openMemberList} />
          </Box>
          <MainActionButtons memberConfirm={onMemberConfirm} lobby={lobby} entry={onEntry} decline={onDecline} />
        </Box>
        <DetailInfo toEdit={toEdit} detail={lobby} extended />
        <Participants open={openList} data={lobby} handleClose={() => setList(false)} />
        {isConfirmable && <ConfirmParticipants open={openConfirmList} lobby={lobby} handleClose={() => setConfirmList(false)} />}
      </>
    )
  }

  return (
    <div>
      <ESLoader open={lobby === undefined || entryMeta.pending || unjoinMeta.pending} />
      {lobby && renderBody()}
      <ESModal open={isEditable && router.asPath.endsWith('/edit')}>
        <BlankLayout>
          <UpsertForm />
        </BlankLayout>
      </ESModal>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: Colors.black,
  },
  statusContainer: {
    backgroundColor: '#FFFFFF0F',
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 22,
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}))

export default LobbyDetailBody
