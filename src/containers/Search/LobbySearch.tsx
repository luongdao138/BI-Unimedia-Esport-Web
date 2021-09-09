import { useEffect, useState } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useLobbySearch from './useLobbySearch'
import ESLoader from '@components/Loader'
import LobbyCard from '@components/LobbyCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import { LobbyFilterOption } from '@services/lobby.service'

const LobbySearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { searchLobbies, searchLobby, page, meta, resetMeta, resetSearchLobbies } = useLobbySearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setKeyword(searchKeyword)
    searchLobby({ page: 1, keyword: searchKeyword, filter: LobbyFilterOption.all })

    return () => {
      resetSearchLobbies()
      resetMeta()
    }
  }, [searchKeyword])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      searchLobby({ page: page.current_page + 1, keyword: keyword, filter: LobbyFilterOption.all })
    }
  }

  return (
    <Grid container>
      {!!page && (
        <Grid item xs={12}>
          <Box pt={1} pb={2}>
            <Typography variant="caption" gutterBottom>
              {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
            </Typography>
          </Box>
        </Grid>
      )}
      <InfiniteScroll
        className={classes.container}
        dataLength={searchLobbies.length}
        next={loadMore}
        hasMore={page && page.current_page !== page.total_pages}
        loader={null}
        scrollThreshold="1px"
      >
        {searchLobbies.map((lobby, i) => (
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
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default LobbySearchContainer
