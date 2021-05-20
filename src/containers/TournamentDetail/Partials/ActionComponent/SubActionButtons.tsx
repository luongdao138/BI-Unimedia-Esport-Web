/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/tournament.service'
// import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import Participants from '@containers/TournamentDetail/Participants'
import { ROLE } from '@constants/tournament.constants'

interface Props {
  tournament: TournamentDetail
}

const SubActionButtons: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  // const { t } = useTranslation(['common'])

  // console.log('tournament', tournament)

  const role = tournament.attributes.my_role
  const isModerator = role === ROLE.ADMIN || role === ROLE.CO_ORGANIZER

  return (
    <Box className={classes.body}>
      <Box className={classes.actionButtonContainer}>
        {tournament.attributes.is_entered || isModerator ? (
          <>
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
            <Box className={classes.actionButton}>
              <ESButton variant="outlined" fullWidth onClick={() => {}}>
                グループチャット
              </ESButton>
            </Box>
          </>
        ) : (
          <Box className={classes.actionButton}>
            <Participants detail={tournament} />
          </Box>
        )}
      </Box>

      <Box className={classes.actionButtonContainer}>
        <Box className={classes.actionButton}>
          <ESButton variant="outlined" fullWidth onClick={() => {}}>
            対戦表
          </ESButton>
        </Box>
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
