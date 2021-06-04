import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import useInteresteds from './useInteresteds'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import { TournamentDetail } from '@services/arena.service'
import TeamItem from '../TeamItem'

interface InterestedListProps {
  tournament: TournamentDetail
  open: boolean
  handleClose: () => void
  onSelect: (participant) => void
}

const InterestedList: React.FC<InterestedListProps> = ({ tournament, open, handleClose, onSelect }) => {
  const data = tournament.attributes
  const hash_key = data.hash_key
  const isTeam = data.participant_type > 1
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)

  const { t } = useTranslation(['common'])
  const { interesteds, getInteresteds, resetMeta, page, meta } = useInteresteds()

  useEffect(() => {
    if (open) getInteresteds({ page: 1, hash_key: hash_key })

    return () => resetMeta()
  }, [open])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getInteresteds({ page: page.current_page + 1, hash_key: hash_key })
  }

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, nickname: participant.attributes.name, avatar: participant.attributes.avatar_url } }
  }

  return (
    <ESModal open={open} handleClose={handleClose}>
      <BlankLayout>
        <Box pt={7.5} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleClose}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{t('common:tournament.select_user')}</Typography>
            </Box>
          </Box>
          {meta.loaded && !interesteds.length && (
            <div className={classes.loaderCenter}>
              <Typography>{t('common:common.no_data')}</Typography>
            </div>
          )}
          <InfiniteScroll
            dataLength={interesteds.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              meta.pending && (
                <div className={classes.loaderCenter}>
                  <ESLoader />
                </div>
              )
            }
            height={600}
          >
            {isTeam
              ? interesteds.map((participant, i) => (
                  <TeamItem
                    name={participant.attributes.team.data.attributes.name}
                    avatar={participant.attributes.avatar_url}
                    key={i}
                    handleClick={() => {
                      onSelect(participant)
                    }}
                  />
                ))
              : interesteds.map((participant, i) => (
                  <UserListItem
                    data={userData(participant)}
                    key={i}
                    handleClick={() => {
                      onSelect(participant)
                    }}
                  />
                ))}
          </InfiniteScroll>
        </Box>
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

export default InterestedList
