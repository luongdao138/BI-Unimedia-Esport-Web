import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon } from '@material-ui/core'
import useUserSearch from './useUserSearch'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import _ from 'lodash'

const UserSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { searchUsers, userSearch, meta, page } = useUserSearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      const keyword = router.query.keyword ? router.query.keyword.toString() : ''
      setKeyword(keyword)
      userSearch({ page: 1, keyword: keyword })
    }
  }, [router.query])

  useEffect(() => {
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
    if (page && page.current_page !== page.total_pages) userSearch({ page: page.current_page + 1, keyword: keyword })
  }, [searchUsers])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    if (page && page.current_page !== page.total_pages) userSearch({ page: page.current_page + 1, keyword: '' })
  }

  return (
    <Grid container className={classes.container}>
      <Box pb={3} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:user.user_results')}
        </Typography>
      </Box>
      {!!page && (
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
          </Typography>
        </Grid>
      )}
      {searchUsers.map((user, i) => (
        <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} />
      ))}
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
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[1000]}80`,
    },
  },
  container: {
    padding: 24,
    paddingTop: 16,
  },
}))

export default UserSearchContainer
