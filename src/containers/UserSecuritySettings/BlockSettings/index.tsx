import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import HeaderWithButton from '@components/HeaderWithButton'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import useBlockSettings from './useBlockSettings'
import { useRouter } from 'next/router'
import BlockedUserItem from './BlockedUserItem'

const ESBlockSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [hasMore, setHasMore] = useState(true)
  const { clearBlockedUsers, blockedUsers, fetchBlockedUsers, page } = useBlockSettings()

  useEffect(() => {
    fetchBlockedUsers({ page: 1 })
    return function clear() {
      clearBlockedUsers()
    }
  }, [])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchBlockedUsers({ page: page.current_page + 1 })
  }

  return (
    <div className={classes.wrap} id="scroll">
      <HeaderWithButton title={t('block_settings.title')} />

      <InfiniteScroll
        scrollableTarget={'test'}
        dataLength={0}
        next={fetchMoreData}
        hasMore={hasMore}
        height={500}
        loader={
          <div className={classes.loaderCenter}>
            <ESLoader />
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{t('infinite_scroll.message')}</b>
          </p>
        }
      >
        {blockedUsers.map((user, i) => (
          <Grid
            item
            xs={12}
            key={i}
            onClick={() => {
              router.push(`/profile/${user.attributes.user_code}`)
            }}
          >
            <BlockedUserItem data={user} key={i} />
          </Grid>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  loaderCenter: {
    textAlign: 'center',
  },
  wrap: {
    height: 'calc(100vh - 60px)',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
}))

export default ESBlockSettings
