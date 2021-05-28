import React, { useState, useEffect, ChangeEvent } from 'react'
import { TournamentDetail, TournamentMatchItem } from '@services/tournament.service'
import { Typography, Box, IconButton, Icon, ThemeProvider, createMuiTheme, Divider } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import ESModal from '@components/Modal'
import { PARTICIPANT_TYPE } from '@constants/tournament.constants'
import { Meta } from '@store/metadata/actions/types'

interface ScoreEditProps {
  meta: Meta
  tournament: TournamentDetail
  selectedMatch: TournamentMatchItem
  handleClose: () => void
  onScoreEntered: (match) => void
}

const ScoreEdit: React.FC<ScoreEditProps> = ({ meta, tournament, selectedMatch, handleClose, onScoreEntered }) => {
  const data = tournament.attributes
  const isTeam = data.participant_type > 1
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [match, setMatch] = useState(selectedMatch)

  useEffect(() => {
    setMatch(selectedMatch)
  }, [selectedMatch])

  const handleOnChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const _val = e.target.value
    const _match = { ...match }
    type == PARTICIPANT_TYPE.GUEST ? (_match.score_guest = Number(_val)) : (_match.score_home = Number(_val))
    setMatch(_match)
  }

  const participantItem = (user, avatar, type) => {
    const _name = isTeam ? user?.team_name : user?.name
    const isWin = type == match?.winner
    const borderWidth = isWin ? 2.5 : 1.5
    const borderColor = isWin ? Colors.white : Colors.grey[200]

    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Box
          className={classes.customRadio}
          border={`${borderWidth}px solid ${borderColor}`}
          onClick={() => setMatch({ ...match, winner: type })}
        >
          <ESAvatar size={120} alt={_name || ''} src={avatar} />
          <Box pt={1}></Box>
          <Typography variant="h3">{_name || t('common:common.dash')}</Typography>
          {!isTeam && <Typography>{user ? `${t('common:common.at')}${user.user_code}` : t('common:common.dash')}</Typography>}
        </Box>
        <Box pt={6} display="flex" alignItems="flex-end">
          <input
            className={classes.pinText}
            type="number"
            min={0}
            placeholder={t('common:common.zero')}
            pattern="\d*"
            autoComplete="off"
            value={type == PARTICIPANT_TYPE.GUEST ? match.score_guest : match.score_home}
            onChange={(e) => handleOnChange(type, e)}
          />
        </Box>
      </Box>
    )
  }

  return (
    <ESModal open={!!match}>
      {!!match && (
        <BlankLayout>
          <Box pt={7.5} className={classes.topContainer}>
            <Box pt={2} pb={3} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={() => handleClose()}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:tournament.edit_match_result')}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box pb={6} pt={3} textAlign="center">
              <ThemeProvider theme={theme}>
                <Typography variant="body1">{`${match.round_no + 1} ${t('common:common.dash')} ${match.match_no + 1}`}</Typography>
              </ThemeProvider>
            </Box>
            <Box pb={5} pt={1} textAlign="center">
              <Typography variant="body1">{t('common:arena.please_select_winner')}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
              {participantItem(match.home_user, match.home_avatar, PARTICIPANT_TYPE.HOME)}
              <Box display="flex" alignItems="center">
                <ThemeProvider theme={theme}>
                  <Typography variant="body2">{t('common:tournament.vs')}</Typography>
                </ThemeProvider>
              </Box>
              {participantItem(match.guest_user, match.guest_avatar, PARTICIPANT_TYPE.GUEST)}
            </Box>

            <Box className={classes.blankSpace}></Box>
          </Box>

          <Box className={classes.stickyFooter}>
            <Box className={classes.nextBtnHolder}>
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth disabled={!match?.winner} onClick={() => onScoreEntered(match)}>
                  {t('common:tournament_create.decide')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      )}
      {meta.pending && <ESLoader open={meta.pending} />}
    </ESModal>
  )
}

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
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  customRadio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 196,
    cursor: 'pointer',
    backgroundColor: Colors.black,
    borderRadius: 5,
    padding: theme.spacing(3),
  },
  pinText: {
    borderRadius: 5,
    border: `1px solid ${Colors.grey[200]}`,
    outline: 'none',
    boxSizing: 'border-box',
    color: Colors.white,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    height: '71px',
    width: '100%',
    maxWidth: '1.8em',
    backgroundColor: Colors.black,
    '&[type=number]': {
      '-moz-appearance': 'textfield',
      '-webkit-user-select': 'auto', // 'none' is not working in MacOS Safari, 'auto' is working
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&:focus': {
      outline: 'none',
      border: `1px solid ${Colors.white}`,
    },
  },
}))

export default ScoreEdit
