import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Container } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { LobbyDetail, ParticipantsItem } from '@services/lobby.service'
import useGetProfile from '@utils/hooks/useGetProfile'
import LobbyMemberItem from '@containers/Lobby/SubActionButtons/Partials/LobbyMemberItem'
import useLobbyActions from '../hooks/useLobbyActions'
import _ from 'lodash'
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { use100vh } from 'react-div-100vh'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import ParticipantCount from '@components/ParticipantCount'

export interface ParticipantsProps {
  open: boolean
  data: LobbyDetail
  handleClose: () => void
}

const Participants: React.FC<ParticipantsProps> = ({ open, data, handleClose }) => {
  const { t } = useTranslation(['common'])
  const unit = t('common:common.man')
  const hash_key = data.attributes.hash_key
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)
  const windowHeight = use100vh()
  const isAuth = useAppSelector(getIsAuthenticated)
  const { userProfile } = useGetProfile()
  const {
    participants,
    participantsMeta,
    participantsPageMeta,
    getParticipants,
    resetParticipants,
    resetMeta,
    follow,
    unFollow,
    unBlock,
  } = useLobbyActions()

  const currentPage = _.get(participantsPageMeta, 'current_page', 1)
  const totalPage = _.get(participantsPageMeta, 'total_pages', 1)
  const totalCount = _.get(participantsPageMeta, 'total_count', 0)
  const maxParticipants = _.get(data, 'attributes.max_participants', '')
  const [isInitialPageLoad, setInitialPageLoad] = useState(false)

  useEffect(() => {
    if (open) {
      setInitialPageLoad(true)
      getParticipants({ page: 1, hash_key: hash_key })
    }

    return () => {
      if (open) {
        resetParticipants()
        resetMeta()
        setHasMore(true)
        setInitialPageLoad(false)
      }
    }
  }, [open])

  useEffect(() => {
    if (isInitialPageLoad && !participantsMeta.pending) {
      setInitialPageLoad(false)
    }
  }, [isInitialPageLoad, participantsMeta.pending])

  const fetchMoreData = () => {
    if (currentPage >= totalPage) {
      setHasMore(false)
      return
    }
    getParticipants({ page: Number(currentPage) + 1, hash_key: hash_key })
  }

  const onFollow = (userCode: string) => follow(userCode)

  const onUnFollow = (userCode: string) => unFollow(userCode)

  const onUnBlock = (userCode: string) => unBlock(userCode)

  const goToProfile = (userCode: string) => router.push(`${ESRoutes.PROFILE}/${userCode}`)

  return (
    <ESModal open={open}>
      <Container className={classes.container} maxWidth="md">
        <div id="scrollableDiv" style={{ height: windowHeight }} className={`${classes.scroll} ${classes.list}`}>
          <Box className={classes.topContainer}>
            <Box className={classes.header} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">
                  {data.attributes.is_freezed ? t('common:tournament.participant.back') : t('common:tournament.entry_back')}
                </Typography>
              </Box>
            </Box>
            <Box
              className={classes.subHeader}
              textAlign="right"
              flexDirection="row"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <ParticipantCount
                label={
                  data.attributes.is_freezed ? t('common:tournament.number_of_participants') : t('common:tournament.number_of_entries')
                }
                total={totalCount}
                unit={unit}
                max={maxParticipants}
              />
            </Box>
          </Box>
          {isInitialPageLoad && participantsMeta.pending && (
            <div className={classes.loaderCenter}>
              <ESLoader />
            </div>
          )}
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
                  isMe={Number(_.get(userProfile, 'id', -1)) === _.get(p, 'attributes.user_id', '')}
                  isAuth={isAuth}
                  data={p}
                  key={i}
                />
              ))}
            </InfiniteScroll>
          ) : null}
        </div>
      </Container>
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
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  subHeader: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
    willChange: 'transform',
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
    container: {
      padding: 0,
    },
    header: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
}))

export default Participants
