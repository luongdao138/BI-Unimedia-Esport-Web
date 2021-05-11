import { Box, Grid, Typography, IconButton, Icon, withStyles } from '@material-ui/core'
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
import useProfileData from './useProfileData'

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: '#E4E4E4',
  },
  headerContainer: {
    height: 256,
    position: 'relative',
  },
  headerItemsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 24,
  },
  headerContainerSecond: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 24,
  },
  bodyContainer: {
    paddingRight: 24,
    paddingLeft: 24,
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
    right: 8,
  },

  // marginTop8: {
  //   marginTop: 8,
  // },

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
  return (
    <>
      <Grid xs={12} direction="column" className={classes.container}>
        <Grid xs={12} className={classes.headerContainer}>
          <ProfileCover src="https://picsum.photos/240/120" />
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
            <ProfileAvatar src="/images/avatar.png" editable />
            <ESMenu className={classes.menu}>
              <ESMenuItem onClick={() => console.log('index.tsx 31 ')}>プロフィールを編集</ESMenuItem>
              <ESMenuItem onClick={() => console.log('index.tsx 31 ')}>大会履歴</ESMenuItem>
              <ESMenuItem onClick={() => console.log('index.tsx 31 ')}>アクティビティ</ESMenuItem>
              <ESMenuItem onClick={() => console.log('index.tsx 31 ')}>QRコード</ESMenuItem>
              <ESMenuItem onClick={() => console.log('index.tsx 31 ')}>ログアウト</ESMenuItem>
            </ESMenu>
          </Grid>
        </Grid>
        <Grid xs={12} className={classes.headerContainerSecond}>
          <Typography variant="h2">eXe LAB事務局</Typography>
          <Typography>@exelab_staff</Typography>
          <Typography className={classes.marginTop20}>
            自己紹介はここに表示されます。自己紹介はここに表示されます。自己紹介はここに表示されます。自己紹介はここに表示されます。自己紹介はここに表示されます。自己紹介はここに表示されます。
          </Typography>
          <HeaderTags items={['学生', 'ゲーム 初心者', '大会参加したい', '夜型', 'スマホ', 'Switch']} />
          <Box display="flex">
            <Iconic text="東京都 渋谷区" icon="fas fa-map-marker-alt" />
            <Iconic text="男性" icon="fas fa-user" />
            <Iconic text="1990年01月11日" icon="fa fa-birthday-cake" />
          </Box>
          <Box display="flex">
            <Followers text={t('common:profile.following')} count={999} />
            <Followers text={t('common:profile.followers')} count={999} />
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
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="マインクラフト" onClick={() => {}} />
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="シャドウバーズ" onClick={() => {}} />
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="PUBG" onClick={() => {}} />
            <ESChip
              className={`${classes.marginTop20} ${classes.marginRight20}`}
              label="Counter Strike Global Offensive"
              onClick={() => {}}
            />
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="RAINBOW SIX SIEGE" onClick={() => {}} />
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="UNO" onClick={() => {}} />
            <ESChip className={`${classes.marginTop20} ${classes.marginRight20}`} label="ポケモンカード" onClick={() => {}} />
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
