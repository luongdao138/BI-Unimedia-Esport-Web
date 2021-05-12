import { useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'

import ESButton from '@components/Button'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'

import useFollowers from '../../containers/Followers/useFollowers'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import DialogContent from '@material-ui/core/DialogContent'

const ESFollowers: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['common'])
  const { currentUser, users, followers, meta, page } = useFollowers()

  useEffect(() => {
    followers({ page: 1, user_id: currentUser.id })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    if (page && page.current_page !== page.total_pages) {
      //   followers({ page: page.current_page + 1, user_id: currentUser.id })
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <ESButton onClick={handleClickOpen}>{t('common:followers.title')}</ESButton>
      <label style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{users.length}</label>
      <span>{t('common:followers.th')}</span>
      <ESDialog open={open} handleClose={handleClose}>
        <DialogContent>
          {users.map((user, i) => (
            <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} />
          ))}
          {meta.pending && (
            <Grid item xs={12}>
              <Box my={4} display="flex" justifyContent="center" alignItems="center">
                <ESLoader />
              </Box>
            </Grid>
          )}
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowers
