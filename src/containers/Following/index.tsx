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
import { FollowResponse } from '@services/user.service'

export interface ESFollowingProps {
  user_code: string
  isOthers: boolean
}

enum FOLLOWING_STATE_CHANGE_TYPE {
  FOLLOW = 1,
  UNFOLLOW = 0,
}

const ESFollowing: React.FC<ESFollowingProps> = ({ user_code, isOthers }) => {
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
      increaseFollowing(user_code, isOthers)
    } else if (type === FOLLOWING_STATE_CHANGE_TYPE.UNFOLLOW) {
      decreaseFollowing(user_code, isOthers)
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
            <Typography>{t('common:following.th')}</Typography>
          </Box>
        </Box>
      </Button>
      <ESDialog
        title={t('common:following.title')}
        open={open}
        handleClose={() => setOpen(false)}
        classes={{
          paperFullWidth: classes.dialogFullWidth,
          paper: classes.dialogPaper,
        }}
      >
        <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
          <InfiniteLoader isItemLoaded={(index: number) => index < following.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
                height={innerHeight - 200}
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
  dialogFullWidth: {
    width: '90%',
  },
  dialogPaper: {
    marginLeft: 24,
    marginRight: 0,
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
