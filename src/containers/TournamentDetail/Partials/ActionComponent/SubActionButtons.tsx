/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/tournament.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import Participants from '@containers/TournamentDetail/Participants'
import { ROLE, TOURNAMENT_STATUS } from '@constants/tournament.constants'

interface Props {
  tournament: TournamentDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const myRole = tournament.attributes.my_role
  const status = tournament.attributes.status
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {tournament.attributes.is_entered || isModerator ? (
          <>
            {isInProgress ? (
              <>
                <Box className={classes.actionButton}>
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
                    {t('common:tournament.participants')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
                    {t('common:tournament.group_chat')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
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
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
                    {t('common:tournament.group_chat')}
                  </ESButton>
                </Box>
                {isRecruitmentClosed && isModerator && (
                  <Box className={classes.actionButton}>
                    <ESButton variant="outlined" fullWidth onClick={() => {}}>
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
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
                    {t('common:tournament.participants')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ESButton variant="outlined" fullWidth onClick={() => {}}>
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
    marginTop: theme.spacing(2),
  },
  actionButton: {
    width: theme.spacing(20),
    margin: 8,
  },
}))

export default SubActionButtons
