/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { LobbyDetail } from '@services/lobbydump.service'
import { useTranslation } from 'react-i18next'
import ActionLabelButton from './ActionLabelButton'
import Participants from '@containers/lobby/Detail/Participants'
import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import LoginRequired from '@containers/LoginRequired'

interface Props {
  tournament: LobbyDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { toGroupChat, isCompleted, isUnselected, isEntered, isModerator } = useLobbyHelper(tournament)
  const isFreezed = tournament?.attributes?.is_freezed
  const chatDisabled = (!isEntered || isUnselected) && !isModerator

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {isCompleted ? (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
            {isModerator && (
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ActionLabelButton variant="outlined" fullWidth onClick={toGroupChat}>
                    {t('common:tournament.group_chat')}
                  </ActionLabelButton>
                </LoginRequired>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
            {/* admin, оролцогч  */}
            {(isModerator || isEntered) && !isUnselected && (
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ActionLabelButton
                    actionLabel={isFreezed ? undefined : t('common:arena.temporary')}
                    variant="outlined"
                    fullWidth
                    onClick={toGroupChat}
                    disabled={chatDisabled}
                  >
                    {t('common:tournament.group_chat')}
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
