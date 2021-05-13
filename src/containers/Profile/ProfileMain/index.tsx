import { Box, Grid, Typography, Icon, withStyles } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import ESAvatar from '@components/Avatar'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitchCircle'
import ESButtonTwitchCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import HeaderTags from '../Partials/headerTags'
import Iconic from '../Partials/iconic'
import { GENDER } from '@constants/common.constants'
import { makeStyles } from '@material-ui/core/styles'
import { UserProfile } from '@services/user.service'

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: 'white',
  },
})(AvatarGroup)

interface Props {
  userProfile: UserProfile
}

const ProfileMainContainer: React.FC<Props> = ({ userProfile }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const gender =
    userProfile.attributes.sex === GENDER.FEMALE
      ? t('common:common.female')
      : userProfile.attributes.sex === GENDER.MALE
      ? t('common:common.male')
      : t('common:common.other')

  return (
    <>
      <Grid xs={12} className={classes.headerContainerSecond}>
        <Typography className={classes.marginTop20}>{userProfile.attributes.bio}</Typography>
        <HeaderTags items={userProfile.attributes.features} />
        <Box display="flex">
          <Iconic text={userProfile.attributes.area.area} icon="fas fa-map-marker-alt" />
          <Iconic text={gender} icon="fas fa-user" />
          <Iconic text="1990年01月11日" icon="fa fa-birthday-cake" />
        </Box>
        <Box display="flex" className={classes.marginTop20}>
          <ESButtonFacebookCircle className={classes.marginRight} />
          <ESButtonTwitterCircle className={classes.marginRight} />
          <ESButtonTwitchCircle className={classes.marginRight} />
          <ESButtonInstagramCircle className={classes.marginRight} />
        </Box>
      </Grid>
      <Grid xs={12} className={classes.bodyContainer}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography variant="h2" className={classes.marginRight20}>
              {t('common:profile.favorite_game')}
            </Typography>
            <Typography variant="h2">10</Typography>
          </Box>
          <Box display="flex">
            <Typography>{t('common:profile.edit')}</Typography>
          </Box>
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
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
            </Grid>
            <Grid item xs={6} md={4}>
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
            </Grid>
            <Grid item xs={6} md={4}>
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
            </Grid>
            <Grid item xs={6} md={4}>
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
            </Grid>
            <Grid item xs={6} md={4}>
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
            </Grid>
            <Grid item xs={6} md={4}>
              <ESCard>
                <ESCardMedia
                  cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
                  image="https://picsum.photos/id/112/240/120"
                ></ESCardMedia>
                <ESCardContent>
                  <Typography variant="h2">コミュニティ名がはい...</Typography>
                  <Typography variant="caption" gutterBottom>
                    主催者 わたなべ
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <StyledAvatarGroup max={3}>
                      <ESAvatar alt="Avatar" />
                      <ESAvatar alt="Bvatar" />
                      <ESAvatar alt="Cvatar" />
                      <ESAvatar alt="Cvatar" />
                    </StyledAvatarGroup>
                  </Box>
                </ESCardContent>
              </ESCard>
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
