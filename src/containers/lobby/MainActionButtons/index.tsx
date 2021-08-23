import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, Theme, makeStyles, Typography } from '@material-ui/core'
import { LOBBY_STATUS, LOBBY_PARTICIPANT_STATUS, MAIN_ACTIONS } from '@constants/lobby.constants'
import ButtonPrimary from '@components/ButtonPrimary'
// import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'
import _ from 'lodash'
import LinkButton from '@components/LinkButton'
// import { useTranslation } from 'react-i18next'

interface Props {
  lobby: LobbyDetail
  entry: () => void
  decline: () => void
  memberConfirm: () => void
}

const MainActionButtons: React.FC<Props> = ({ lobby, entry, decline, memberConfirm }) => {
  const classes = useStyles()

  const status = _.get(lobby, 'attributes.status', 0)
  const isFreezed = _.get(lobby, 'attributes.is_freezed', false)
  const isEntered: LOBBY_PARTICIPANT_STATUS | null = _.get(lobby, 'attributes.participant_status', null)
  const isOwner = _.get(lobby, 'attributes.is_owner', false)

  const actionHandlers = {
    [MAIN_ACTIONS.ENTRY]: entry && entry,
    [MAIN_ACTIONS.DECLINE]: decline && decline,
    [MAIN_ACTIONS.MEMBER_CONFIRM]: memberConfirm && memberConfirm,
  }

  const handleAction = (type: MAIN_ACTIONS) => {
    const handler = actionHandlers[type]
    handler()
  }

  const renderEntry = () => {
    /*
   Rendering disabled button for ready state 
   * [1] Check if recruiting or its ready 
   * [2] Not show to owner
   * [3] Also check user is not entered already 
   * [4] check if lobby members already confirmed no longer accepted
   */
    if ((status === LOBBY_STATUS.RECRUITING || status === LOBBY_STATUS.READY) && !isEntered && !isOwner && !isFreezed) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ButtonPrimary disabled={status === LOBBY_STATUS.READY} round fullWidth onClick={() => handleAction(MAIN_ACTIONS.ENTRY)}>
              {i18n.t('common:lobby.buttons.entry')}
            </ButtonPrimary>
          </LoginRequired>
        </Box>
      )
    }

    return null
  }

  const renderDecline = () => {
    /*
     * [1] Check if recruiting
     * [2] Not show to owner
     * [3] Also check user is entered already must be entered
     * [4] check if lobby members already confirmed no longer able to decline
     */
    if (status === LOBBY_STATUS.RECRUITING && isEntered && !isOwner && !isFreezed) {
      return (
        <LoginRequired>
          <LinkButton onClick={() => decline()}>{i18n.t('common:lobby.buttons.decline')}</LinkButton>
        </LoginRequired>
      )
    }

    return null
  }

  const renderMemberEdit = () => {
    if ((status === LOBBY_STATUS.RECRUITING || status === LOBBY_STATUS.READY) && isOwner && !isFreezed) {
      return (
        <>
          <Box className={classes.actionButton}>
            <LoginRequired>
              <ButtonPrimary disabled={status === LOBBY_STATUS.READY} round fullWidth onClick={() => handleAction(MAIN_ACTIONS.ENTRY)}>
                {i18n.t('common:lobby.buttons.member_confirm')}
              </ButtonPrimary>
            </LoginRequired>
          </Box>
          {status === LOBBY_STATUS.RECRUITING && (
            <Box pb={2} className={classes.description}>
              <Typography variant="body2">{i18n.t('common:lobby.buttons.description')}</Typography>
            </Box>
          )}
        </>
      )
    }

    return null
  }

  return (
    <Box>
      {renderEntry()}
      {renderDecline()}
      {renderMemberEdit()}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
  description: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
}))

export default MainActionButtons
