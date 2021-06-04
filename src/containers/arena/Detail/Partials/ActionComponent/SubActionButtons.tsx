/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import Participants from '@containers/arena/Detail/Participants'
import { ROLE, RULE, TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

interface Props {
  tournament: TournamentDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])

  const hashKey = tournament.attributes.hash_key
  const chatRoomId = tournament.attributes.chat_room_id
  const myRole = tournament.attributes.my_role
  const status = tournament.attributes.status
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS
  const isCompleted = status === TOURNAMENT_STATUS.COMPLETED
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START
  const isBattleRoyale = tournament.attributes.rule === RULE.BATTLE_ROYALE

  const handleMatches = () => {
    if (isModerator && isRecruitmentClosed) {
      const matchEditRoute = isBattleRoyale ? ESRoutes.ARENA_BATTLES_EDIT : ESRoutes.ARENA_MATCHES_EDIT
      router.push(matchEditRoute.replace(/:id/gi, hashKey))
    } else {
      const matchRoute = isBattleRoyale ? ESRoutes.ARENA_BATTLES : ESRoutes.ARENA_MATCHES
      router.push(matchRoute.replace(/:id/gi, hashKey))
    }
  }

  const handleResults = () => {
    router.push(ESRoutes.ARENA_RESULTS.replace(/:id/gi, hashKey))
  }

  const handleGroupChat = () => {
    router.push(ESRoutes.GROUP_CHAT.replace(/:id/gi, chatRoomId))
  }

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {isCompleted ? (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
            <Box className={classes.actionButton}>
              <ESButton variant="outlined" fullWidth onClick={handleMatches}>
                {t('common:tournament.brackets')}
              </ESButton>
            </Box>
            <Box className={classes.actionButton}>
              <ESButton variant="outlined" fullWidth onClick={handleResults}>
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
                      <ESButton variant="outlined" fullWidth onClick={handleGroupChat}>
                        {t('common:tournament.group_chat')}
                      </ESButton>
                    </Box>
                    <Box className={classes.actionButton}>
                      <ESButton variant="outlined" fullWidth onClick={handleMatches}>
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
                      <ESButton variant="outlined" fullWidth onClick={handleGroupChat}>
                        {t('common:tournament.group_chat')}
                      </ESButton>
                    </Box>
                    {isRecruitmentClosed && isModerator && (
                      <Box className={classes.actionButton}>
                        <ESButton variant="outlined" fullWidth onClick={handleMatches}>
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
                      <ESButton variant="outlined" fullWidth onClick={handleMatches}>
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
