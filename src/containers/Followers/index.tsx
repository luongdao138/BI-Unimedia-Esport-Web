import { useEffect, useState } from 'react'
import ESButton from '@components/Button'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import useFollowers from '../../containers/Followers/useFollowers'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import DialogContent from '@material-ui/core/DialogContent'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface ESFollowersProps {
  user_id: number
}

const ESFollowers: React.FC<ESFollowersProps> = ({ user_id }) => {
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { t } = useTranslation(['common'])

  const { followers, fetchFollowers, page } = useFollowers()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    fetchFollowers({ page: 1, user_id: user_id })
  }, [])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchFollowers({ page: page.current_page + 1, user_id: user_id })
  }

  return (
    <div>
      <ESButton onClick={handleClickOpen}>
        <span style={{ fontSize: 14, fontWeight: 'normal' }}>{t('common:followers.title')}</span>
        <label style={{ marginLeft: 5, color: 'white', fontSize: 24, fontWeight: 'bold' }}>{page ? page.total_count : 0}</label>
        <span style={{ marginLeft: 5 }}>{t('common:followers.th')}</span>
      </ESButton>
      <ESDialog open={open} title={t('common:followers.title')} handleClose={handleClose}>
        <DialogContent>
          <InfiniteScroll
            dataLength={followers.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<ESLoader />}
            height={500}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>{t('common:infinite_scroll.message')}</b>
              </p>
            }
          >
            {followers.map((user, i) => (
              <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} />
            ))}
          </InfiniteScroll>
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowers
