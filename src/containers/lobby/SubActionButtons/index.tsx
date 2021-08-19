import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, Theme, makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import ActionLabelButton from './Partials/ActionLabelButton'
import { LOBBY_STATUS } from '@constants/lobby.constants'
import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'
import _ from 'lodash'

// import { useTranslation } from 'react-i18next'

interface Props {
  lobby: LobbyDetail
  openChat: () => void
  openMemberList: () => void
}

const SubActionButtons: React.FC<Props> = ({ lobby, openChat, openMemberList }) => {
  const classes = useStyles()
  const status = _.get(lobby, 'attributes.status', LOBBY_STATUS.READY)
  const isFreezed = _.get(lobby, 'attributes.is_freezed', false)

  const renderMemberList = () => {
    /*
   Rendering temporary chat button for detail
   * [1] Show other than ready, deleted, canceled status
   * [2] Different text for after confirmed
   */
    if (status !== LOBBY_STATUS.READY && status !== LOBBY_STATUS.DELETED && status !== LOBBY_STATUS.CANCELLED) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ESButton variant="outlined" fullWidth onClick={openMemberList}>
              {isFreezed ? i18n.t('common:tournament.member_list_confirmed') : i18n.t('common:tournament.member_list')}
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
   */
    if (status !== LOBBY_STATUS.READY && status !== LOBBY_STATUS.DELETED && status !== LOBBY_STATUS.CANCELLED) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ActionLabelButton
              actionLabel={isFreezed ? undefined : i18n.t('common:lobby.buttons.temporary')}
              variant="outlined"
              fullWidth
              onClick={openChat && openChat}
              // disabled={chatDisabled}
            >
              {i18n.t('common:tournament.group_chat')}
            </ActionLabelButton>
          </LoginRequired>
        </Box>
      )
    }
  }

  return (
    <Box>
      {renderChat()}
      {renderMemberList()}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    width: theme.spacing(20),
    margin: 8,
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column',
    },
  },
}))

export default SubActionButtons
