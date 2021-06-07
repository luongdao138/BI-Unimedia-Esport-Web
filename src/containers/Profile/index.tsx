import { useState, useEffect } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Box, Grid, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import i18n from '@locales/i18n'
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
import useBlock from './useBlock'
import useUnblock from './useUnblock'
import ESFollowers from '@containers/Followers'
import ESFollowing from '@containers/Following'
import ESReport from '@containers/Report'
import ESLoader from '@components/Loader'
import ESToast from '@components/Toast'
import { ESRoutes } from '@constants/route.constants'
import { REPORT_TYPE } from '@constants/common.constants'
import { UPLOADER_TYPE } from '@constants/image.constants'

interface WithRouterProps {
  router: NextRouter
}

type ProfileProps = WithRouterProps

enum TABS {
  MAIN = 0,
  TOURNAMENT = 1,
  ACTIVITY = 2,
}

const ProfileContainer: React.FC<ProfileProps> = ({ router }) => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [openReport, setOpenReport] = useState(false)
  const [disable, toggleDisable] = useState(false)
  const { blockUser, blockMeta } = useBlock()
  const { unblockUser, unblockMeta } = useUnblock()
  const [blocked, setBlocked] = useState(false)
  const [showToast, setShow] = useState(false)

  // const { userProfile, communityList, getCommunityList, getMemberProfile, resetCommunityMeta, resetUserMeta, userMeta, communityMeta } = useUserData(user_code)

  const raw_code = router.query.user_code || []

  const { userCode, profile, isOthers, meta, getMemberProfile, profileImageChange, setFollowState } = useUserData(raw_code)

  useEffect(() => {
    if (isOthers) {
      getMemberProfile(userCode)
    }
  }, [raw_code])

  useEffect(() => {
    if (isOthers) {
      toggleDisable(false)
    }
  }, [profile])

  useEffect(() => {
    if (blocked && !blockMeta.pending) {
      setShow(true)
    }
  }, [blockMeta])

  useEffect(() => {
    if (meta.error) {
      router.push(ESRoutes.NOT_FOUND)
    }
  }, [meta.error])

  if (profile === null || profile === undefined) {
    return null
  }

  const cover = profile?.attributes?.cover_url ?? null
  const avatar = profile?.attributes?.avatar_url ? profile.attributes.avatar_url : isOthers ? '/images/avatar_o.png' : '/images/avatar.png'
  const isFollowing = profile.attributes.is_following

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
            <IconButton onClick={() => router.back()} className={classes.iconButtonBg}>
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
                <ESButton variant="outlined" round className={classes.marginRight} disabled={disable} onClick={setFollowState}>
                  <Icon className={`fas fa-inbox ${classes.inbox}`} />
                </ESButton>
                {isFollowing ? (
                  <ESButton variant="outlined" round className={classes.marginRight} disabled={disable} onClick={setFollowState}>
                    {i18n.t('common:profile.following')}
                  </ESButton>
                ) : (
                  <ESButton variant="outlined" round className={classes.marginRight} disabled={disable} onClick={setFollowState}>
                    {i18n.t('common:profile.follow_as')}
                  </ESButton>
                )}
                <ESMenu>
                  {profile.attributes.is_blocked ? (
                    <ESMenuItem
                      onClick={() => {
                        unblockUser({ block_type: 'user', target_id: Number(profile.id) })
                        setBlocked(false)
                      }}
                    >
                      {i18n.t('common:profile.menu_unblock')}
                      {blockMeta.pending ? <ESLoader /> : null}
                    </ESMenuItem>
                  ) : (
                    <ESMenuItem
                      onClick={() => {
                        blockUser({ block_type: 'user', target_id: Number(profile.id) })
                        setBlocked(true)
                      }}
                    >
                      {i18n.t('common:profile.menu_block')}
                      {unblockMeta.pending ? <ESLoader /> : null}
                    </ESMenuItem>
                  )}

                  <ESMenuItem onClick={handleReportOpen}>{i18n.t('common:user_report.title')}</ESMenuItem>
                </ESMenu>
              </Box>
            ) : (
              <ESButton variant="outlined" round className={classes.menu} onClick={edit}>
                {i18n.t('common:profile.edit_profile')}
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
          target_id={Number(profile.id)}
          data={profile}
          open={openReport}
          handleClose={() => setOpenReport(false)}
        />
      </>
    )
  }
  const getTabs = () => {
    return (
      <Box marginY={3}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={i18n.t('common:user_profile.profile')} value={0} />
          <ESTab label={i18n.t('common:user_profile.tournament_history')} value={1} />
          <ESTab label={i18n.t('common:user_profile.activity_log')} value={2} />
        </ESTabs>
      </Box>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.MAIN:
        if (!isOthers || profile.attributes.security_settings.show_about)
          return <ProfileMainContainer userProfile={profile} isOthers={isOthers} />
        break
      case TABS.TOURNAMENT:
        if (!isOthers || profile.attributes.security_settings.show_tournament_history)
          return <TournamentHistoryContainer userCode={userCode} />
        break
      case TABS.ACTIVITY:
        if (!isOthers || profile.attributes.security_settings.show_activity_logs) return <ActivityLogsContainer userCode={userCode} />
        break
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container direction="column">
        {getHeader()}
        {getTabs()}
        {getContent()}
        {showToast && (
          <ESToast
            open={showToast}
            message={i18n.t('common:profile.block_success_message')}
            onClose={() => {
              setBlocked(false)
              setShow(false)
            }}
          />
        )}
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
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    zIndex: 10,
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
  tabs: {
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inbox: {
    color: Colors.white,
    fontSize: '24px',
  },
}))
