import React, { useState, useEffect } from 'react'
import { SetScoreParams, TournamentDetail, TournamentMatchItem } from '@services/tournament.service'
import { Typography, Box, makeStyles, Theme, IconButton, Icon, ThemeProvider, createMuiTheme, Divider } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import ESModal from '@components/Modal'
import { PARTICIPANT_TYPE, STATUS, ROLE } from '@constants/tournament.constants'
import { Meta } from '@store/metadata/actions/types'
import ScoreEdit from './ScoreEdit'

interface ScoreModalProps {
  meta: Meta
  tournament: TournamentDetail
  selectedMatch: TournamentMatchItem
  handleClose: (refresh: boolean) => void
  handleSetScore: (params: SetScoreParams) => void
}

const ScoreModal: React.FC<ScoreModalProps> = ({ meta, tournament, selectedMatch, handleClose, handleSetScore }) => {
  const data = tournament.attributes
  const isTeam = data.participant_type > 1
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [match, setMatch] = useState(selectedMatch)
  const [editingMatch, setEditingMatch] = useState<any | undefined>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [targetMatch, setTargetMatch] = useState<TournamentMatchItem | undefined>()

  const isAdmin = data.my_role === ROLE.ADMIN || data.my_role === ROLE.CO_ORGANIZER
  const ownScoreEditable = false
  // !selectedMatch.is_fixed_score &&
  // (TournamentHelper.checkTarget(targetIds, selectedMatch.home_user?.id) ||
  //   TournamentHelper.checkTarget(targetIds, selectedMatch.guest_user?.id));
  const statusAvailable = data.status === STATUS.IN_PROGRESS || data.status === STATUS.COMPLETED
  const isAutowin = !!selectedMatch.winner && (!selectedMatch.home_user || !selectedMatch.guest_user)
  let scoreEditable = false

  if (statusAvailable && !isAutowin && (isAdmin || ownScoreEditable)) {
    scoreEditable = selectedMatch.is_editable ? true : false
  } else {
    scoreEditable = false
  }

  useEffect(() => {
    setMatch(selectedMatch)
  }, [selectedMatch])

  useEffect(() => {
    if (meta.loaded && targetMatch) {
      setMatch(targetMatch)
      setTargetMatch(undefined)
    }
  }, [meta.loaded])

  const handleScoreEntered = (match) => {
    handleSetScore({ match_id: match.id, score_home: match.score_home, score_guest: match.score_guest, winner: match.winner })
    setTargetMatch(match)
    setEditingMatch(undefined)
    setRefresh(true)
  }

  const participantItem = (user, avatar, type) => {
    const _name = isTeam ? user?.team_name : user?.name
    const winner = type == match?.winner

    return (
      <Box paddingX={3} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        {winner ? (
          <ThemeProvider theme={theme}>
            <Typography variant="caption">{'WIN'}</Typography>
          </ThemeProvider>
        ) : (
          <Box pt={14.5}></Box>
        )}
        <ESAvatar size={120} alt={_name || ''} src={avatar} />
        <Box pt={1}></Box>
        <Typography variant="h3">{_name || t('common:common.dash')}</Typography>
        {!isTeam && <Typography>{user ? `${t('common:common.at')}${user.user_code}` : t('common:common.dash')}</Typography>}

        <Box pt={6} display="flex" alignItems="flex-end">
          <ThemeProvider theme={theme}>
            <Box color={winner && Colors.yellow}>
              <Typography variant="h3">{type == PARTICIPANT_TYPE.GUEST ? match.score_guest : match.score_home}</Typography>
            </Box>
          </ThemeProvider>
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
              <IconButton className={classes.iconButtonBg} onClick={() => handleClose(refresh)}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:tournament.match_result')}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box pb={6} pt={3} textAlign="center">
              <ThemeProvider theme={theme}>
                <Typography variant="body1">{`${match.round_no + 1} ${t('common:common.dash')} ${match.match_no + 1}`}</Typography>
              </ThemeProvider>
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
            {!match?.winner && (
              <Box pt={3} textAlign="center">
                <Typography variant="body1">対戦結果が出ていません</Typography>
              </Box>
            )}

            <Box className={classes.blankSpace}></Box>
          </Box>

          {scoreEditable && (
            <Box className={classes.stickyFooter}>
              <Box className={classes.nextBtnHolder}>
                <Box maxWidth={280} className={classes.buttonContainer}>
                  <ButtonPrimary type="submit" round fullWidth onClick={() => setEditingMatch(selectedMatch)}>
                    {'対戦結果を編集する'}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Box>
          )}
          <ScoreEdit
            meta={meta}
            tournament={tournament}
            selectedMatch={editingMatch}
            onScoreEntered={handleScoreEntered}
            handleClose={() => setEditingMatch(undefined)}
          />
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
      caption: {
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'italic',
        background: 'linear-gradient(to left, #C3F735, #F4F434)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
      h3: {
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'italic',
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
}))

export default ScoreModal
