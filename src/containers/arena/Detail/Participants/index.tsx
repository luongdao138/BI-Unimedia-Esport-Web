import { MouseEventHandler, useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import ESLoader from '@components/Loader'
import useParticipants from './useParticipants'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import TeamMemberItemExpanded from '../Partials/TeamMemberItemExpanded'
import { ParticipantsResponse, TournamentDetail } from '@services/arena.service'
import { ROLE } from '@constants/tournament.constants'
import useGetProfile from '@utils/hooks/useGetProfile'
import _ from 'lodash'
import TeamEntryEditModal from '../Partials/ActionComponent/TeamEntryEditModal'
import InidividualEntryEditModal from '../Partials/ActionComponent/InidividualEntryEditModal'
import ESButton from '@components/Button'
import useReturnHref from '@utils/hooks/useReturnHref'
import ParticipantCount from '@components/ParticipantCount'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

export interface ParticipantsProps {
  detail: TournamentDetail
}

const Participants: React.FC<ParticipantsProps> = ({ detail }) => {
  const { t } = useTranslation(['common'])
  const data = detail?.attributes
  const isTeam = data?.participant_type > 1
  const unit = isTeam ? t('common:common.team') : t('common:common.man')
  const hash_key = data?.hash_key
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)
  const [selectedParticipant, setSelectedParticipant] = useState(null as ParticipantsResponse | null)
  const [members, setMembers] = useState([])
  const { participants, getParticipants, resetParticipants, resetMeta, page, meta, followStateChanged } = useParticipants()
  const totalCount = _.get(page, 'total_count', '')
  const { userProfile } = useGetProfile()
  const { handleReturn } = useReturnHref()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      getParticipants({ page: 1, hash_key: hash_key, role: data.is_freezed ? ROLE.PARTICIPANT : undefined })
    }
    return () => {
      resetParticipants()
      resetMeta()
    }
  }, [data])

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
    const interestedInfos = myInfo
      .filter((info) => info.role === ROLE.INTERESTED || info.role === ROLE.PARTICIPANT)
      .map((info) => `${info.team_id}`)
    if (!interestedInfos || !interestedInfos.length) return false
    return interestedInfos.includes(`${getTeamId(participant)}`)
  }

  const isMe = (participant: ParticipantsResponse) => {
    return `${userProfile?.id}` === `${_.get(participant, 'attributes.user.id', '')}`
  }

  const onTeamClick = (participant: ParticipantsResponse) => {
    setSelectedParticipant(participant)
  }

  const toDetail = () => {
    if (hash_key) {
      router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, hash_key))
    }
  }
  return (
    <div>
      {data && (
        <BlankLayout>
          <Box pt={7.5} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">
                  {data.is_freezed ? t('common:tournament.participants', { isTeam }) : t('common:tournament.entry_back')}
                </Typography>
              </Box>
            </Box>
            <Box py={2} textAlign="right" flexDirection="row" display="flex" alignItems="center" justifyContent="flex-end">
              <ParticipantCount
                label={data.is_freezed ? t('common:tournament.number_of_participants') : t('common:tournament.number_of_entries')}
                total={totalCount}
                max={data.max_participants}
                unit={unit}
              />
            </Box>
            <div id="scrollableDiv" className={`${classes.scroll} ${classes.list}`}>
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
                          onFollowStateChange={followStateChanged}
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
            </div>
          </Box>
        </BlankLayout>
      )}
      {!selectedParticipant ? null : isTeam ? (
        <TeamEntryEditModal
          tournament={detail}
          userProfile={userProfile}
          previewMode
          open={true}
          initialTeamId={getTeamId(selectedParticipant)}
          onClose={() => setSelectedParticipant(null)}
          myTeam={isMyTeam(selectedParticipant)}
          toDetail={toDetail}
        />
      ) : (
        <InidividualEntryEditModal
          tournament={detail}
          previewMode
          open={true}
          initialParticipantId={`${selectedParticipant.id}`}
          onClose={() => setSelectedParticipant(null)}
          me={isMe(selectedParticipant)}
          toDetail={toDetail}
        />
      )}
    </div>
  )
}

interface ParticipantsButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  isFreezed: boolean
  isTeam: boolean
}

export const ParticipantsButton: React.FC<ParticipantsButtonProps> = ({ onClick, isFreezed, isTeam }) => {
  const { t } = useTranslation('common')
  return (
    <ESButton variant="outlined" fullWidth onClick={onClick}>
      {isFreezed ? t('tournament.participants', { isTeam }) : t('tournament.entry_members')}
    </ESButton>
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
    height: 600,
    paddingRight: 10,
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
  [theme.breakpoints.down('md')]: {
    topContainer: {
      paddingTop: 0,
    },
    list: {
      height: 'Calc(100vh - 131px)',
    },
  },
}))

export default Participants
