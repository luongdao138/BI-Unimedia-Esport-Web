import { useEffect, useState } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useCommunitySearch from './useCommunitySearch'
import ESLoader from '@components/Loader'
import CommunityCard from '@components/CommunityCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'

const CommunitySearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { communityResult, searchCommunity, resetMeta, resetSearchCommunity, meta, page } = useCommunitySearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setKeyword(searchKeyword)
    searchCommunity({ page: 1, keyword: searchKeyword })

    return () => {
      resetSearchCommunity()
      resetMeta()
    }
  }, [searchKeyword])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      searchCommunity({ page: page.current_page + 1, keyword: keyword })
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
        dataLength={communityResult.length}
        next={loadMore}
        hasMore={page && page.current_page !== page.total_pages}
        loader={null}
        scrollThreshold="1px"
      >
        {communityResult.map((item, i) => (
          <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
            <CommunityCard community={item} />
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

export default CommunitySearchContainer
