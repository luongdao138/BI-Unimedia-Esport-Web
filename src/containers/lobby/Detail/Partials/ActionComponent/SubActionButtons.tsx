/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { LobbyDetail } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import ActionLabelButton from './ActionLabelButton'
import Participants from '@containers/lobby/Detail/Participants'
import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import LoginRequired from '@containers/LoginRequired'

interface Props {
  lobby: LobbyDetail
}

const SubActionButtons: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { toGroupChat, isCompleted, isUnselected, isEntered, isModerator } = useLobbyHelper(lobby)
  const isFreezed = lobby?.attributes?.is_freezed
  const chatDisabled = (!isEntered || isUnselected) && !isModerator

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {isCompleted ? (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={lobby} />
            </Box>
            {isModerator && (
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ActionLabelButton variant="outlined" fullWidth onClick={toGroupChat}>
                    {t('common:lobby.group_chat')}
                  </ActionLabelButton>
                </LoginRequired>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={lobby} />
            </Box>
            {/* admin, оролцогч  */}
            {(isModerator || isEntered) && !isUnselected && (
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ActionLabelButton
                    actionLabel={isFreezed ? undefined : t('common:lobby.temporary')}
                    variant="outlined"
                    fullWidth
                    onClick={toGroupChat}
                    disabled={chatDisabled}
                  >
                    {t('common:lobby.group_chat')}
                  </ActionLabelButton>
                </LoginRequired>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
