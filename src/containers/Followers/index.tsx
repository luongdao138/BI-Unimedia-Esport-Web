import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import useFollowers from './useFollowers'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import DialogContent from '@material-ui/core/DialogContent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'

export interface ESFollowersProps {
  user_code?: string
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
    fontSize: 24,
    color: Colors.white,
  },
  loaderCenter: {
    textAlign: 'center',
  },
}))

const ESFollowers: React.FC<ESFollowersProps> = ({ user_code }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { t } = useTranslation(['common'])
  const { clearFollowers, followers, fetchFollowers, page } = useFollowers()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const params = { page: 1 }
    if (user_code != null) {
      _.merge(params, { user_code: user_code })
    }
    fetchFollowers(params)
    return function clear() {
      clearFollowers()
    }
  }, [user_code])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchFollowers({ page: page.current_page + 1, user_code: user_code })
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:followers.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? page.total_count : 0}</Typography>
          </Box>
          <Typography>{t('common:followers.th')}</Typography>
        </Box>
      </Button>
      <ESDialog open={open} title={t('common:followers.title')} handleClose={handleClose}>
        <DialogContent>
          <InfiniteScroll
            dataLength={followers.length}
            next={fetchMoreData}
            hasMore={hasMore && followers.length > 0}
            loader={
              <div className={classes.loaderCenter}>
                <ESLoader />
              </div>
            }
            height={600}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>{t('common:infinite_scroll.message')}</b>
              </p>
            }
          >
            {followers.map((user, i) => (
              <UserListItem data={user} key={i} isFollowed={user.attributes.is_followed} handleClose={handleClose} />
            ))}
          </InfiniteScroll>
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowers
