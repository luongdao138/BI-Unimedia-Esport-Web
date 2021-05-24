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
import _ from 'lodash'
import { FormatHelper } from '@utils/helpers/FormatHelper'

export interface ESFollowingProps {
  user_code: string
}

const ESFollowing: React.FC<ESFollowingProps> = ({ user_code }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { clearFollowing, following, fetchFollowing, page } = useFollowing()
  const hasNextPage = page && page.current_page !== page.total_pages

  useEffect(() => {
    const params = { page: 1 }
    if (user_code != null) {
      _.merge(params, { user_code: user_code })
    }
    fetchFollowing(params)
    return function clear() {
      clearFollowing()
    }
  }, [user_code])

  const loadMore = () => {
    if (hasNextPage) {
      fetchFollowing({ page: page.current_page + 1, user_code: user_code })
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:following.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? FormatHelper.kFormatter(page.total_count) : 0}</Typography>
          </Box>
          <Typography>{t('common:following.th')}</Typography>
        </Box>
      </Button>
      <ESDialog title={t('common:following.title')} open={open} handleClose={() => setOpen(false)}>
        <DialogContent>
          <InfiniteScroll
            dataLength={following.length}
            next={loadMore}
            hasMore={hasNextPage}
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
            {following.map((user, i) => (
              <UserListItem data={user} key={i} isFollowed={user.attributes.is_following} handleClose={() => setOpen(false)} />
            ))}
          </InfiniteScroll>
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowing

const useStyles = makeStyles(() => ({
  rowContainer: {
    fontSize: 14,
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
