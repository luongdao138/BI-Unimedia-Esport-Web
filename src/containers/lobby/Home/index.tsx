import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { TournamentFilterOption, TournamentListItem } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import ESChip from '@components/Chip'
import LoginRequired from '@containers/LoginRequired'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLobbyHelper from '../hooks/useLobbyHelper'
import LobbyCard from '@components/LobbyCard'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import ESLoader from '@components/Loader'
// import useLobbyHome from './useLobbyHome'
// import { useEffect } from 'react'

interface LobbyHomeProps {
  filter: TournamentFilterOption
}

const LobbyHome: React.FC<LobbyHomeProps> = ({ filter }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  // const { arenas, meta, loadMore, onFilterChange } = useLobbyHome()
  const router = useRouter()
  const { toCreate } = useLobbyHelper()

  // useEffect(() => {
  //   if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
  //   loadMore()
  // }, [arenas])

  // useEffect(() => {
  //   onFilterChange(filter)
  // }, [filter])

  const onFilter = (filter: TournamentFilterOption) => {
    router.push(`${ESRoutes.LOBBY}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  const defaultFilterOptions = [
    {
      type: TournamentFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.ready,
      label: t('common:lobbySearchFilters.recommended'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.recruiting,
      label: t('common:lobbySearchFilters.beforeStart'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.beforeStart,
      label: t('common:lobbySearchFilters.inProgress'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.inProgress,
      label: t('common:lobbySearchFilters.organized'),
    },
  ]

  const testLobbies: TournamentListItem[] = [
    {
      attributes: {
        title: 'testLobby',
        hash_key: '1234567890',
        start_date: '2021-08-02',
        max_participants: 15,
        participant_type: 1,
        status: 1,
        game_of_title: 'dota 2',
        cover: null,
        organizer_name: 'dulguun',
        organizer_avatar: 'test',
        role: 0,
        rule: 0,
        position: 1,
        team_name: 'test team',
        team_avatar: null,
        participant_count: 4,
        is_single: false,
        winner: null,
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
        ],
        is_freezed: false,
        interested_count: 0,
      },
    },
    {
      attributes: {
        title: 'testLobby2',
        hash_key: '12345678190',
        start_date: '2021-08-03',
        max_participants: 15,
        participant_type: 2,
        status: 2,
        game_of_title: 'csgo',
        cover: null,
        organizer_name: 'dulguun',
        organizer_avatar: 'test',
        role: 0,
        rule: 0,
        position: 1,
        team_name: 'test team',
        team_avatar: null,
        participant_count: 3,
        is_single: true,
        winner: null,
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
        is_freezed: false,
        interested_count: 0,
      },
    },
  ]
  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">ロビー</Typography>

        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {t('common:tournament_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </div>
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
          dataLength={arenas.length}
          next={loadMore}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
        >
          {arenas.map((tournament, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
              <TournamentCard tournament={tournament} />
            </Grid>
          ))}
        </InfiniteScroll> */}
        {testLobbies.map((lobby, i) => (
          <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
            <LobbyCard tournament={lobby} />
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

const useStyles = makeStyles((theme) => ({
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
      padding: '12px 16px',
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filtersLoginRequired: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: 16,
    marginRight: 16,
  },
  addIcon: {
    position: 'relative',
    left: -8,
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

export default LobbyHome
