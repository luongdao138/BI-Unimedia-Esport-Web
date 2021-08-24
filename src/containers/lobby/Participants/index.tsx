import { useEffect, useState, createRef } from 'react'
import { Box, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import { LobbyDetail, ParticipantsItem } from '@services/lobby.service'
import useGetProfile from '@utils/hooks/useGetProfile'
import LobbyMemberItem from '@containers/Lobby/SubActionButtons/Partials/LobbyMemberItem'
import useLobbyActions from '../hooks/useLobbyActions'
import _ from 'lodash'
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { use100vh } from 'react-div-100vh'
import { useRect } from '@utils/hooks/useRect'

export interface ParticipantsProps {
  open: boolean
  handleClose: () => void
  data: LobbyDetail
}
const contentRef = createRef<HTMLDivElement>()

const Participants: React.FC<ParticipantsProps> = ({ open, data, handleClose }) => {
  const { t } = useTranslation(['common'])
  const unit = t('common:common.man')
  const hash_key = data.attributes.hash_key
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)
  const windowHeight = use100vh()

  const { height } = useRect(contentRef)

  const {
    participants,
    getParticipants,
    resetParticipants,
    resetMeta,
    participantsPageMeta,
    participantsMeta,
    follow,
    unFollow,
    unBlock,
  } = useLobbyActions()

  const { userProfile } = useGetProfile()

  const page = participantsPageMeta

  useEffect(() => {
    if (open) {
      getParticipants({ page: 1, hash_key: hash_key })
    } else {
      resetParticipants()
    }

    return () => {
      resetParticipants()
      resetMeta()
    }
  }, [open])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getParticipants({ page: page.current_page + 1, hash_key: hash_key })
  }

  const onFollow = (userCode: string) => {
    follow(userCode)
  }
  const onUnFollow = (userCode: string) => {
    unFollow(userCode)
  }
  const onUnBlock = (userCode: string) => {
    unBlock(userCode)
  }

  const goToProfile = (userCode: string) => {
    handleClose()
    router.push(`${ESRoutes.PROFILE}/${userCode}`)
  }

  return (
    <ESModal open={open} handleClose={handleClose}>
      <BlankLayout>
        <div ref={contentRef}>
          <Box pt={7.5} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">
                  {data.attributes.is_freezed ? t('common:tournament.participant.back') : t('common:tournament.entry_back')}
                </Typography>
              </Box>
            </Box>
            <Box py={2} textAlign="right" flexDirection="row" display="flex" alignItems="center" justifyContent="flex-end">
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="flex-end">
                  <Box mr={2}>
                    <Typography variant="h3" className={classes.countLabel}>
                      {data.attributes.is_freezed
                        ? t('common:tournament.number_of_participants')
                        : t('common:tournament.number_of_entries')}
                    </Typography>
                  </Box>
                  <Typography variant="h3" style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {data.attributes.is_freezed
                      ? data.attributes.participants_count
                      : data.attributes.participants_count + data.attributes.entry_count}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel}>
                    {unit}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel} style={{ fontSize: 20, marginLeft: 4 }}>
                    /
                  </Typography>

                  <Typography variant="h3" className={classes.countLabel} style={{ fontSize: 22 }}>
                    {data.attributes.max_participants}
                  </Typography>
                  <Typography variant="h3" className={classes.countLabel}>
                    {unit}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
        <div id="scrollableDiv" style={{ height: windowHeight - height, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
          {_.isArray(participants) && !_.isEmpty(participants) && open ? (
            <InfiniteScroll
              dataLength={participants.length}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
              scrollThreshold={0.99}
              style={{ overflow: 'hidden' }}
              loader={
                participantsMeta.pending && (
                  <div className={classes.loaderCenter}>
                    <ESLoader />
                  </div>
                )
              }
            >
              {participants.map((p: ParticipantsItem, i) => (
                <LobbyMemberItem
                  follow={onFollow}
                  unFollow={onUnFollow}
                  unBlock={onUnBlock}
                  goToProfile={goToProfile}
                  isMe={Number(userProfile.id) === _.get(p, 'attributes.user_id', '')}
                  data={p}
                  key={i}
                />
              ))}
            </InfiniteScroll>
          ) : null}
        </div>
      </BlankLayout>
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
