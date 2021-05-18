import { useEffect, useState } from 'react'
import { Box, Typography, Button, IconButton, Icon, Theme } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import useParticipants from './useParticipants'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import TeamMemberItem from '../Partials/TeamMemberItem'

export interface ParticipantsProps {
  hash_key: string
  isTeam: boolean
}

const Participants: React.FC<ParticipantsProps> = ({ hash_key, isTeam }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { t } = useTranslation(['common'])
  const { participants, getParticipants, resetMeta, page } = useParticipants()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      getParticipants({ page: 1, hash_key: hash_key })
    }

    return () => {
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

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, avatar: participant.attributes.avatar_url } }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Typography>{t('common:followers.title')}</Typography>
      </Button>
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
            <Box py={2} textAlign="right" flexDirection="row" display="flex" justifyContent="flex-end">
              <Typography variant="h2">エントリー数</Typography>
              <Typography variant="h2">999</Typography>
              <Typography variant="h2">人</Typography>
              <Typography variant="h2">/</Typography>
              <Typography variant="h2">999</Typography>
              <Typography variant="h2">人</Typography>
              <Icon className="fa fa-upload" fontSize="small" />
            </Box>
            <InfiniteScroll
              dataLength={participants.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className={classes.loaderCenter}>
                  <ESLoader />
                </div>
              }
              height={600}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>{t('common:infinite_scroll.message')}</b>
                </p>
              }
            >
              {isTeam
                ? participants.map((participant, i) => <TeamMemberItem key={`team${i}`} team={participant} />)
                : participants.map((participant, i) => (
                    <UserListItem data={userData(participant)} key={i} isFollowed={participant.attributes.is_followed} />
                  ))}
            </InfiniteScroll>
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
