import { useEffect } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TournamentCardResult from '@components/TournamentCard'
import useEnded from './useEnded'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'

const FollowerEndedContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, tournamentResults, getTournamentResults, pages, meta, resetMeta } = useEnded()

  useEffect(() => {
    getTournamentResults({ page: 1 })
    return () => resetMeta()
  }, [])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      getTournamentResults({
        page: pages.current_page + 1,
      })
    }
  }

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" className={classes.title}>
          {t('common:tournament.follower_ended')}
        </Typography>
      </Box>
      {meta && meta.loaded && !tournamentResults.length && (
        <Box display="flex" py={3} justifyContent="center" alignItems="center">
          <Typography>{t('common:tournament.no_data.followers_entering_results')}</Typography>
        </Box>
      )}
      <InfiniteScroll
        className={classes.container}
        dataLength={tournamentResults.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={null}
        scrollThreshold="1px"
      >
        {tournamentResults.map((tournament, i) => (
          <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
            <TournamentCardResult tournament={tournament} />
          </Grid>
        ))}
      </InfiniteScroll>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
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
