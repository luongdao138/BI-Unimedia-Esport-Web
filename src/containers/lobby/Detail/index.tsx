import useLobbyDetail from '../hooks/useLobbyDetail'
import LobbyStatusHeader from '@components/LobbyStatusHeader'
import DetailInfo from '@containers/lobby/Detail/Partials/DetailInfo'
import ESLoader from '@components/FullScreenLoader'
// import BattleRoyaleInfo from './Partials/BattleRoyaleInfo'
import useLobbyHelper from '../hooks/useLobbyHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
import MainDatePeriod from '../MainDatePeriod'
import SubStatusInfo from '../SubStatusInfo'
import SubActionButtons from '@containers/lobby/SubActionButtons'
import MainActionButtons from '@containers/lobby/MainActionButtons'
import useLobbyActions from '../hooks/useLobbyActions'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import HeaderBar from '@components/LobbyStatusHeader/HeaderBar'
import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'

const LobbyDetailBody: React.FC = () => {
  // const { tournament, meta, userProfile, handleBack } = useLobbyDetail()
  const classes = useStyles()
  const { unjoin, entry, unjoinMeta } = useLobbyActions()

  const { handleBack, lobby, meta } = useLobbyDetail()
  const { status, title, cover_image_url } = _.get(lobby, 'attributes', { status: -1, title: '', cover_image_url: null })

  const hashKey = _.get(lobby, 'attributes.hash_key', null)

  const { toEdit } = useLobbyHelper(lobby)
  const router = useRouter()

  const openChat = () => {
    const chatRoomId = _.get(lobby, 'attributes.chatroom', null)
    if (chatRoomId) router.push(ESRoutes.GROUP_CHAT.replace(/:id/gi, chatRoomId))
  }
  const openMemberList = () => {
    alert('')
  }

  const onEntry = () => {
    hashKey && entry(hashKey)
  }

  const onDecline = () => {
    hashKey && unjoin(hashKey)
  }

  const onMemberConfirm = () => {
    alert('member confirm modal')
  }

  const renderBody = () => {
    return (
      <>
        <HeaderBar title={title} cover={cover_image_url || '/images/default_card.png'} onHandleBack={handleBack} />
        <Box className={classes.root}>
          <LobbyStatusHeader status={status} />
          <Box className={classes.statusContainer}>
            <MainDatePeriod lobby={lobby} />
            <SubStatusInfo lobby={lobby} />
            <SubActionButtons lobby={lobby} openChat={openChat} openMemberList={openMemberList} />
          </Box>
          <MainActionButtons memberConfirm={onMemberConfirm} unjoinMeta={unjoinMeta} lobby={lobby} entry={onEntry} decline={onDecline} />
        </Box>
        <DetailInfo toEdit={toEdit} detail={lobby} extended />
      </>
    )
  }

  return (
    <div>
      <ESLoader open={meta.pending} />
      {lobby && meta.loaded && renderBody()}
      <ESModal open={router.asPath.endsWith('/edit')}>
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
    padding: 6,
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
