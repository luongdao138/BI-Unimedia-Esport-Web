import { Box, Grid, Typography, Icon, ButtonBase } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitchCircle'
import ESButtonTwitchCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import CommunityCard from '@components/CommunityCard'
import HeaderTags from '../Partials/headerTags'
import Iconic from '../Partials/iconic'
import useSmartTime from '@utils/hooks/useSmartTime'
import { GENDER } from '@constants/common.constants'
import { makeStyles } from '@material-ui/core/styles'
import { UserProfile } from '@services/user.service'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

interface Props {
  userProfile: UserProfile
  isOthers: boolean
}

const ProfileMainContainer: React.FC<Props> = ({ userProfile, isOthers }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const gender =
    userProfile.attributes.sex === GENDER.FEMALE
      ? t('common:common.female')
      : userProfile.attributes.sex === GENDER.MALE
      ? t('common:common.male')
      : t('common:common.other')
  const time = useSmartTime(userProfile.attributes.birth_date)

  const editGame = () => router.push(ESRoutes.GAME_EDIT)

  return (
    <>
      <Grid xs={12} item className={classes.headerContainerSecond}>
        <Typography className={classes.marginTop20}>{userProfile.attributes.bio}</Typography>
        <HeaderTags items={userProfile.attributes.features ?? null} />
        <Box display="flex">
          <Iconic text={userProfile.attributes.area ? userProfile.attributes.area.area : 'unknown'} icon="fas fa-map-marker-alt" />
          <Iconic text={gender} icon="fas fa-user" />
          <Iconic text={time} icon="fa fa-birthday-cake" />
        </Box>
        <Box display="flex" className={classes.marginTop20}>
          <ESButtonFacebookCircle className={classes.marginRight} />
          <ESButtonTwitterCircle className={classes.marginRight} />
          <ESButtonTwitchCircle className={classes.marginRight} />
          <ESButtonInstagramCircle className={classes.marginRight} />
        </Box>
      </Grid>
      <Grid xs={12} item className={classes.bodyContainer}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography variant="h2" className={classes.marginRight20}>
              {t('common:profile.favorite_game.title')}
            </Typography>
            <Typography variant="h2">10</Typography>
          </Box>
          {isOthers ? null : (
            <Box display="flex">
              <ButtonBase onClick={editGame}>
                <Typography>{t('common:profile.edit')}</Typography>
              </ButtonBase>
            </Box>
          )}
        </Box>
        <Box>
          {userProfile.attributes.game_titles.length > 0
            ? userProfile.attributes.game_titles.map((g: any, i: number) => {
                return <ESChip key={i} className={`${classes.marginTop20} ${classes.marginRight20}`} label={g.display_name} />
              })
            : null}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography className={classes.marginRight}>{t('common:profile.read_more')}</Typography>
          <Icon className={'fa fa-angle-down'} fontSize="small" />
        </Box>
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
          <Typography className={classes.marginRight}>{t('common:profile.read_more')}</Typography>
          <Icon className={'fa fa-angle-down'} fontSize="small" />
        </Box>
      </Grid>
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
    marginTop: 50,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginRight20: {
    marginRight: 20,
  },
  marginRight: {
    marginRight: 8,
  },
}))

export default ProfileMainContainer
