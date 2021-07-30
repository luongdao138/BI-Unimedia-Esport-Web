/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import ActionLabelButton from './ActionLabelButton'
import Participants from '@containers/arena/Detail/Participants'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import LoginRequired from '@containers/LoginRequired'

interface Props {
  tournament: TournamentDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { toGroupChat, toMatches, toResults, isCompleted, isUnselected, isEntered, isReady, isRecruiting, isModerator } = useArenaHelper(
    tournament
  )
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

            <Box className={classes.actionButton}>
              <LoginRequired>
                <ESButton variant="outlined" fullWidth onClick={toMatches}>
                  {t('common:tournament.brackets')}
                </ESButton>
              </LoginRequired>
            </Box>
            <Box className={classes.actionButton}>
              <LoginRequired>
                <ESButton variant="outlined" fullWidth onClick={toResults}>
                  {t('common:tournament.results')}
                </ESButton>
              </LoginRequired>
            </Box>
          </>
        ) : (
          <>
            {isReady || isRecruiting ? (
              <>
                <Box className={classes.actionButton}>
                  <Participants detail={tournament} />
                </Box>
                {(isModerator || isEntered) && (
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
            ) : (
              <>
                <Box className={classes.actionButton}>
                  <Participants detail={tournament} />
                </Box>
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
                <Box className={classes.actionButton}>
                  <LoginRequired>
                    <ESButton variant="outlined" fullWidth onClick={toMatches}>
                      {t('common:tournament.brackets')}
                    </ESButton>
                  </LoginRequired>
                </Box>
              </>
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
