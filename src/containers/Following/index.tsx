import { useEffect, useState } from 'react'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import { Box, Typography, Button, Grid, DialogContent } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import useFollowing from './useFollowing'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

export interface ESFollowingProps {
  user_code: string
}

const ESFollowing: React.FC<ESFollowingProps> = ({ user_code }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { clearFollowing, following, fetchFollowing, page, meta } = useFollowing()
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

  const Row = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const user = data[index]
    return (
      <div style={style} key={index}>
        <UserListItem data={user} isFollowed={user.attributes.is_following} handleClose={() => setOpen(false)} />
      </div>
    )
  }

  const itemCount = hasNextPage ? following.length + 1 : following.length

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
        <DialogContent className={'scroll-bar'}>
          <InfiniteLoader isItemLoaded={(index: number) => index < following.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                height={800}
                width={'100%'}
                itemCount={following.length}
                itemData={following}
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
