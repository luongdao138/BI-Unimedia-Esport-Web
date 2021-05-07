import { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import useUserSearch from './useUserSearch'
import ESButton from '@components/Button'
import ESToast from '@components/Toast'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'

const UserSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const { searchUsers, userSearch, meta, resetMeta, paginationMeta } = useUserSearch()

  useEffect(() => {
    userSearch({ page: 1, keyword: 'bab' })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [paginationMeta])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return

    if (paginationMeta && paginationMeta.current_page !== paginationMeta.total_pages)
      userSearch({ page: paginationMeta.current_page + 1, keyword: 'bab' })
  }

  return (
    <>
      <Grid container>
        {searchUsers.map((user, i) => (
          <UserListItem
            data={user}
            key={i}
            rightItem={
              <Box flexShrink={0}>
                {user.isFollowed ? (
                  <ESButton variant="contained" color="primary" size="medium" round>
                    フォロー中
                  </ESButton>
                ) : (
                  <ESButton variant="outlined" size="medium" round>
                    フォローする
                  </ESButton>
                )}
              </Box>
            }
          />
        ))}
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Grid>
      {!!meta.error && <ESToast open={!!meta.error} message={t('common:error.login_failed')} resetMeta={resetMeta} />}
    </>
  )
}

export default UserSearchContainer
