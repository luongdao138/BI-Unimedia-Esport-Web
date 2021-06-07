import { useEffect } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TournamentCardFollow from '@components/TournamentCard'
import useEntering from './useEntering'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'

const FollowerEnteringContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, tournamentFollowers, getTournamentFollowers, pages, meta, resetMeta } = useEntering()

  useEffect(() => {
    getTournamentFollowers({
      page: 1,
    })
    return () => resetMeta()
  }, [])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      getTournamentFollowers({
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
        <Typography variant="h2" noWrap>
          {t('common:tournament.follower_entering')}
        </Typography>
      </Box>
      <InfiniteScroll
        className={classes.container}
        dataLength={tournamentFollowers.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={null}
        scrollThreshold="1px"
      >
        {tournamentFollowers.map((tournament, i) => (
          <Grid key={i} item xs={6} md={4}>
            <TournamentCardFollow tournament={tournament} />
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

export default FollowerEnteringContainer
