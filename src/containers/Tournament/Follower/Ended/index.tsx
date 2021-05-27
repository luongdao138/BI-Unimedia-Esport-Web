import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TournamentCardResult from '@components/TournamentCard/Result'
import useEnded from './useEnded'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'

const FollowerEndedContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, tournamentResults, getTournamentResults, pages, resetMeta } = useEnded()
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getTournamentResults({ page: 1 })
    return () => resetMeta()
  }, [])

  const fetchMoreData = () => {
    if (pages.current_page >= pages.total_pages) {
      setHasMore(false)
      return
    }
    getTournamentResults({
      page: pages.current_page + 1,
    })
  }

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:tournament.follower_ended')}
        </Typography>
      </Box>
      <Grid container className={(classes.container, 'scroll-bar', 'card-container')}>
        <InfiniteScroll
          dataLength={tournamentResults.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className={classes.loaderCenter}>
              <ESLoader />
            </div>
          }
          height={600}
          endMessage={
            <Box textAlign="center" width="100%" my={3}>
              <Typography>{t('common:infinite_scroll.message')}</Typography>
            </Box>
          }
        >
          {tournamentResults.map((tournament, i) => (
            <Grid key={i} item xs={6} md={4}>
              <TournamentCardResult tournament={tournament} />
            </Grid>
          ))}
        </InfiniteScroll>
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  loaderCenter: {
    width: '100%',
    textAlign: 'center',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
}))

export default FollowerEndedContainer
