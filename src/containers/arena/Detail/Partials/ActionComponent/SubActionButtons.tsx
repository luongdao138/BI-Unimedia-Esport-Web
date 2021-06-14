/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import ActionLabelButton from './ActionLabelButton'
import Participants from '@containers/arena/Detail/Participants'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

interface Props {
  tournament: TournamentDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { toGroupChat, toMatches, toResults, isModerator, isInProgress, isCompleted, isRecruitmentClosed } = useArenaHelper(tournament)
  const isFreezed = tournament?.attributes?.is_freezed

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {isCompleted ? (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
            <Box className={classes.actionButton}>
              <ESButton variant="outlined" fullWidth onClick={toMatches}>
                {t('common:tournament.brackets')}
              </ESButton>
            </Box>
            <Box className={classes.actionButton}>
              <ESButton variant="outlined" fullWidth onClick={toResults}>
                {t('common:tournament.results')}
              </ESButton>
            </Box>
          </>
        ) : (
          <>
            {tournament.attributes.is_entered || isModerator ? (
              <>
                {isInProgress ? (
                  <>
                    <Box className={classes.actionButton}>
                      <Participants detail={tournament} />
                    </Box>
                    <Box className={classes.actionButton}>
                      <ActionLabelButton
                        actionLabel={isFreezed ? undefined : 'Temporary'}
                        variant="outlined"
                        fullWidth
                        onClick={toGroupChat}
                      >
                        {t('common:tournament.group_chat')}
                      </ActionLabelButton>
                    </Box>
                    <Box className={classes.actionButton}>
                      <ESButton variant="outlined" fullWidth onClick={toMatches}>
                        {t('common:tournament.brackets')}
                      </ESButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className={classes.actionButton}>
                      <Participants detail={tournament} />
                    </Box>
                    <Box className={classes.actionButton}>
                      <ActionLabelButton
                        actionLabel={isFreezed ? undefined : 'Temporary'}
                        variant="outlined"
                        fullWidth
                        onClick={toGroupChat}
                      >
                        {t('common:tournament.group_chat')}
                      </ActionLabelButton>
                    </Box>
                    {isRecruitmentClosed && isModerator && (
                      <Box className={classes.actionButton}>
                        <ESButton variant="outlined" fullWidth onClick={toMatches}>
                          {t('common:tournament.brackets')}
                        </ESButton>
                      </Box>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {isInProgress ? (
                  <>
                    <Box className={classes.actionButton}>
                      <Participants detail={tournament} />
                    </Box>
                    <Box className={classes.actionButton}>
                      <ESButton variant="outlined" fullWidth onClick={toMatches}>
                        {t('common:tournament.brackets')}
                      </ESButton>
                    </Box>
                  </>
                ) : (
                  <Box className={classes.actionButton}>
                    <Participants detail={tournament} />
                  </Box>
                )}
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
