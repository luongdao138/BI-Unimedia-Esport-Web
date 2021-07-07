import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import useParticipants from './useParticipants'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import TeamMemberItemExpanded from '../Partials/TeamMemberItemExpanded'
import ESButton from '@components/Button'
import { ParticipantsResponse, TournamentDetail } from '@services/arena.service'
import { ROLE } from '@constants/tournament.constants'
import useGetProfile from '@utils/hooks/useGetProfile'
import _ from 'lodash'
import TeamEntryEditModal from '../Partials/ActionComponent/TeamEntryEditModal'
import InidividualEntryEditModal from '../Partials/ActionComponent/InidividualEntryEditModal'

export interface ParticipantsProps {
  detail: TournamentDetail
}

const Participants: React.FC<ParticipantsProps> = ({ detail }) => {
  const { t } = useTranslation(['common'])
  const data = detail.attributes
  const isTeam = data.participant_type > 1
  const unit = isTeam ? t('common:common.team') : t('common:common.man')
  const hash_key = data.hash_key
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedParticipant, setSelectedParticipant] = useState(null as ParticipantsResponse | null)
  const [members, setMembers] = useState([])

  const { participants, getParticipants, resetParticipants, resetMeta, page, meta } = useParticipants()
  const { userProfile } = useGetProfile()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      getParticipants({ page: 1, hash_key: hash_key, role: data.is_freezed ? ROLE.PARTICIPANT : undefined })
    } else {
      resetParticipants()
    }

    return () => {
      resetParticipants()
      resetMeta()
    }
  }, [open])

  useEffect(() => {
    setMembers(participants)
  }, [participants])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getParticipants({ page: page.current_page + 1, hash_key: hash_key })
  }

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, nickname: participant.attributes.name, avatar: participant.attributes.avatar_url } }
  }
  const getTeamId = (participant: ParticipantsResponse) => {
    return _.get(participant, 'attributes.team.data.id')
  }

  const isMyTeam = (participant: ParticipantsResponse) => {
    const myInfo = _.get(detail, 'attributes.my_info', [])
    const interestedInfo = myInfo.find((info) => info.role === ROLE.INTERESTED || info.role === ROLE.PARTICIPANT)
    if (!interestedInfo) return false
    return `${interestedInfo.team_id}` === `${getTeamId(participant)}`
  }

  const isMe = (participant: ParticipantsResponse) => {
    return `${userProfile?.id}` === `${_.get(participant, 'attributes.user.id', '')}`
  }

  const onTeamClick = (participant: ParticipantsResponse) => {
    setSelectedParticipant(participant)
  }

  return (
    <div>
      <ESButton variant="outlined" fullWidth onClick={handleClickOpen}>
        {data.is_freezed ? t('common:tournament.participants') : t('common:tournament.entry_members')}
      </ESButton>
      <ESModal open={open} handleClose={handleClose}>
        <BlankLayout>
          <Box pt={7.5} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:tournament.participant.back')}</Typography>
              </Box>
            </Box>
            <Box py={2} textAlign="right" flexDirection="row" display="flex" alignItems="center" justifyContent="flex-end">
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="flex-end">
                  <Box mr={2}>
                    <Typography variant="h3" className={classes.countLabel}>
                      {t('common:tournament.number_of_entries')}
                    </Typography>
                  </Box>
                  <Typography variant="h3" style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {data.is_freezed ? data.participant_count : data.participant_count + data.interested_count}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel}>
                    {unit}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel} style={{ fontSize: 20, marginLeft: 4 }}>
                    /
                  </Typography>

                  <Typography variant="h3" className={classes.countLabel} style={{ fontSize: 22 }}>
                    {data.max_participants}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel}>
                    {unit}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <div id="scrollableDiv" style={{ height: 600, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
              <InfiniteScroll
                dataLength={participants.length}
                next={fetchMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.99}
                style={{ overflow: 'hidden' }}
                loader={
                  meta.pending && (
                    <div className={classes.loaderCenter}>
                      <ESLoader />
                    </div>
                  )
                }
              >
                {isTeam
                  ? members.map((participant, i) => (
                      <Box key={`team${i}`} py={1}>
                        <TeamMemberItemExpanded
                          hideFollow={isMyTeam(participant) ? true : false}
                          team={participant}
                          yellowTitle={isMyTeam(participant)}
                          handleClick={() => onTeamClick(participant)}
                          memberClick={() => onTeamClick(participant)}
                        />
                      </Box>
                    ))
                  : members.map((participant, i) => (
                      <UserListItem
                        data={userData(participant)}
                        key={i}
                        isFollowed={participant.attributes.is_followed}
                        nicknameYellow={isMe(participant)}
                        handleClick={() => setSelectedParticipant(participant)}
                        isBlocked={participant.attributes.is_blocked}
                      />
                    ))}
              </InfiniteScroll>
              {!selectedParticipant ? null : isTeam ? (
                <TeamEntryEditModal
                  tournament={detail}
                  userProfile={userProfile}
                  previewMode
                  open={true}
                  initialTeamId={getTeamId(selectedParticipant)}
                  onClose={() => setSelectedParticipant(null)}
                  myTeam={isMyTeam(selectedParticipant)}
                  toDetail={() => {
                    setSelectedParticipant(null)
                    setOpen(false)
                  }}
                />
              ) : (
                <InidividualEntryEditModal
                  tournament={detail}
                  previewMode
                  open={true}
                  initialParticipantId={`${selectedParticipant.id}`}
                  onClose={() => setSelectedParticipant(null)}
                  me={isMe(selectedParticipant)}
                  toDetail={() => {
                    setSelectedParticipant(null)
                    setOpen(false)
                  }}
                />
              )}
            </div>
          </Box>
        </BlankLayout>
      </ESModal>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  loaderCenter: {
    textAlign: 'center',
  },
  countLabel: {
    marginLeft: 2,
    fontWeight: 400,
  },
  urlCopy: {
    cursor: 'pointer',
  },
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default Participants
