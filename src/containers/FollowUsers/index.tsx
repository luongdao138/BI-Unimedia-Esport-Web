import { useEffect, useState } from 'react'
import { Box, Typography, Button, DialogContent } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESLoader from '@components/Loader'
import UserRow from './partials/UserRow'
import { FOLLOW_STATES } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import useData from './useData'

export interface FollowUsersProps {
  user_code: string
  fromType: FOLLOW_STATES.FOLLOWERS | FOLLOW_STATES.FOLLOWING
}

const FollowUsers: React.FC<FollowUsersProps> = ({ user_code, fromType }) => {
  const classes = useStyles()
  const isOthers = user_code !== null
  const [open, setOpen] = useState(false)

  const { t } = useTranslation(['common'])
  const { clearUsers, users, fetchUsers, follow, unfollow, page, meta } = useData(fromType)
  const hasNextPage = page && page.current_page !== page.total_pages

  useEffect(() => {
    const params = { page: 1 }
    if (user_code != null) {
      _.merge(params, { user_code: user_code })
    }
    fetchUsers(params)
    return function clear() {
      clearUsers()
    }
  }, [user_code])

  const loadMore = () => {
    if (hasNextPage) {
      fetchUsers({ page: page.current_page + 1, user_code: user_code })
    }
  }

  const changeFollowingCount = (type: number, user_code: string) => {
    if (type === FOLLOW_STATES.FOLLOW) {
      follow(user_code, isOthers)
    } else if (type === FOLLOW_STATES.UNFOLLOW) {
      unfollow(user_code, isOthers)
    }
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const user = data[index]
    return (
      <div style={style} key={index}>
        <UserRow
          user={user?.attributes}
          handleClose={() => setOpen(false)}
          changeFollowState={(type: number) => changeFollowingCount(type, user.attributes.user_code)}
        />
      </div>
    )
  }

  const itemCount = hasNextPage ? users.length + 1 : users.length
  const title = fromType === FOLLOW_STATES.FOLLOWERS ? t('common:followers.title') : t('common:following.title')
  return (
    <>
      <Button onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
        <Box display="flex" className={classes.rowContainer}>
          <Typography>{title}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.count}>{page ? FormatHelper.kFormatter(page.total_count) : ''}</Typography>
            <Typography>{page ? t('common:followers.th') : ''}</Typography>
          </Box>
        </Box>
      </Button>
      <ESDialog
        title={title}
        open={open}
        handleClose={() => setOpen(false)}
        classes={{
          paperFullWidth: classes.dialogFullWidth,
          paper: classes.dialogPaper,
        }}
      >
        <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
          <InfiniteLoader isItemLoaded={(index: number) => index < users.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
                height={innerHeight - 200}
                width={'100%'}
                itemCount={users.length}
                itemData={users}
                itemSize={66}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
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

export default FollowUsers

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
