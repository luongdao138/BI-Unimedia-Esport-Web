import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { SetScoreParams, TournamentDetail, TournamentMatchItem } from '@services/arena.service'
import {
  Typography,
  Box,
  makeStyles,
  Theme,
  IconButton,
  Icon,
  ThemeProvider,
  createMuiTheme,
  Divider,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import ESModal from '@components/Modal'
import { PARTICIPANT_TYPE, STATUS, ROLE } from '@constants/tournament.constants'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Meta } from '@store/metadata/actions/types'
import ArenaAvatar from '@containers/arena/Winners/ArenaAvatar'
import ScoreEdit from './ScoreEdit'
import ESStickyFooter from '@components/StickyFooter'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

interface ScoreModalProps {
  meta: Meta
  targetIds: Array<number>
  tournament: TournamentDetail
  selectedMatch: TournamentMatchItem
  handleClose: (refresh: boolean) => void
  handleSetScore: (params: SetScoreParams) => void
}

const ScoreModal: React.FC<ScoreModalProps> = ({ meta, targetIds, tournament, selectedMatch, handleClose, handleSetScore }) => {
  const data = tournament.attributes
  const isTeam = data.participant_type > 1
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [match, setMatch] = useState(selectedMatch)
  const [editingMatch, setEditingMatch] = useState<any | undefined>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [targetMatch, setTargetMatch] = useState<TournamentMatchItem | undefined>()
  const isAdmin = data.my_role === ROLE.ADMIN || data.my_role === ROLE.CO_ORGANIZER
  const ownScoreEditable =
    !selectedMatch.is_fixed_score &&
    (TournamentHelper.checkTarget(targetIds, selectedMatch.home_user?.id) ||
      TournamentHelper.checkTarget(targetIds, selectedMatch.guest_user?.id))
  const statusAvailable = data.status === STATUS.IN_PROGRESS || data.status === STATUS.COMPLETED
  const isAutowin = !!selectedMatch.winner && (!selectedMatch.home_user || !selectedMatch.guest_user)
  let scoreEditable = false
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const { isModerator } = useArenaHelper(tournament)

  if (statusAvailable && !isAutowin && (isAdmin || ownScoreEditable)) {
    scoreEditable = selectedMatch.is_editable ? true : false
  } else {
    scoreEditable = false
  }

  useEffect(() => {
    setMatch(selectedMatch)
    setRefresh(false)
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
    const _score = type == PARTICIPANT_TYPE.GUEST ? match.score_guest : match.score_home

    return (
      <Box
        paddingX={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        className={classes.itemWrapper}
      >
        <div className={classes.winnerAvatarWrapper}>
          <ArenaAvatar alt_name={_name || ''} src={avatar} win={winner} size={isMobile ? 'medium' : 'large'} nameWhite />
        </div>
        <Box marginTop={-5} display="flex" flexDirection="column" alignItems="center" width="100%">
          <Box color={Colors.grey[300]} width="100%">
            <Typography className={classes.label} variant="h3">
              {_name || ''}
            </Typography>
          </Box>
          {!isTeam && (
            <Box color={Colors.grey[400]} width="100%">
              <Typography className={classes.label}>{user ? `${t('common:common.at')}${user.user_code}` : ''}</Typography>
            </Box>
          )}
        </Box>

        <Box pt={6} display="flex" alignItems="flex-end">
          <ThemeProvider theme={theme}>
            <Box color={winner ? Colors.yellow : Colors.white}>
              {_score == undefined || _score == null || _.isNaN(_score) ? (
                match.winner ? (
                  <Typography variant="h3">0</Typography>
                ) : (
                  <Box pt={10.2} />
                )
              ) : (
                <Typography variant="h3">{_score}</Typography>
              )}
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <ESModal open={!!match && !editingMatch}>
        {!!match && (
          <BlankLayout>
            <ESStickyFooter
              disabled={false}
              title={t('common:arena.edit_match_result')}
              onClick={() => setEditingMatch(match)}
              show={scoreEditable}
              noScroll
            >
              <Box paddingTop={7.5} paddingBottom={10} className={classes.topContainer}>
                <Box pt={2} pb={3} display="flex" flexDirection="row" alignItems="center">
                  <IconButton className={classes.iconButtonBg} onClick={() => handleClose(refresh)}>
                    <Icon className="fa fa-arrow-left" fontSize="small" />
                  </IconButton>
                  <Box pl={2}>
                    <Typography variant="h2">
                      {isModerator ? t('common:tournament.match_result') : t('common:tournament.match_setting')}
                      {` (#${match.round_no + 1}${t('common:common.dash')}${match.match_no + 1})`}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" padding={1}>
                  {participantItem(match.home_user, match.home_avatar, PARTICIPANT_TYPE.HOME)}
                  <Box display="flex" alignItems="center" paddingX={1} paddingTop={8} height={isMobile ? 220 : 240}>
                    <Typography className={classes.vsLabel}>{t('common:tournament.vs')}</Typography>
                  </Box>
                  {participantItem(match.guest_user, match.guest_avatar, PARTICIPANT_TYPE.GUEST)}
                </Box>
                {!match?.winner && (
                  <Box pt={3} textAlign="center">
                    <Typography variant="body1">{t('common:arena.no_match_result')}</Typography>
                  </Box>
                )}
              </Box>
            </ESStickyFooter>
          </BlankLayout>
        )}
        {meta.pending && <ESLoader open={meta.pending} />}
      </ESModal>
      <ScoreEdit
        meta={meta}
        tournament={tournament}
        selectedMatch={editingMatch}
        onScoreEntered={handleScoreEntered}
        handleClose={() => setEditingMatch(undefined)}
      />
    </>
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
      h3: {
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'italic',
      },
    },
  },
})

const useStyles = makeStyles((theme: Theme) => ({
  winnerAvatarWrapper: {
    marginTop: theme.spacing(8),
    transform: 'translate(-0%, -0%)',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  vsLabel: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  itemWrapper: {
    width: 196,
  },
  [theme.breakpoints.down('sm')]: {
    itemWrapper: {
      width: 133,
    },
    topContainer: {
      paddingTop: 0,
    },
    vsLabel: {
      fontSize: 30,
    },
  },
}))

export default ScoreModal
