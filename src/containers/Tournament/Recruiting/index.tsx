import { useEffect } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TournamentCardRecruiting from '@components/TournamentCard/Recruiting'
import useRecruitingData from './useRecruitingData'

const RecruitingContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, recruitingTournaments, getRecruitingTournaments } = useRecruitingData()

  useEffect(() => {
    getRecruitingTournaments()
  }, [])

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:tournament.recruiting_tournament_list')}
        </Typography>
      </Box>
      <Grid container className={classes.container}>
        {recruitingTournaments.map((tournament, i) => (
          <Grid key={i} item xs={6} md={4}>
            <TournamentCardRecruiting tournament={tournament} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
}))

export default RecruitingContainer
