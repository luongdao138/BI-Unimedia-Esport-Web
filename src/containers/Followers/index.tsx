import { useEffect, useState } from 'react'
import { Box, Typography, Button, DialogContent } from '@material-ui/core'
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
    <>
      <Button onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{t('common:followers.title')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? FormatHelper.kFormatter(page.total_count) : 0}</Typography>
            <Typography>{t('common:followers.th')}</Typography>
          </Box>
        </Box>
      </Button>
      <ESDialog title={t('common:followers.title')} open={open} handleClose={() => setOpen(false)}>
        <DialogContent>
          <InfiniteLoader isItemLoaded={(index: number) => index < followers.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
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
          {/* {followers.length > 0 && page.total_pages > 0 && !hasNextPage ? (
            <p style={{ textAlign: 'center' }}>
              <b>{t('common:infinite_scroll.message')}</b>
            </p>
          ) : null} */}
          {meta.pending ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
        </DialogContent>
      </ESDialog>
    </>
  )
}

export default ESFollowers

const useStyles = makeStyles(() => ({
  rowContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  countContainer: {
    marginLeft: 8,
    alignItems: 'center',
  },
  count: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.white,
  },
  scroll: {
    overflow: 'overlay',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 0,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      color: 'red',
      opacity: 0,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      opacity: 0,
      borderRadius: 6,
    },
  },
  loader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
}))
