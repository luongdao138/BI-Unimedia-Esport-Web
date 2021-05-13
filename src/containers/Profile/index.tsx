import { useState } from 'react'
import { Box, Grid, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ProfileAvatar from '@components/ProfileAvatar'
import ProfileCover from '@components/ProfileCover'
import ESButton from '@components/Button'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import TournamentHistoryContainer from '@containers/Profile/TournamentHistory'
import ActivityLogsContainer from '@containers/Profile/ActivityLogs'
import ProfileMainContainer from '@containers/Profile/ProfileMain'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import useUserData from './useUserData'
import ESFollowers from '@containers/Followers'
import ESFollowing from '@containers/Following'

const ProfileContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [tab, setTab] = useState(0)
  const { userProfile } = useUserData()

  if (userProfile === null || userProfile === undefined) return null

  return (
    <>
      <Grid container direction="column">
        <Box className={classes.headerContainer}>
          <ProfileCover src={userProfile.data.attributes.cover_url} />
          <Grid container direction="column" justify="space-between" alignItems="flex-start" className={classes.headerItemsContainer}>
            <IconButton className={classes.iconButtonBg}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <ProfileAvatar src={userProfile ? userProfile.data.attributes.avatar_url : '/images/avatar.png'} editable />
            <ESButton variant="outlined" round className={classes.menu}>
              {t('common:profile.edit_profile')}
            </ESButton>
          </Grid>
        </Box>
        <Grid item xs={12} className={classes.headerContainerSecond}>
          <Typography variant="h2">{userProfile.data.attributes.nickname}</Typography>
          <Typography>@{userProfile.data.attributes.user_code}</Typography>
          <Box display="flex">
            <ESFollowers user_code={null} />
            <ESFollowing user_code={null} />
          </Box>
        </Grid>
        <Box margin={3}>
          <ESTabs value={tab} onChange={(_, v) => setTab(v)}>
            <ESTab label={t('common:user_profile.profile')} value={0} />
            <ESTab label={t('common:user_profile.tournament_history')} value={1} />
            <ESTab label={t('common:user_profile.activity_log')} value={2} />
          </ESTabs>
        </Box>
        {tab == 1 && <TournamentHistoryContainer userId={127} />}
        {tab == 2 && <ActivityLogsContainer userId={127} />}
        {tab == 0 && <ProfileMainContainer userProfile={userProfile} />}
      </Grid>
    </>
  )
}

export default ProfileContainer

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    height: 256,
    position: 'relative',
  },
  headerItemsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 256,
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  headerContainerSecond: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}`,
  },
  marginTop20: {
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    top: 200,
    right: theme.spacing(1),
  },
  marginRight: {
    marginRight: 8,
  },
}))
