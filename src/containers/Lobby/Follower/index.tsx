import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import useReturnHref from '@utils/hooks/useReturnHref'
import useLobbyData from '@containers/Home/useLobbyData'
import LobbyCard from '@components/LobbyCard'
import i18n from '@locales/i18n'

const LobbyFollowerContainer: React.FC = () => {
  const classes = useStyles()
  const { handleReturn } = useReturnHref()
  const { recentLobbies, getRecentLobbiesMeta, recentLobbiesPageMeta, getRecentLobbies } = useLobbyData()
  const meta = getRecentLobbiesMeta
  const pages = recentLobbiesPageMeta

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      getRecentLobbies({ page: pages.current_page + 1 })
    }
  }

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" className={classes.title}>
          {i18n.t('common:lobby.home.recent_lobbies_title')}
        </Typography>
      </Box>
      {meta && meta.loaded && !recentLobbies.length && (
        <Box display="flex" py={3} justifyContent="center" alignItems="center">
          <Typography>{i18n.t('common:lobby.home.recent_lobbies_empty')}</Typography>
        </Box>
      )}
      <InfiniteScroll
        className={classes.container}
        dataLength={recentLobbies.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={null}
        scrollThreshold="1px"
      >
        {recentLobbies.map((lobby, i) => (
          <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
            <LobbyCard lobby={lobby} />
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

export default LobbyFollowerContainer
