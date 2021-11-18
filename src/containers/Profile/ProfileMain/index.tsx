import React, { useState } from 'react'
import { Box, Grid, Typography, Icon, ButtonBase } from '@material-ui/core'
import { orderBy } from 'lodash'
import i18n from '@locales/i18n'
import ESChip from '@components/Chip'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import ESButtonTwitchCircle from '@components/Button/TwitchCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import HeaderTags from '../Partials/headerTags'
import Iconic from '../Partials/iconic'
import { GENDER } from '@constants/common.constants'
import { makeStyles } from '@material-ui/core/styles'
import { UserProfile } from '@services/user.service'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import CommunityContainer from '@containers/Profile/Communities'

interface Props {
  userProfile: UserProfile
  isOthers: boolean
}

const MAX_FAVORITE = 10

const ProfileMainContainer: React.FC<Props> = ({ userProfile, isOthers }) => {
  const classes = useStyles()
  const router = useRouter()
  const [maxFav, setMaxFav] = useState(MAX_FAVORITE)

  const attr = userProfile?.attributes
  if (userProfile == null || attr == null || attr == undefined) {
    return null
  }

  const gender =
    isOthers && !attr.show_sex
      ? i18n.t('common:common:private')
      : attr.sex === GENDER.FEMALE
      ? i18n.t('common:common.female')
      : attr.sex === GENDER.MALE
      ? i18n.t('common:common.male')
      : attr.sex === GENDER.OTHER
      ? i18n.t('common:common.other')
      : null
  const bod =
    isOthers && !attr.show_birth_date
      ? i18n.t('common:common:private')
      : attr.birth_date
      ? CommonHelper.staticSmartTime(attr.birth_date)
      : null
  const area = isOthers && !attr.show_area ? i18n.t('common:common:private') : attr.area ? attr.area : null

  const editGame = () => router.push(ESRoutes.GAME_EDIT)

  const getTopSection = () => {
    return (
      <Grid xs={12} item className={classes.headerContainerSecond}>
        <Typography className={classes.marginTop20} style={{ whiteSpace: 'pre-line' }}>
          {attr.bio}
        </Typography>
        <HeaderTags items={attr.features ?? null} />
        <Box display="flex">
          {area ? <Iconic text={area} icon="fas fa-map-marker-alt" /> : null}
          {gender ? <Iconic text={gender} icon="fas fa-user" /> : null}
          {bod ? <Iconic text={bod} icon="fa fa-birthday-cake" /> : null}
        </Box>
        <Box display="flex" mt={2}>
          <ESButtonDiscordCircle className={classes.marginRight} link={attr.discord_link} />
          <ESButtonFacebookCircle className={classes.marginRight} link={attr.facebook_link} />
          <ESButtonTwitterCircle className={classes.marginRight} link={attr.twitter_link} />
          <ESButtonTwitchCircle className={classes.marginRight} link={attr.twitch_link} />
          <ESButtonInstagramCircle className={classes.marginRight} link={attr.instagram_link} />
        </Box>
      </Grid>
    )
  }
  const getFavoriteGames = () => {
    const orderedGL = orderBy(attr.game_titles, ['display_name', 'jp_kana_name'], ['asc'])
    const readMore = orderedGL.length > maxFav

    return (
      <Grid xs={12} item className={`${classes.bodyContainer} ${classes.marginTop50}`}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography variant="h2" className={classes.marginRight20}>
              {i18n.t('common:profile.favorite_game.title')}
            </Typography>
            <Typography variant="h2">{orderedGL?.length ? orderedGL.length : i18n.t('common:common.unregistered')}</Typography>
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
                if (i < maxFav)
                  return (
                    <ESChip
                      isGameList={true}
                      key={i}
                      className={`${classes.marginTop16} ${classes.marginRight16}`}
                      label={g.display_name}
                    />
                  )
              })
            : null}
        </Box>
        {orderedGL.length > MAX_FAVORITE ? (
          <ButtonBase onClick={() => setMaxFav(readMore ? orderedGL.length : MAX_FAVORITE)} className={classes.readMore}>
            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
              <Typography className={classes.marginRight}>
                {readMore ? i18n.t('common:profile.read_more') : i18n.t('common:profile.collapse')}
              </Typography>
              <Icon className={readMore ? 'fa fa-angle-down' : 'fa fa-angle-up'} fontSize="small" />
            </Box>
          </ButtonBase>
        ) : null}
      </Grid>
    )
  }

  const getCommunitySection = () => {
    return <CommunityContainer userCode={attr.user_code} />
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
  readMore: {
    width: '100%',
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
  marginTop16: {
    marginTop: theme.spacing(2),
  },
  marginRight16: {
    marginRight: theme.spacing(2),
  },
  card: {
    paddingTop: 0,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(3.6),
    paddingLeft: theme.spacing(1),
  },
}))

export default ProfileMainContainer
