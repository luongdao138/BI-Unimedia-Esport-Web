import ButtonPrimary from '@components/ButtonPrimary'
import ESChip from '@components/Chip'
import ESLoader from '@components/Loader'
import LoginRequired from '@containers/LoginRequired'
import { Box, Grid, Typography } from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { CommunityFilterOption } from '@services/community.service'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import CommunityCard from '@components/CommunityCard'
import useCommunityHelper from './hooks/useCommunityHelper'
import useCommunityData from '@containers/Community/useCommunityData'
import InfiniteScroll from 'react-infinite-scroll-component'
import _ from 'lodash'

interface CommunityContainerProps {
  filter: CommunityFilterOption
}

const CommunityContainer: React.FC<CommunityContainerProps> = ({ filter }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { toCreate } = useCommunityHelper()
  const { communities, meta, loadMore, onFilterChange } = useCommunityData()

  useEffect(() => {
    loadMore()
  }, [communities])

  useEffect(() => {
    let filterVal = CommunityFilterOption.all

    if (_.has(router.query, 'filter')) {
      const queryFilterVal = _.get(router.query, 'filter') as CommunityFilterOption
      if (Object.values(CommunityFilterOption).includes(queryFilterVal)) filterVal = queryFilterVal
    }

    onFilterChange(filterVal)
  }, [router.query])

  const onFilter = (filter: CommunityFilterOption) => {
    router.push(`${ESRoutes.COMMUNITY}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  const defaultFilterOptions = [
    {
      type: CommunityFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
      loginRequired: false,
    },
    {
      type: CommunityFilterOption.joined,
      label: t('common:communitySearchFilters.joined'),
      loginRequired: false,
    },
    {
      type: CommunityFilterOption.organized,
      label: t('common:communitySearchFilters.organized'),
      loginRequired: false,
    },
  ]

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h2">{t('common:home.community')}</Typography>

        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {/* //TODO Change to community title */}
            {t('common:tournament_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </Box>
      <Grid container className={classes.content}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              key={option.type}
              color={option.type === filter ? 'primary' : undefined}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
        </Box>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={communities.length}
          next={loadMore}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
        >
          {communities.map((community, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
              <CommunityCard community={community} />
            </Grid>
          ))}
        </InfiniteScroll>
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
    '& .MuiButtonBase-root.button-primary': {
      padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  addIcon: {
    position: 'relative',
    left: theme.spacing(-1),
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default CommunityContainer
