import React, { useState, useEffect } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Box, Grid, Typography, IconButton, Icon, Theme, useMediaQuery } from '@material-ui/core'
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
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import useUserData from './useUserData'
import useBlock from './useBlock'
import useUnblock from './useUnblock'
import FollowUsers from '@containers/FollowUsers'
import { useContextualRouting } from 'next-use-contextual-routing'
import ESReport from '@containers/Report'
import ESLoader from '@components/Loader'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'
import { FOLLOW_STATES, REPORT_TYPE } from '@constants/common.constants'
import { UPLOADER_TYPE } from '@constants/image.constants'
import useToast from '@utils/hooks/useToast'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'
// import { GTMHelper } from '@utils/helpers/SendGTM'
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
  const [offset, setOffset] = useState(0)
  const { makeContextualHref } = useContextualRouting()
  const [slotDataLayer, setSlotDataLayer] = useState('')
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))

  const raw_code = _.isEmpty(router.query.user_code)
    ? null
    : typeof router.query.user_code == 'string'
    ? router.query.user_code
    : router.query.user_code[0]

  const {
    userCode,
    profile,
    isOthers,
    isAuthenticated,
    meta,
    getMemberProfile,
    profileImageChange,
    profileImageRemove,
    setFollowState,
    clearMemberProfile,
  } = useUserData(raw_code)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearMemberProfile()
    }
  }, [])

  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.PROFILE, screenDownSP))
  }, [screenDownSP])

  useEffect(() => {
    if (router.isReady) {
      if (isOthers) {
        getMemberProfile(userCode)
      } else {
        if (!isAuthenticated && raw_code == null) {
          router.push(ESRoutes.NOT_FOUND)
        }
      }
    }
  }, [router.isReady, raw_code])

  useEffect(() => {
    setTab(0)
    if (isOthers) {
      toggleDisable(false)
    }
  }, [profile])

  const { addToast } = useToast()
  useEffect(() => {
    if (blockMeta.loaded) {
      addToast(i18n.t('common:profile.block_success_message'))
    }
  }, [blockMeta.loaded])

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

  const edit = () => {
    router.push(makeContextualHref({ pathName: ESRoutes.PROFILE_EDIT }), ESRoutes.PROFILE_EDIT, { shallow: true })
  }
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
              isOthers ? null : profileImageChange(f, UPLOADER_TYPE.COVER, blob)
            }}
            onRemove={(path: string, file_type: number) => {
              isOthers ? null : profileImageRemove(path, file_type)
            }}
          />
          {offset > 150 ? (
            <Box className={classes.backContainer}>
              <IconButton
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('backToTopVideo::back::4')
                  router.back()
                }}
                className={classes.iconButtonBg2}
              >
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Typography variant="h2" className={classes.wrapOne}>
                {attr.nickname}
              </Typography>
            </Box>
          ) : (
            <IconButton
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('backToTopVideo::back::5')
                router.back()
              }}
              className={classes.iconButtonBg}
            >
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
          )}
          <Box className={classes.headerItemsContainer}>
            <ProfileAvatar
              src={attr.avatar_url}
              editable={!isOthers}
              alt={attr.nickname}
              onChange={(f: File, blob: any) => {
                isOthers ? null : profileImageChange(f, UPLOADER_TYPE.AVATAR, blob)
              }}
              onRemove={(path: string, file_type: number) => {
                isOthers ? null : profileImageRemove(path, file_type)
              }}
            />
            {isOthers ? (
              <Box className={classes.menu}>
                {isAuthenticated && attr.is_direct_chat_available ? (
                  <ESButton variant="outlined" round className={classes.buttonInbox} disabled={disable} onClick={dm}>
                    <Icon className={`fas fa-inbox ${classes.inbox}`} />
                  </ESButton>
                ) : null}
                {isAuthenticated ? (
                  attr.is_blocked ? (
                    <ESButton
                      variant="outlined"
                      round
                      className={classes.button}
                      disabled={disable}
                      onClick={() => {
                        unblockUser({ user_code: attr.user_code })
                      }}
                    >
                      {i18n.t('common:profile.unblock')}
                    </ESButton>
                  ) : isFollowing ? (
                    <ESButton
                      variant="contained"
                      color="primary"
                      round
                      className={classes.button}
                      disabled={disable}
                      onClick={setFollowState}
                    >
                      {i18n.t('common:profile.following')}
                    </ESButton>
                  ) : (
                    <ESButton variant="outlined" round className={classes.button} disabled={disable} onClick={setFollowState}>
                      {i18n.t('common:profile.follow_as')}
                    </ESButton>
                  )
                ) : null}
                <ESMenu>
                  {isAuthenticated ? (
                    attr.is_blocked ? (
                      <ESMenuItem
                        onClick={() => {
                          unblockUser({ user_code: attr.user_code })
                        }}
                      >
                        {i18n.t('common:profile.menu_unblock')}
                        {blockMeta.pending ? <ESLoader /> : null}
                      </ESMenuItem>
                    ) : (
                      <ESMenuItem
                        onClick={() => {
                          blockUser({ user_code: attr.user_code })
                        }}
                      >
                        {i18n.t('common:profile.menu_block')}
                        {unblockMeta.pending ? <ESLoader /> : null}
                      </ESMenuItem>
                    )
                  ) : null}
                  <ESMenuItem
                    onClick={() =>
                      isAuthenticated
                        ? handleReportOpen()
                        : router.push(makeContextualHref({ pathName: ESRoutes.LOGIN }), ESRoutes.LOGIN, { shallow: true })
                    }
                  >
                    {i18n.t('common:user_report.report_menu')}
                  </ESMenuItem>
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
            <FollowUsers user_code={isOthers ? userCode : null} fromType={FOLLOW_STATES.FOLLOWING} />
            <FollowUsers user_code={isOthers ? userCode : null} fromType={FOLLOW_STATES.FOLLOWERS} />
          </Box>
        </Grid>
        {isAuthenticated ? (
          <ESReport
            reportType={REPORT_TYPE.USER_LIST}
            target_id={userCode}
            data={profile}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
        ) : null}
      </>
    )
  }
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={i18n.t('common:user_profile.profile')} value={0} classes={{ root: classes.tabRoot }} />
          <ESTab label={i18n.t('common:user_profile.tournament_history')} value={1} classes={{ root: classes.tabRoot }} />
          <ESTab label={i18n.t('common:user_profile.activity_log')} value={2} classes={{ root: classes.tabRoot }} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.MAIN:
        if (!isOthers || profile.attributes.show_about) return <ProfileMainContainer userProfile={profile} isOthers={isOthers} />
        break
      case TABS.TOURNAMENT:
        if (!isOthers || profile.attributes.show_tournament_history)
          return <TournamentHistoryContainer userCode={userCode} isOthers={isOthers} />
        break
      case TABS.ACTIVITY:
        if (!isOthers || profile.attributes.show_activity_logs) return <ActivityLogsContainer userCode={userCode} isOthers={isOthers} />
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
        <div id={'ad_profile_top'} className={'google_ad_patten_1'} />
        {/* GADS: profile */}
        <GoogleAd id={{ idPatten1: 'ad_profile_t' }} idTag={'ad_profile_t'} slot={slotDataLayer} />
        {getHeader()}
        {getTabs()}
        {getContent()}
        <Box mb={3} />
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
    position: 'fixed',
    top: 60,
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
  },
  iconButtonBg: {
    position: 'fixed',
    top: 65,
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
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
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
  tabRoot: {},
  [theme.breakpoints.down('sm')]: {
    tabRoot: {
      minWidth: 'unset',
    },
  },
}))
