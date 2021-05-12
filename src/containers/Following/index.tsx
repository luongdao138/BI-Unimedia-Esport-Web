import { useEffect, useState } from 'react'
import ESButton from '@components/Button'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import DialogContent from '@material-ui/core/DialogContent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useFollowing from './useFollowing'

const ESFollowing: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { t } = useTranslation(['common'])
  const { currentUser, following, fetchFollowing, page } = useFollowing()

  useEffect(() => {
    fetchFollowing({ page: 1, user_id: currentUser.id })
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchFollowing({ page: page.current_page + 1, user_id: currentUser.id })
  }

  return (
    <div>
      <ESButton onClick={handleClickOpen}>
        <span style={{ fontSize: 14, fontWeight: 'normal' }}>{t('common:following.title')}</span>
        <label style={{ marginLeft: 5, color: 'white', fontSize: 24, fontWeight: 'bold' }}>{page ? page.total_count : 0}</label>
        <span style={{ marginLeft: 5 }}>{t('common:following.th')}</span>
      </ESButton>
      <ESDialog title={t('common:following.title')} open={open} handleClose={handleClose}>
        <DialogContent>
          <InfiniteScroll
            dataLength={following.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<ESLoader />}
            height={400}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>{t('common:infinite_scroll.message')}</b>
              </p>
            }
          >
            {following.map((user, i) => (
              <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} />
            ))}
          </InfiniteScroll>
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowing
