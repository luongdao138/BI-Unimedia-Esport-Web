import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useArenaHome from './useArenaHome'
import ESLoader from '@components/Loader'
import TournamentCard from '@components/TournamentCard'
import ButtonPrimary from '@components/ButtonPrimary'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import useArenaHelper from '../hooks/useArenaHelper'

const ArenaHome: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { arenas, page, meta, loadMore } = useArenaHome()
  const { toCreate } = useArenaHelper()

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">アリーナ</Typography>
        <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
          <AddRounded className={classes.addIcon} />
          {t('common:tournament_create.title')}
        </ButtonPrimary>
      </div>
      <Grid container className={classes.content}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={arenas.length}
          next={loadMore}
          hasMore={page && page.current_page !== page.total_pages}
          loader={null}
          scrollThreshold="1px"
        >
          {arenas.map((tournament, i) => (
            <Grid key={i} item xs={6} md={4}>
              <TournamentCard tournament={tournament} />
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
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
    borderBottom: `1px solid ${Colors.white_opacity['30']}`,
    '& .MuiButtonBase-root.button-primary': {
      padding: '12px 16px',
    },
  },
  addIcon: {
    position: 'relative',
    left: -8,
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default ArenaHome
