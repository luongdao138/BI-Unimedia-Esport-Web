import { useEffect, useState } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useUserSearch from './useUserSearch'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'

const UserSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { searchUsers, userSearch, page, meta, resetMeta, resetSearchUsers } = useUserSearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setKeyword(searchKeyword)
    userSearch({ page: 1, keyword: searchKeyword })

    return () => {
      resetSearchUsers()
      resetMeta()
    }
  }, [searchKeyword])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      userSearch({ page: page.current_page + 1, keyword: keyword })
    }
  }

  return (
    <Grid container>
      {!!page && (
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
          </Typography>
        </Grid>
      )}
      <InfiniteScroll
        className={classes.container}
        dataLength={searchUsers.length}
        next={loadMore}
        hasMore={page && page.current_page !== page.total_pages}
        loader={null}
        scrollThreshold="1px"
      >
        {searchUsers.map((user, i) => (
          <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} />
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

export default UserSearchContainer
