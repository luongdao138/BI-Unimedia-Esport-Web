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
  const [offset, setOffset] = useState(0)

  const raw_code = router.query.user_code || []

  const { userCode, profile, isOthers, meta, getMemberProfile, profileImageChange, setFollowState, clearMemberProfile } = useUserData(
    raw_code
  )

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
    return () => {
      clearMemberProfile()
    }
  }, [])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     toggleSticky(tableRef.current.getBoundingClientRect());
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [toggleSticky]);
  // return { tableRef, isSticky };

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

  const attr = profile?.attributes
  if (profile == null || profile == undefined || attr == null || attr == undefined) {
    return null
  }

  const cover = attr.cover_url ?? null
  const isFollowing = attr.is_following

  const edit = () => router.push(ESRoutes.PROFILE_EDIT)
  const dm = () => router.push(`${ESRoutes.MESSAGE}dm/${attr.user_code}`)

  const handleReportOpen = () => setOpenReport(true)

  const getHeader = () => {
    return (
      <>
        <Box className={classes.headerContainer}>
          <ProfileCover
            src={cover}
            editable={!isOthers}
            onChange={(f: File, blob: any) => {
              isOthers ? null : profileImageChange(f, parseInt(profile.id), UPLOADER_TYPE.COVER, blob)
            }}
          />
          {offset > 150 ? (
            <Box className={classes.backContainer} style={{ top: offset }}>
              <IconButton onClick={() => router.back()} className={classes.iconButtonBg2}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Typography variant="h2" className={classes.wrapOne}>
                {attr.nickname}
              </Typography>
            </Box>
          ) : (
            <IconButton onClick={() => router.back()} className={classes.iconButtonBg} style={{ top: offset + 10 }}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
          )}
          <Box className={classes.headerItemsContainer}>
            <ProfileAvatar
              src={attr.avatar_url}
              editable={!isOthers}
              alt={attr.nickname}
              onChange={(f: File, blob: any) => {
                isOthers ? null : profileImageChange(f, parseInt(profile.id), UPLOADER_TYPE.AVATAR, blob)
              }}
            />
            {isOthers ? (
              <Box className={classes.menu}>
                {attr.is_direct_chat_available ? (
                  <ESButton variant="outlined" round className={classes.buttonInbox} disabled={disable} onClick={dm}>
                    <Icon className={`fas fa-inbox ${classes.inbox}`} />
                  </ESButton>
                ) : null}
                {attr.is_blocked ? (
                  <ESButton
                    variant="outlined"
                    round
                    className={classes.button}
                    disabled={disable}
                    onClick={() => {
                      unblockUser({ user_code: attr.user_code })
                      setBlocked(false)
                    }}
                  >
                    {i18n.t('common:profile.unblock')}
                  </ESButton>
                ) : isFollowing ? (
                  <ESButton variant="outlined" round className={classes.button} disabled={disable} onClick={setFollowState}>
                    {i18n.t('common:profile.following')}
                  </ESButton>
                ) : (
                  <ESButton variant="outlined" round className={classes.button} disabled={disable} onClick={setFollowState}>
                    {i18n.t('common:profile.follow_as')}
                  </ESButton>
                )}
                <ESMenu>
                  {attr.is_blocked ? (
                    <ESMenuItem
                      onClick={() => {
                        unblockUser({ user_code: attr.user_code })
                        setBlocked(false)
                      }}
                    >
                      {i18n.t('common:profile.menu_unblock')}
                      {blockMeta.pending ? <ESLoader /> : null}
                    </ESMenuItem>
                  ) : (
                    <ESMenuItem
                      onClick={() => {
                        blockUser({ user_code: attr.user_code })
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
            <Typography variant="h2" className={classes.wrapOne}>
              {attr.nickname}
            </Typography>
            <Typography className={classes.wrapOne}>@{userCode}</Typography>
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
        if (!isOthers || profile.attributes.show_about) return <ProfileMainContainer userProfile={profile} isOthers={isOthers} />
        break
      case TABS.TOURNAMENT:
        if (!isOthers || profile.attributes.show_tournament_history) return <TournamentHistoryContainer userCode={userCode} />
        break
      case TABS.ACTIVITY:
        if (!isOthers || profile.attributes.show_activity_logs) return <ActivityLogsContainer userCode={userCode} />
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
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  headerContainerSecond: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  backContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: Colors.black,
    zIndex: 100,
  },
  iconButtonBg2: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
    marginTop: 5,
  },
  iconButtonBg: {
    position: 'absolute',
    marginLeft: theme.spacing(3),
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    zIndex: 100,
  },
  marginTop20: {
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    bottom: theme.spacing(1),
    display: 'flex',
    right: theme.spacing(1),
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 8,
  },
  button: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonInbox: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 0,
    paddingRight: 0,
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
    marginTop: 10,
    marginBottom: 50,
  },
  inbox: {
    color: Colors.white,
    fontSize: '22px',
    paddingRight: -5,
    paddingLeft: -5,
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
