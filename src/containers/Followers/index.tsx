import { useEffect, useState } from 'react'
import { Box, Typography, Button, Grid, DialogContent } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import useFollowers from './useFollowers'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

export interface ESFollowersProps {
  user_code?: string
}

const ESFollowers: React.FC<ESFollowersProps> = ({ user_code }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const { t } = useTranslation(['common'])
  const { clearFollowers, followers, fetchFollowers, page, meta } = useFollowers()
  const hasNextPage = page && page.current_page !== page.total_pages

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

  const loadMore = () => {
    if (hasNextPage) {
      fetchFollowers({ page: page.current_page + 1, user_code: user_code })
    }
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const user = data[index]
    return (
      <div style={style} key={index}>
        <UserListItem data={user} isFollowed={user.attributes.is_following} handleClose={() => setOpen(false)} />
      </div>
    )
  }

  const itemCount = hasNextPage ? followers.length + 1 : followers.length

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:followers.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? FormatHelper.kFormatter(page.total_count) : 0}</Typography>
          </Box>
          <Typography>{t('common:followers.th')}</Typography>
        </Box>
      </Button>
      <ESDialog open={open} title={t('common:followers.title')} handleClose={() => setOpen(false)}>
        <DialogContent className={'scroll-bar'}>
          <InfiniteLoader isItemLoaded={(index: number) => index < followers.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                height={800}
                width={'100%'}
                itemCount={followers.length}
                itemData={followers}
                itemSize={66}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
          {meta.pending ? (
            <Grid item xs={12}>
              <Box my={4} display="flex" justifyContent="center" alignItems="center">
                <ESLoader />
              </Box>
            </Grid>
          ) : !hasNextPage ? (
            <p style={{ textAlign: 'center' }}>
              <b>{t('common:infinite_scroll.message')}</b>
            </p>
          ) : null}
        </DialogContent>
      </ESDialog>
    </div>
  )
}

export default ESFollowers

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
