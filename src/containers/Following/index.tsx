import { useEffect, useState } from 'react'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import DialogContent from '@material-ui/core/DialogContent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Box, Typography, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import useFollowing from './useFollowing'
import { Colors } from '@theme/colors'

export interface ESFollowingProps {
  user_id: number
}

const useStyles = makeStyles(() => ({
  rowContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  countContainer: {
    marginLeft: 8,
    marginRight: 10,
  },
  count: {
    fontWeight: 'bold',
    color: Colors.white,
  },
}))

const ESFollowing: React.FC<ESFollowingProps> = ({ user_id }) => {
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { currentUser, following, fetchFollowing, page } = useFollowing()

  useEffect(() => {
    fetchFollowing({ page: 1, user_id: user_id == null ? currentUser.id : user_id })
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
    fetchFollowing({ page: page.current_page + 1, user_id: user_id })
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:following.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? page.total_count : 0}</Typography>
            <Typography>{t('common:following.th')}</Typography>
          </Box>
        </Box>
      </Button>
      <ESDialog title={t('common:following.title')} open={open} handleClose={handleClose}>
        <DialogContent>
          <InfiniteScroll
            dataLength={following.length}
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
