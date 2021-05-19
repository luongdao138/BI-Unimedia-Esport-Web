import React, { useState } from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import ESAvatar from '@components/Avatar'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ButtonPrimary from '@components/ButtonPrimary'
import InterestedList from './InterestedList'
import { PARTICIPANT_TYPE } from '@constants/tournament.constants'

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
      },
      body2: {
        fontSize: 40,
        fontWeight: 'bold',
      },
    },
  },
})

interface SelectParticipantModalProps {
  tournament: TournamentDetail
  open: boolean
  handleClose: () => void
}

const SelectParticipantModal: React.FC<SelectParticipantModalProps> = ({ tournament, open, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [selected, setSelected] = useState<string | undefined>()
  const [match, setMatch] = useState({
    id: 6058,
    round_no: 0,
    match_no: 2,
    score_guest: null,
    score_home: 0,
    winner: 'home',
    bracket: 'winner',
    is_edited: true,
    is_editable: false,
    home_user: {
      id: 370,
      role: 'participant',
      name: 'participant370',
      pid: 1766,
      nickname: 'umtestuser',
      user_code: 'umtestuser43',
    },
    home_avatar: null,
    guest_user: null,
    guest_avatar: null,
  })

  const selectedHandler = (participant) => {
    if (selected == PARTICIPANT_TYPE.HOME) setMatch({ ...match, home_user: participant.user, home_avatar: participant.avatar })
    else if (selected == PARTICIPANT_TYPE.GUEST) setMatch({ ...match, guest_user: participant.user, guest_avatar: participant.avatar })
    setSelected(undefined)
  }

  return (
    <ESModal open={open}>
      <BlankLayout>
        <Box pt={7.5} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleClose}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">試合設定{t('common:user_profile.tag_edit')}</Typography>
            </Box>
          </Box>
          <Box pb={6} pt={6} textAlign="center">
            <ThemeProvider theme={theme}>
              <Typography variant="body1">{`${match.round_no + 1} - ${match.match_no + 1}`}</Typography>
            </ThemeProvider>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
            <Box paddingRight={1} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
              <ESAvatar size={120} alt={match.home_user?.name || ''} src={match.home_avatar || '/images/avatar_o.png'} />
              <Box pt={1}></Box>
              <Typography variant="h3">{match.home_user?.name || '-'}</Typography>
              <Typography>{match.home_user ? `${t('common:common.at')}${match.home_user.user_code}` : '-'}</Typography>

              <Box pt={6} display="flex" alignItems="flex-end">
                <ButtonPrimary size="small" round={false} gradient={false} onClick={() => setSelected(PARTICIPANT_TYPE.HOME)}>
                  設定する
                </ButtonPrimary>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <ThemeProvider theme={theme}>
                <Typography variant="body2">{'VS'}</Typography>
              </ThemeProvider>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
              <ESAvatar size={120} alt={match.guest_user?.name || ''} src={match.guest_avatar || '/images/avatar_o.png'} />
              <Box pt={1}></Box>
              <Typography variant="h3">{match.guest_user?.name || '-'}</Typography>
              <Typography>{match.guest_user ? `${t('common:common.at')}${match.guest_user.user_code}` : '-'}</Typography>

              <Box pt={6} display="flex" alignItems="flex-end">
                <ButtonPrimary size="small" round={false} gradient={false} onClick={() => setSelected(PARTICIPANT_TYPE.GUEST)}>
                  設定する
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>

          <Box className={classes.blankSpace}></Box>
        </Box>
      </BlankLayout>
      <InterestedList tournament={tournament} open={!!selected} handleClose={() => setSelected(undefined)} onSelect={selectedHandler} />
    </ESModal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default SelectParticipantModal
