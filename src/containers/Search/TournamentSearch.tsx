import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, withStyles } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import useTournamentSearch from './useTournamentSearch'
import ESLoader from '@components/Loader'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import _ from 'lodash'

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: 'white',
  },
})(AvatarGroup)

const UserSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { searchTournaments, tournamentSearch, meta, page } = useTournamentSearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      const keyword = router.query.keyword ? router.query.keyword.toString() : ''
      setKeyword(keyword)
      tournamentSearch({ page: 1, keyword: keyword })
    }
  }, [router.query])

  useEffect(() => {
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
    if (page && page.current_page !== page.total_pages) tournamentSearch({ page: page.current_page + 1, keyword: keyword })
  }, [searchTournaments])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    if (page && page.current_page !== page.total_pages) tournamentSearch({ page: page.current_page + 1, keyword: '' })
  }

  const renderItem = (tournament, i) => {
    const data = tournament.attributes
    const cover = data.cover ? data.cover : '/images/avatar.png'
    const organizer = data.organizer?.nickname ? data.organizer.nickname : ''
    const startDate = new Date(data.start_date).toISOString().slice(0, 10).replace(/-/g, '/')

    return (
      <Grid item xs={6} md={4} key={i}>
        <ESCard>
          <ESCardMedia cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />} image={cover}></ESCardMedia>
          <ESCardContent>
            <Box color={Colors.white}>
              <Typography>{data.title}</Typography>
            </Box>
            <Typography className={classes.organizer}>{`${t('common:tournament.organizer')} ${organizer}`}</Typography>
            <Box display="flex" flexDirection="row" mt={1} alignItems="center">
              <ESChip
                className={classes.chip}
                size="small"
                label={
                  <Box color={Colors.white}>
                    <Typography variant="caption">{t('common:tournament.card_date')}</Typography>
                  </Box>
                }
              />
              <Box ml={1} color={Colors.white}>
                <Typography variant="caption">{startDate}</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" mt={1} alignItems="center">
              <ESChip
                className={classes.chip}
                size="small"
                label={
                  <Box color={Colors.white}>
                    <Typography variant="caption">{t('common:tournament.entry')}</Typography>
                  </Box>
                }
              />
              <Box ml={1} color={Colors.white}>
                <Typography variant="caption">{data.participant_count}</Typography>
              </Box>
              <Typography variant="caption">/{data.max_participants}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <StyledAvatarGroup max={4}>
                <ESAvatar alt="Avatar" />
                <ESAvatar alt="Bvatar" />
                <ESAvatar alt="Cvatar" />
                <ESAvatar alt="Cvatar" />
              </StyledAvatarGroup>
            </Box>
          </ESCardContent>
        </ESCard>
      </Grid>
    )
  }

  return (
    <Grid container className={classes.container}>
      <Box pb={3} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:tournament.tournament_results')}
        </Typography>
      </Box>
      {!!page && (
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
          </Typography>
        </Grid>
      )}
      <Grid container>{searchTournaments.map((tournament, i) => renderItem(tournament, i))}</Grid>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[1000]}80`,
    },
  },
  container: {
    padding: 24,
    paddingTop: 16,
  },
  card: {
    width: 240,
  },
  organizer: {
    fontSize: 10,
  },
  chip: {
    height: 15,
    backgroundColor: Colors.grey[400],
  },
}))

export default UserSearchContainer
