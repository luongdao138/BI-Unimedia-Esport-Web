import React from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import AppButtons from './AppButtons'
import { UserProfile } from '@services/user.service'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const BattleRoyaleInfo: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)

  return (
    <Box className={classes.body}>
      <Box display="flex" flexDirection="row">
        <Typography className={classes.roundInfoText}>{t('common:arena.see_app')}</Typography>
      </Box>
      {!isMobile && (
        <Box pt={5} className={classes.descContainer}>
          <Typography className={classes.desc}>{t('common:arena.install_app')}</Typography>
        </Box>
      )}
      <Box pt={2}>
        <AppButtons id={props.tournament.id} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  roundInfoText: {
    fontSize: 14,
    color: Colors.yellow,
    textAlign: 'center',
  },
  desc: {
    fontSize: 10,
    color: Colors.white,
    textAlign: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('xs')]: {
    descContainer: {
      display: 'none',
    },
  },
}))

export default BattleRoyaleInfo
