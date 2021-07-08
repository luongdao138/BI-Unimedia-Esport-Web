import React, { useState, useEffect, ChangeEvent } from 'react'
import { TournamentDetail, TournamentMatchItem } from '@services/arena.service'
import { Typography, Box, IconButton, Icon, ThemeProvider, createMuiTheme, Divider, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import ESAvatar from '@components/Avatar'
import ESModal from '@components/Modal'
import { PARTICIPANT_TYPE } from '@constants/tournament.constants'
import { Meta } from '@store/metadata/actions/types'
import ESStickyFooter from '@components/StickyFooter'

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
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  useEffect(() => {
    setMatch(selectedMatch)
  }, [selectedMatch])

  const handleOnChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const _val = parseInt(e.target.value.replace(/[^0-9]/g, ''))
    if (_val > 99999 || _val < 0) return

    const _match = { ...match }
    type == PARTICIPANT_TYPE.GUEST ? (_match.score_guest = _val) : (_match.score_home = _val)
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
          <ESAvatar className={`${avatar ? '' : classes.pinkBg}`} size={isMobile ? 100 : 120} alt={_name || ''} src={avatar} />
          <Box pt={1}></Box>
          <Typography className={classes.label} variant="h3">
            {_name || ''}
          </Typography>
          {!isTeam && <Typography className={classes.label}>{user ? `${t('common:common.at')}${user.user_code}` : ''}</Typography>}
        </Box>
        <Box pt={3} display="flex" alignItems="flex-end">
          <input
            className={classes.pinText}
            type="number"
            min={0}
            placeholder={t('common:arena.double_zero')}
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
          <ESStickyFooter
            disabled={!match?.winner}
            title={t('common:tournament_create.decide')}
            onClick={() => onScoreEntered(match)}
            noScroll
          >
            <Box paddingY={7.5} className={classes.topContainer}>
              <Box pt={2} pb={3} display="flex" flexDirection="row" alignItems="center">
                <IconButton className={classes.iconButtonBg} onClick={() => handleClose()}>
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">{t('common:tournament.edit_match_result')}</Typography>
                </Box>
              </Box>
              <Divider />
              <Box pb={2} pt={3} textAlign="center">
                <ThemeProvider theme={theme}>
                  <Typography variant="body1">{`${match.round_no + 1} ${t('common:common.dash')} ${match.match_no + 1}`}</Typography>
                </ThemeProvider>
              </Box>
              <Box pb={5} pt={5} textAlign="center">
                <Typography variant="body1">{t('common:arena.please_select_winner')}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" padding={1}>
                {participantItem(match.home_user, match.home_avatar, PARTICIPANT_TYPE.HOME)}
                <Box display="flex" alignItems="center" paddingX={1} height={isMobile ? 220 : 240}>
                  <Typography className={classes.vsLabel}>{t('common:tournament.vs')}</Typography>
                </Box>
                {participantItem(match.guest_user, match.guest_avatar, PARTICIPANT_TYPE.GUEST)}
              </Box>
            </Box>
          </ESStickyFooter>
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
  vsLabel: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  customRadio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 196,
    minHeight: 240,
    height: '100%',
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
    fontSize: 40,
    height: 71,
    width: '100%',
    maxWidth: 88,
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
  pinkBg: {
    backgroundColor: '#8E47FF',
  },
  [theme.breakpoints.down('sm')]: {
    customRadio: {
      width: 155,
      minHeight: 220,
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    topContainer: {
      paddingTop: 0,
    },
    vsLabel: {
      fontSize: 30,
    },
  },
  [theme.breakpoints.down('xs')]: {
    customRadio: {
      width: 133,
    },
  },
}))

export default ScoreEdit
