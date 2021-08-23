import useCommunityByUserData from '@containers/Profile/Communities/useCommunityByUserData'
import React, { useEffect } from 'react'
import { Box, Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import CommunityCard from '@components/CommunityCard'
import { useTranslation } from 'react-i18next'
import ESLoader from '@components/Loader'

interface Props {
  userCode: string
}

const CommunityContainer: React.FC<Props> = ({ userCode }) => {
  const classes = useStyles()

  const { communities, meta, pages, fetchCommunityData, resetMeta } = useCommunityByUserData()
  const { t } = useTranslation(['common'])

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      fetchCommunityData({ page: Number(pages.current_page) + 1, user_code: userCode })
    }
  }

  useEffect(() => {
    fetchCommunityData({ page: 1, user_code: userCode })
    return () => resetMeta()
  }, [])

  return (
    <Grid container className={classes.content}>
      {communities && communities.length > 0
        ? communities &&
          communities.map((community, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.card}>
              <CommunityCard community={community} />
            </Grid>
          ))
        : meta.loaded && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="body1">{t('common:community.no_data')}</Typography>
              </Box>
            </Grid>
          )}
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
      {hasNextPage && (
        <Grid item xs={12} className={classes.loadMore} onClick={loadMore}>
          <Box display="flex" alignItems="center" justifyContent="center" mt={2} mb={2}>
            <Typography className={classes.marginRight}>{t('common:profile.read_more')}</Typography>
            <Icon className={'fa fa-angle-down'} fontSize="small" />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    paddingTop: 0,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(3.6),
    paddingLeft: theme.spacing(1),
  },
  marginRight: {
    marginRight: 8,
  },
  loadMore: {
    cursor: 'pointer',
  },
}))

export default CommunityContainer
