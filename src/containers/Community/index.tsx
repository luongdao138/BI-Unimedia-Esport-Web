import ButtonPrimary from '@components/ButtonPrimary'
import ESChip from '@components/Chip'
import LoginRequired from '@containers/LoginRequired'
import { Box, Grid, Typography } from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { CommunityFilterOption } from '@services/community.service'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import CommunityCard from '@components/CommunityCard'
import useCommunityHelper from './hooks/useCommunityHelper'

interface CommunityContainerProps {
  filter: CommunityFilterOption
}

const CommunityContainer: React.FC<CommunityContainerProps> = ({ filter }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { toCreate } = useCommunityHelper()

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
      type: CommunityFilterOption.participating,
      label: t('common:communitySearchFilters.participating'),
      loginRequired: false,
    },
    {
      type: CommunityFilterOption.managing,
      label: t('common:communitySearchFilters.managing'),
      loginRequired: false,
    },
  ]

  const testCommunities = [
    {
      attributes: {
        title: 'longtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlename',
        hash_key: '1234567890',
        member_count: 3,
        is_official: false,
        status: 1,
        description: 'Description goes. Description goes. Description goes. Explanation is included ...asdasdasdasdasdasdasdasdasd',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/a2718dbb-9d3a-48f9-8472-9fe5b0006a64/1625621403-31.png',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'dulguun2',
            profile_image: null,
          },
          {
            nickname: 'bat',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
        ],
      },
    },
    {
      attributes: {
        title: 'testLobby2',
        hash_key: '12345678190',
        member_count: 1,
        is_official: true,
        description: 'Description goes. Description goes. Description goes. Explanation is included ...',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/3e45db5a-be7f-4417-be09-3af6a3085b63/1625755001-31.jpg',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'aulguun2',
            profile_image: null,
          },
          {
            nickname: 'sat',
            profile_image: null,
          },
          {
            nickname: 'frdene',
            profile_image: null,
          },
        ],
      },
    },
    {
      attributes: {
        title: 'testLobby2111',
        hash_key: '12345678190',
        member_count: 1,
        is_official: true,
        description: '',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/3e45db5a-be7f-4417-be09-3af6a3085b63/1625755001-31.jpg',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'aulguun2',
            profile_image: null,
          },
          {
            nickname: 'sat',
            profile_image: null,
          },
          {
            nickname: 'frdene',
            profile_image: null,
          },
        ],
      },
    },
    {
      attributes: {
        title: 'longtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlename',
        hash_key: '1234567890',
        member_count: 3,
        is_official: false,
        status: 1,
        description: 'Description goes. Description goes. Description goes. Explanation is included ...asdasdasdasdasdasdasdasdasd',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/a2718dbb-9d3a-48f9-8472-9fe5b0006a64/1625621403-31.png',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'dulguun2',
            profile_image: null,
          },
          {
            nickname: 'bat',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
        ],
      },
    },
    {
      attributes: {
        title: 'longtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlename',
        hash_key: '1234567890',
        member_count: 3,
        is_official: false,
        status: 1,
        description: 'Description goes. Description goes. Description goes. Explanation is included ...asdasdasdasdasdasdasdasdasd',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/a2718dbb-9d3a-48f9-8472-9fe5b0006a64/1625621403-31.png',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'dulguun2',
            profile_image: null,
          },
          {
            nickname: 'bat',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
        ],
      },
    },
    {
      attributes: {
        title: 'longtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlenamelongtitlename',
        hash_key: '1234567890',
        member_count: 3,
        is_official: false,
        status: 1,
        description: 'Description goes. Description goes. Description goes. Explanation is included ...asdasdasdasdasdasdasdasdasd',
        cover:
          'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/tournaments/a2718dbb-9d3a-48f9-8472-9fe5b0006a64/1625621403-31.png',
        tags: [
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
          {
            name: 'Newbie',
          },
          {
            name: 'enjoyers',
          },
          {
            name: 'match',
          },
        ],
        participants: [
          {
            nickname: 'dulguun2',
            profile_image: null,
          },
          {
            nickname: 'bat',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
          {
            nickname: 'erdene',
            profile_image: null,
          },
        ],
      },
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
        {/* <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={community.length}
          next={loadMore}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
        >
        </InfiniteScroll> */}
        {testCommunities.map((community, i) => (
          <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
            <CommunityCard community={community} />
          </Grid>
        ))}
        {/* {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )} */}
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
