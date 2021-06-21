import { useEffect, useState } from 'react'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import UserListItem from '@components/UserItem'
import { Box, Typography, Button, DialogContent } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import useFollowing from './useFollowing'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { FollowResponse } from '@services/follow.service'

export interface ESFollowingProps {
  user_code: string
}

enum FOLLOWING_STATE_CHANGE_TYPE {
  FOLLOW = 1,
  UNFOLLOW = 0,
}

const ESFollowing: React.FC<ESFollowingProps> = ({ user_code }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { clearFollowing, following, fetchFollowing, increaseFollowing, decreaseFollowing, page, meta } = useFollowing()
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

  const changeFollowingCount = (type: number, user_code: string) => {
    if (type === FOLLOWING_STATE_CHANGE_TYPE.FOLLOW) {
      increaseFollowing(user_code)
    } else if (type === FOLLOWING_STATE_CHANGE_TYPE.UNFOLLOW) {
      decreaseFollowing(user_code)
    }
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: Array<FollowResponse> }) => {
    const { index, style, data } = props
    const user = data[index]
    return (
      <div style={style} key={index}>
        <UserListItem
          data={user}
          isFollowed={user.attributes.is_following}
          handleClose={() => setOpen(false)}
          changeFollowState={(type: number) => changeFollowingCount(type, user.attributes.user_code)}
        />
      </div>
    )
  }

  const itemCount = hasNextPage ? following.length + 1 : following.length

  return (
    <>
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
          <InfiniteLoader isItemLoaded={(index: number) => index < following.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
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
          {/* {following.length > 0 && page.total_pages > 0 && !hasNextPage ? (
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
