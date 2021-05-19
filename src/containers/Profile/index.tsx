import { useState, useEffect } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Box, Grid, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ProfileAvatar from '@components/ProfileAvatar'
import ProfileCover from '@components/ProfileCover'
import ESButton from '@components/Button'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import TournamentHistoryContainer from '@containers/Profile/TournamentHistory'
import ActivityLogsContainer from '@containers/Profile/ActivityLogs'
import ProfileMainContainer from '@containers/Profile/ProfileMain'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import useUserData from './useUserData'
import ESFollowers from '@containers/Followers'
import ESFollowing from '@containers/Following'
import ESReport from '@containers/Report'
import { ESRoutes } from '@constants/route.constants'
import { REPORT_TYPE } from '@constants/common.constants'
import { UPLOADER_TYPE } from '@constants/image.constants'

interface WithRouterProps {
  router: NextRouter
}

type ProfileProps = WithRouterProps

const ProfileContainer: React.FC<ProfileProps> = ({ router }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [tab, setTab] = useState(0)
  const [openReport, setOpenReport] = useState(false)

  const raw_code = router.query.user_code || []

  const { userCode, profile, isOthers, meta, getMemberProfile, profileImageChange } = useUserData(raw_code)

  useEffect(() => {
    if (isOthers) {
      getMemberProfile(userCode)
    }
  }, [raw_code])

  useEffect(() => {
    if (meta.error) {
      router.push(ESRoutes.NOT_FOUND)
    }
  }, [meta.error])

  if (profile === null || profile === undefined) {
    return null
  }

  const cover = profile?.attributes?.cover_url ?? '/images/cover.png'
  const avatar = profile?.attributes?.avatar_url ? profile.attributes.avatar_url : isOthers ? '/images/avatar_o.png' : '/images/avatar.png'

  const edit = () => router.push(ESRoutes.PROFILE_EDIT)

  const handleReportOpen = () => setOpenReport(true)

  const getHeader = () => {
    return (
      <>
        <Box className={classes.headerContainer}>
          <ProfileCover
            src={cover}
            editable={!isOthers}
            onChange={(f: File) => {
              isOthers ? null : profileImageChange(f, parseInt(profile.id), UPLOADER_TYPE.COVER)
            }}
          />
          <Box className={classes.headerItemsContainer}>
            <IconButton className={classes.iconButtonBg}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <ProfileAvatar
              src={avatar}
              editable={!isOthers}
              onChange={(f: File) => {
                isOthers ? null : profileImageChange(f, parseInt(profile.id), UPLOADER_TYPE.AVATAR)
              }}
            />
            {isOthers ? (
              <Box className={classes.menu}>
                <ESButton variant="outlined" round className={classes.marginRight}>
                  {t('common:profile.inbox')}
                </ESButton>
                <ESButton variant="outlined" round className={classes.marginRight}>
                  {t('common:profile.follow_as')}
                </ESButton>
                <ESMenu>
                  <ESMenuItem onClick={() => null}>{t('common:profile.menu_block')}</ESMenuItem>
                  <ESMenuItem onClick={handleReportOpen}>{t('common:user_report.title')}</ESMenuItem>
                </ESMenu>
              </Box>
            ) : (
              <ESButton variant="outlined" round className={classes.menu} onClick={edit}>
                {t('common:profile.edit_profile')}
              </ESButton>
            )}
          </Box>
        </Box>
        <Grid item xs={12} className={classes.headerContainerSecond}>
          <Box mb={2}>
            <Typography variant="h2">{profile.attributes.nickname}</Typography>
            <Typography>@{userCode}</Typography>
          </Box>
          <Box display="flex">
            <ESFollowers user_code={isOthers ? userCode : null} />
            <ESFollowing user_code={isOthers ? userCode : null} />
          </Box>
        </Grid>
        <ESReport
          reportType={REPORT_TYPE.USER_LIST}
          target_id={profile.id}
          data={profile}
          open={openReport}
          handleClose={() => setOpenReport(false)}
        />
      </>
    )
  }

  return (
    <>
      <Grid container direction="column">
        {getHeader()}
        <Box margin={3}>
          <ESTabs value={tab} onChange={(_, v) => setTab(v)}>
            <ESTab label={t('common:user_profile.profile')} value={0} />
            <ESTab label={t('common:user_profile.tournament_history')} value={1} />
            <ESTab label={t('common:user_profile.activity_log')} value={2} />
          </ESTabs>
        </Box>
        {tab == 0 && <ProfileMainContainer userProfile={profile} isOthers={isOthers} />}
        {tab == 1 && <TournamentHistoryContainer userCode={userCode} />}
        {tab == 2 && <ActivityLogsContainer userCode={userCode} />}
      </Grid>
    </>
  )
}

export default withRouter(ProfileContainer)

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    display: 'flex',
    right: theme.spacing(1),
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 8,
  },
  relative: {
    position: 'relative',
  },
}))
