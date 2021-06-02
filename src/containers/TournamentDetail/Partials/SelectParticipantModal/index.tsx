import React, { useState, useEffect } from 'react'
import { SetParticipantParams, TournamentDetail, TournamentMatchItem } from '@services/tournament.service'
import {
  Typography,
  Box,
  makeStyles,
  Theme,
  IconButton,
  Icon,
  ThemeProvider,
  createMuiTheme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import ESModal from '@components/Modal'
import InterestedList from './InterestedList'
import { PARTICIPANT_TYPE } from '@constants/tournament.constants'
import { Meta } from '@store/metadata/actions/types'

interface SelectParticipantModalProps {
  meta: Meta
  tournament: TournamentDetail
  selectedMatch: TournamentMatchItem
  handleClose: (refresh: boolean) => void
  handleSetParticipant: (params: SetParticipantParams) => void
}

const SelectParticipantModal: React.FC<SelectParticipantModalProps> = ({
  meta,
  tournament,
  selectedMatch,
  handleClose,
  handleSetParticipant,
}) => {
  const data = tournament.attributes
  const isTeam = data.participant_type > 1
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [match, setMatch] = useState(selectedMatch)
  const [showParticipants, setShowParticipants] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [targetParticipant, setTargetParticipant] = useState<any | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  useEffect(() => {
    setMatch(selectedMatch)
    setRefresh(false)
  }, [selectedMatch])

  useEffect(() => {
    if (meta.loaded && targetParticipant) {
      if (selectedType == PARTICIPANT_TYPE.HOME) {
        setMatch({ ...match, home_user: targetParticipant.user, home_avatar: targetParticipant.avatar })
      } else if (selectedType == PARTICIPANT_TYPE.GUEST) {
        setMatch({ ...match, guest_user: targetParticipant.user, guest_avatar: targetParticipant.avatar })
      }
      setSelectedType(undefined)
      setTargetParticipant(undefined)
    }
  }, [meta.loaded])

  const selectedHandler = (participant, _type) => {
    handleSetParticipant({ match_id: match.id, participant_id: participant.pid, type: _type })
    setTargetParticipant(participant)
    setShowParticipants(false)
    setRefresh(true)
  }

  const handleSelect = (type) => {
    setSelectedType(type)
    setShowParticipants(true)
  }

  const participantItem = (user, avatar, type) => {
    const _name = isTeam ? user?.team_name : user?.name
    const emptyParticipant = {
      avatar: null,
      user: null,
      pid: null,
    }
    return (
      <Box
        paddingRight={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        className={classes.itemWrapper}
      >
        <ESAvatar size={120} alt={_name || ''} src={avatar} />
        <Box pt={1}></Box>
        <Typography variant="h3">{_name || t('common:common.dash')}</Typography>
        {!isTeam && <Typography>{user ? `${t('common:common.at')}${user.user_code}` : t('common:common.dash')}</Typography>}

        <Box pt={6} display="flex" alignItems="flex-end">
          {!user ? (
            <ButtonPrimary disabled={meta.pending} size="small" round={false} gradient={false} onClick={() => handleSelect(type)}>
              {t('common:tournament.set_participants')}
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              disabled={meta.pending}
              size="small"
              round={false}
              gradient={false}
              onClick={() => {
                setSelectedType(type)
                selectedHandler(emptyParticipant, type)
              }}
            >
              {t('common:tournament.unset_participants')}
            </ButtonPrimary>
          )}
        </Box>
      </Box>
    )
  }

  return (
    <ESModal open={!!match}>
      {!!match && (
        <BlankLayout>
          <Box pt={7.5} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={() => handleClose(refresh)}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:tournament.match_setting')}</Typography>
              </Box>
            </Box>
            <Box pb={6} pt={6} textAlign="center">
              <ThemeProvider theme={theme}>
                <Typography variant="body1">{`${match.round_no + 1} ${t('common:common.dash')} ${match.match_no + 1}`}</Typography>
              </ThemeProvider>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
              {participantItem(match.home_user, match.home_avatar, PARTICIPANT_TYPE.HOME)}
              <Box display="flex" alignItems="center" paddingX={1} paddingTop={8} height={isMobile ? 220 : 240}>
                <Typography className={classes.vsLabel}>{t('common:tournament.vs')}</Typography>
              </Box>
              {participantItem(match.guest_user, match.guest_avatar, PARTICIPANT_TYPE.GUEST)}
            </Box>
            <Box className={classes.blankSpace}></Box>
          </Box>
          <InterestedList
            tournament={tournament}
            open={showParticipants}
            handleClose={() => setShowParticipants(false)}
            onSelect={(participant) => selectedHandler(participant, selectedType)}
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
  vsLabel: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  itemWrapper: {
    width: 196,
    height: 240,
  },
  [theme.breakpoints.down('sm')]: {
    itemWrapper: {
      width: 148,
      height: 220,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
    vsLabel: {
      fontSize: 30,
    },
  },
}))

export default SelectParticipantModal
