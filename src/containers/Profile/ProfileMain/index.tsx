import { Box, Grid, Typography, Icon, ButtonBase } from '@material-ui/core'
import { orderBy } from 'lodash'
import i18n from '@locales/i18n'
import ESChip from '@components/Chip'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import ESButtonTwitchCircle from '@components/Button/TwitchCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import CommunityCard from '@components/CommunityCard'
import HeaderTags from '../Partials/headerTags'
import Iconic from '../Partials/iconic'
import { GENDER } from '@constants/common.constants'
import { makeStyles } from '@material-ui/core/styles'
import { UserProfile } from '@services/user.service'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface Props {
  userProfile: UserProfile
  isOthers: boolean
}

const ProfileMainContainer: React.FC<Props> = ({ userProfile, isOthers }) => {
  const classes = useStyles()
  const router = useRouter()
  const gender =
    userProfile.attributes.sex === GENDER.FEMALE
      ? i18n.t('common:common.female')
      : userProfile.attributes.sex === GENDER.MALE
      ? i18n.t('common:common.male')
      : userProfile.attributes.sex === GENDER.OTHER
      ? i18n.t('common:common.other')
      : null
  const bod = userProfile?.attributes?.birth_date ? CommonHelper.staticSmartTime(userProfile.attributes.birth_date) : null

  const editGame = () => router.push(ESRoutes.GAME_EDIT)

  const getTopSection = () => {
    return (
      <Grid xs={12} item className={classes.headerContainerSecond}>
        <Typography className={classes.marginTop20}>{userProfile.attributes.bio}</Typography>
        <HeaderTags items={userProfile.attributes.features ?? null} />
        <Box display="flex">
          {userProfile.attributes.area ? (
            <Iconic
              text={!isOthers || userProfile.attributes.show_area ? userProfile.attributes.area.area : i18n.t('common:common:private')}
              icon="fas fa-map-marker-alt"
            />
          ) : null}
          {gender ? (
            <Iconic text={!isOthers || userProfile.attributes.show_sex ? gender : i18n.t('common:common:private')} icon="fas fa-user" />
          ) : null}
          {bod ? (
            <Iconic
              text={!isOthers || userProfile.attributes.show_birth_date ? bod : i18n.t('common:common:private')}
              icon="fa fa-birthday-cake"
            />
          ) : null}
        </Box>
        <Box display="flex" className={classes.marginTop20}>
          <ESButtonDiscordCircle className={classes.marginRight} link={userProfile.attributes.discord_link} />
          <ESButtonFacebookCircle className={classes.marginRight} link={userProfile.attributes.facebook_link} />
          <ESButtonTwitterCircle className={classes.marginRight} link={userProfile.attributes.twitter_link} />
          <ESButtonTwitchCircle className={classes.marginRight} link={userProfile.attributes.twitch_link} />
          <ESButtonInstagramCircle className={classes.marginRight} link={userProfile.attributes.instagram_link} />
        </Box>
      </Grid>
    )
  }
  const getFavoriteGames = () => {
    const orderedGL = orderBy(userProfile.attributes?.game_titles, ['display_name', 'jp_kana_name'], ['asc'])
    const SHOW_MAX = 10
    return (
      <Grid xs={12} item className={`${classes.bodyContainer} ${classes.marginTop50}`}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography variant="h2" className={classes.marginRight20}>
              {i18n.t('common:profile.favorite_game.title')}
            </Typography>
            <Typography variant="h2">{orderedGL?.length}</Typography>
          </Box>
          {isOthers ? null : (
            <Box display="flex">
              <ButtonBase onClick={editGame}>
                <Typography>{i18n.t('common:profile.edit')}</Typography>
              </ButtonBase>
            </Box>
          )}
        </Box>
        <Box>
          {orderedGL && orderedGL.length > 0
            ? orderedGL.map((g: any, i: number) => {
                if (i < SHOW_MAX)
                  return <ESChip key={i} className={`${classes.marginTop20} ${classes.marginRight20}`} label={g.display_name} />
              })
            : null}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography className={classes.marginRight}>{i18n.t('common:profile.read_more')}</Typography>
          <Icon className={'fa fa-angle-down'} fontSize="small" />
        </Box>
      </Grid>
    )
  }

  const getCommunitySection = () => {
    return (
      <Grid xs={12} item className={classes.bodyContainer}>
        <Box display="flex" mt={3}>
          <Grid container>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
            <Grid item xs={6} md={4}>
              <CommunityCard community={null} />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography className={classes.marginRight}>{i18n.t('common:profile.read_more')}</Typography>
          <Icon className={'fa fa-angle-down'} fontSize="small" />
        </Box>
      </Grid>
    )
  }

  return (
    <>
      {getTopSection()}
      {getFavoriteGames()}
      {getCommunitySection()}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  headerContainerSecond: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  bodyContainer: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop50: {
    marginTop: 50,
  },
  marginRight20: {
    marginRight: 20,
  },
  marginRight: {
    marginRight: 8,
  },
}))

export default ProfileMainContainer
