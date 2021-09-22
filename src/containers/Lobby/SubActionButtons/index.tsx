import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, Theme, makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import ActionLabelButton from './Partials/ActionLabelButton'
import { LOBBY_STATUS, LOBBY_PARTICIPANT_STATUS } from '@constants/lobby.constants'
import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'
import _ from 'lodash'

interface Props {
  lobby: LobbyDetail
  openChat: () => void
  openMemberList: () => void
}

const SubActionButtons: React.FC<Props> = ({ lobby, openChat, openMemberList }) => {
  const classes = useStyles()
  const status = _.get(lobby, 'attributes.status', 0)
  const isFreezed = _.get(lobby, 'attributes.is_freezed', false)
  const isOwner = _.get(lobby, 'attributes.is_owner', false)
  const participantStatus: LOBBY_PARTICIPANT_STATUS | null = _.get(lobby, 'attributes.participant_status', null)

  const afterClosed = [LOBBY_STATUS.ENTRY_CLOSED, LOBBY_STATUS.IN_PROGRESS, LOBBY_STATUS.ENDED]

  const renderMemberList = () => {
    /*
   Rendering temporary chat button for detail
   * [1] Show other than ready, deleted, canceled status
   * [2] Different text for after confirmed
   */
    if (status !== LOBBY_STATUS.READY && status !== LOBBY_STATUS.DELETED && status !== LOBBY_STATUS.CANCELLED) {
      const buttonText = isFreezed ? i18n.t('common:lobby.buttons.member_list_confirmed') : i18n.t('common:lobby.buttons.member_list')

      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ESButton variant="outlined" fullWidth onClick={openMemberList}>
              {buttonText}
            </ESButton>
          </LoginRequired>
        </Box>
      )
    }
  }

  const renderChat = () => {
    /*
   Rendering temporary chat button for detail
   * [1] Show other than ready, deleted, canceled status
   * [2] Temporary message top of button before freeze
   * [3] Show entered or selected users
   * [4] Admin always sees except ready
   * [?] Additional condition might be needed for not selected user show or not
   */
    if (status !== LOBBY_STATUS.READY && status !== LOBBY_STATUS.DELETED && status !== LOBBY_STATUS.CANCELLED && isOwner) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ActionLabelButton
              actionLabel={isFreezed ? undefined : i18n.t('common:lobby.buttons.temporary')}
              variant="outlined"
              fullWidth
              onClick={openChat && openChat}
            >
              {i18n.t('common:tournament.group_chat')}
            </ActionLabelButton>
          </LoginRequired>
        </Box>
      )
    } else if (
      status !== LOBBY_STATUS.READY &&
      status !== LOBBY_STATUS.DELETED &&
      status !== LOBBY_STATUS.CANCELLED &&
      !afterClosed.includes(status) &&
      participantStatus === LOBBY_PARTICIPANT_STATUS.ENTERED
    ) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ActionLabelButton
              actionLabel={isFreezed ? undefined : i18n.t('common:lobby.buttons.temporary')}
              variant="outlined"
              fullWidth
              onClick={openChat && openChat}
            >
              {i18n.t('common:tournament.group_chat')}
            </ActionLabelButton>
          </LoginRequired>
        </Box>
      )
    } else if (
      status !== LOBBY_STATUS.READY &&
      status !== LOBBY_STATUS.DELETED &&
      status !== LOBBY_STATUS.CANCELLED &&
      afterClosed.includes(status) &&
      participantStatus === LOBBY_PARTICIPANT_STATUS.SELECTED
    ) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ActionLabelButton
              actionLabel={isFreezed ? undefined : i18n.t('common:lobby.buttons.temporary')}
              variant="outlined"
              fullWidth
              onClick={openChat && openChat}
            >
              {i18n.t('common:tournament.group_chat')}
            </ActionLabelButton>
          </LoginRequired>
        </Box>
      )
    }
  }

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {renderMemberList()}
        {renderChat()}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    width: theme.spacing(20),
    margin: 8,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column',
    },
  },
}))

export default SubActionButtons
