import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import useBlockSettings from './useBlockSettings'
import BlockedUserItem from './BlockedUserItem'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'

const ESBlockSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const { clearBlockedUsers, blockedUsers, fetchBlockedUsers, pages, meta } = useBlockSettings()

  useEffect(() => {
    return () => clearBlockedUsers()
  }, [])

  useEffect(() => {
    fetchBlockedUsers({
      page: 1,
    })
  }, [])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      fetchBlockedUsers({
        page: Number(pages.current_page) + 1,
      })
    }
  }

  return (
    <div>
      <HeaderWithButton title={t('block_settings.title')} />
      <InfiniteScroll
        dataLength={blockedUsers.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={
          meta.pending && (
            <div className={classes.loaderCenter}>
              <ESLoader />
            </div>
          )
        }
        scrollThreshold="1px"
      >
        {blockedUsers.map((user, i) => (
          <BlockedUserItem data={user} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    marginTop: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
  },
}))

export default ESBlockSettings
