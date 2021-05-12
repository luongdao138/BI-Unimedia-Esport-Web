import { useEffect } from 'react'
import { Box, Grid, Typography, IconButton, Icon, withStyles, Theme } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'
import ProfileAvatar from '@components/ProfileAvatar'
import ProfileCover from '@components/ProfileCover'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitchCircle'
import ESButtonTwitchCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESChip from '@components/Chip'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import ESAvatar from '@components/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import HeaderTags from './Partials/headerTags'
import Iconic from './Partials/iconic'
import Followers from './Partials/followers'
import { useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  headerContainer: {
    height: 256,
    position: 'relative',
  },
  headerItemsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  headerContainerSecond: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  bodyContainer: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    marginTop: 50,
  },
  coverImage: {
    position: 'relative',
    width: '100%',
    height: 188,
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}`,
  },
  marginTop20: {
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    top: 190,
    right: theme.spacing(1),
  },
  marginRight: {
    marginRight: 8,
  },
  marginRight20: {
    marginRight: 20,
  },
  avatarStyle: {
    width: 20,
    height: 20,
    fontSize: 16,
  },
}))

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: 'white',
  },
})(AvatarGroup)

const ProfileContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)
  // useEffect(() => {
  //   getUserProfile()
  // }, [])
  useEffect(() => {
    // console.log('index.tsx 96 ', userProfile)
  }, [userProfile])

  if (userProfile === null) return null

  const gender = userProfile.data.attributes.sex

  return (
    <>
      <Grid xs={12} direction="column" className={classes.container}>
        <Grid xs={12} className={classes.headerContainer}>
          <ProfileCover src={userProfile.data.attributes.cover_url} />
          <Grid
            xs={12}
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
            className={classes.headerItemsContainer}
          >
            <IconButton className={classes.iconButtonBg}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <ProfileAvatar src={userProfile.data.attributes.avatar_url} editable />
            <ESMenu className={classes.menu}>
              <ESMenuItem onClick={() => null}>プロフィールを編集</ESMenuItem>
              <ESMenuItem onClick={() => null}>大会履歴</ESMenuItem>
              <ESMenuItem onClick={() => null}>アクティビティ</ESMenuItem>
              <ESMenuItem onClick={() => null}>QRコード</ESMenuItem>
              <ESMenuItem onClick={() => null}>ログアウト</ESMenuItem>
            </ESMenu>
          </Grid>
        </Grid>
        <Grid xs={12} className={classes.headerContainerSecond}>
          <Typography variant="h2">{userProfile.data.attributes.nickname}</Typography>
          <Typography>@{userProfile.data.attributes.user_code}</Typography>
          <Typography className={classes.marginTop20}>{userProfile.data.attributes.bio}</Typography>
          <HeaderTags items={userProfile.data.attributes.features} />
          <Box display="flex">
            <Iconic text={userProfile.data.attributes.area.area} icon="fas fa-map-marker-alt" />
            <Iconic text={gender} icon="fas fa-user" />
            <Iconic text="1990年01月11日" icon="fa fa-birthday-cake" />
          </Box>
          <Box display="flex">
            <Followers text={t('common:profile.following')} count={userProfile.data.attributes.following} />
            <Followers text={t('common:profile.followers')} count={userProfile.data.attributes.followers} />
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
            {userProfile.data.attributes.game_titles.length > 0
              ? userProfile.data.attributes.game_titles.map((g, i: number) => {
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
      </Grid>
    </>
  )
}

export default ProfileContainer
