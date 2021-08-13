import React, { useState, useEffect } from 'react'
import { SetParticipantParams, TournamentDetail, TournamentMatchItem, MatchParticipant } from '@services/arena.service'
import { Typography, Box, makeStyles, Theme, IconButton, Icon, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import ESModal from '@components/Modal'
import InterestedList from './InterestedList'
import { PARTICIPANT_TYPE, ROLE } from '@constants/tournament.constants'
import { Meta } from '@store/metadata/actions/types'
import LoginRequired from '@containers/LoginRequired'

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
  const [targetParticipant, setTargetParticipant] = useState<MatchParticipant | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const [selectedPid, setSelectedPid] = useState<number | undefined>()
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
    if (type == PARTICIPANT_TYPE.HOME) {
      setSelectedPid(match.home_user ? match.home_user.pid : undefined)
    } else if (type == PARTICIPANT_TYPE.GUEST) {
      setSelectedPid(match.guest_user ? match.guest_user.pid : undefined)
    }
    setSelectedType(type)
    setShowParticipants(true)
  }

  const participantData = (participant) => {
    const _user = participant.attributes.user
    const teamName = isTeam ? participant.attributes.team.data.attributes.name : ''
    return {
      avatar: participant.attributes.avatar_url,
      user: {
        ..._user,
        role: ROLE.PARTICIPANT,
        name: participant.attributes.name,
        team_name: teamName,
        pid: participant.id,
      },
      pid: participant.id,
    }
  }

  const participantItem = (user, avatar, type) => {
    const _name = isTeam ? user?.team_name : user?.name

    return (
      <Box
        paddingRight={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        className={classes.itemWrapper}
      >
        <Box width={'100%'} display="flex" flexDirection="column" alignItems="center">
          <ESAvatar size={120} alt={_name || ''} src={avatar} />
          <Box pt={1}></Box>
          <Typography className={classes.label} variant="h3">
            {_name || ''}
          </Typography>
          {!isTeam && <Typography className={classes.label}>{user ? `${t('common:common.at')}${user.user_code}` : ''}</Typography>}
        </Box>

        <Box display="flex" alignItems="flex-end" pt={2}>
          <LoginRequired>
            <ButtonPrimary px={12} disabled={meta.pending} size="small" round={false} gradient={false} onClick={() => handleSelect(type)}>
              {t('common:tournament.set_participants')}
            </ButtonPrimary>
          </LoginRequired>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <ESModal open={!!match && !showParticipants}>
        {!!match && (
          <BlankLayout>
            <Box pt={7.5} className={classes.topContainer}>
              <Box py={2} display="flex" flexDirection="row" alignItems="center">
                <IconButton className={classes.iconButtonBg} onClick={() => handleClose(refresh)}>
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">
                    {t('common:tournament.match_setting')}
                    {` (#${match.round_no + 1}${t('common:common.dash')}${match.match_no + 1})`}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" padding={1}>
                {participantItem(match.home_user, match.home_avatar, PARTICIPANT_TYPE.HOME)}
                <Box display="flex" alignItems="center" paddingX={1} paddingTop={8} height={isMobile ? '120px' : '140px'}>
                  <Typography className={classes.vsLabel}>{t('common:tournament.vs')}</Typography>
                </Box>
                {participantItem(match.guest_user, match.guest_avatar, PARTICIPANT_TYPE.GUEST)}
              </Box>
              <Box className={classes.blankSpace}></Box>
            </Box>
          </BlankLayout>
        )}
      </ESModal>
      <InterestedList
        pid={selectedPid}
        handleUnset={() =>
          selectedHandler(
            {
              avatar: null,
              user: null,
              pid: null,
            },
            selectedType
          )
        }
        tournament={tournament}
        open={showParticipants}
        handleClose={() => setShowParticipants(false)}
        onSelect={(participant) => selectedHandler(participantData(participant), selectedType)}
      />
    </>
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
  label: {
    width: '100%',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  vsLabel: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  itemWrapper: {
    width: 196,
    minHeight: 240,
  },
  [theme.breakpoints.down('sm')]: {
    itemWrapper: {
      width: 133,
      minHeight: 220,
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
