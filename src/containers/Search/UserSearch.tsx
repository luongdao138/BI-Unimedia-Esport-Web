import { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import useUserSearch from './useUserSearch'
import ESButton from '@components/Button'
// import ESToast from '@components/Toast'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
// import { useRouter } from 'next/router'

const UserSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  // const router = useRouter()
  const { searchUsers, userSearch, meta, page } = useUserSearch()

  useEffect(() => {
    userSearch({ page: 1, keyword: 'bab' })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    if (page && page.current_page !== page.total_pages) userSearch({ page: page.current_page + 1, keyword: '' })
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
                {user.attributes.isFollowed ? (
                  <ESButton variant="contained" color="primary" size="medium" round>
                    {t('common:home.unfollow')}
                  </ESButton>
                ) : (
                  <ESButton variant="outlined" size="medium" round>
                    {t('common:home.follow')}
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
    </>
  )
}

export default UserSearchContainer
