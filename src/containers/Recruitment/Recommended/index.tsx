import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import RecruitmentCard from '@components/RecruitmentCard'
import useRecommended from './useRecommended'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'

const RecruitmentRecommendedContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { recommendedRecruitments, getRecruitmentRecommendations, handleClick, pages, resetMeta } = useRecommended()
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getRecruitmentRecommendations({ page: 1 })
    return () => resetMeta()
  }, [])

  const fetchMoreData = () => {
    if (pages.current_page >= pages.total_pages) {
      setHasMore(false)
      return
    }
    getRecruitmentRecommendations({
      page: pages.current_page + 1,
    })
  }

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:recruitment.recommended_recruitment_list')}
        </Typography>
      </Box>
      <Grid container className={(classes.container, 'scroll-bar', 'card-container')}>
        <InfiniteScroll
          dataLength={recommendedRecruitments.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className={classes.loaderCenter}>
              <ESLoader />
            </div>
          }
          height={600}
          endMessage={
            <Box textAlign="center" width="100%" my={3}>
              <Typography>{t('common:infinite_scroll.message')}</Typography>
            </Box>
          }
        >
          {recommendedRecruitments.map((recruitment, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
              <RecruitmentCard recruitment={recruitment} />
            </Grid>
          ))}
        </InfiniteScroll>
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  loaderCenter: {
    width: '100%',
    textAlign: 'center',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
}))

export default RecruitmentRecommendedContainer
