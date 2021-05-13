import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import useFollowers from '../../containers/Followers/useFollowers'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import DialogContent from '@material-ui/core/DialogContent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'

export interface ESFollowersProps {
  user_id?: number
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

const ESFollowers: React.FC<ESFollowersProps> = ({ user_id }) => {
  const classes = useStyles()
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
    const params = { page: 1 }
    if (user_id != null) {
      _.merge(params, { user_id: user_id })
    }
    fetchFollowers(params)
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
      <Button onClick={handleClickOpen}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:followers.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? page.total_count : 0}</Typography>
            <Typography>{t('common:followers.th')}</Typography>
          </Box>
        </Box>
      </Button>
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
