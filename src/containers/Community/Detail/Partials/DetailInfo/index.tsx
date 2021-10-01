import { useState, useEffect } from 'react'
import { Grid, Box, Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import * as commonActions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import InfoContainer from './../InfoContainer'
import TopicListContainer from './../TopicListContainer'
import useCommunityDetail from './../../useCommunityDetail'
import ESReport from '@containers/Report'
import { useRouter } from 'next/router'
import { REPORT_TYPE } from '@constants/common.constants'
import SearchContainer from '../SearchContainer'
import FollowList from '../FollowList'
import { CommunityDetail, TopicDetailList } from '@services/community.service'
import useCommunityHelper from '@containers/Community/hooks/useCommunityHelper'
import DetailInfoButtons from '../../../Partials/DetailInfoButtons'
import { MEMBER_ROLE, TABS, COMMUNITY_DIALOGS } from '@constants/community.constants'
import { TwitterShareButton } from 'react-share'
import _ from 'lodash'
import * as actions from '@store/community/actions'
import { useConfirm } from '@components/Confirm'

const ROLE_TYPES = {
  IS_ADMIN: 'setIsAdmin',
  IS_CO_ORGANIZER: 'setIsCoOrganizer',
  IS_FOLLOWING: 'setIsFollowing',
  IS_REQUESTED: 'setIsRequested',
}

type Props = {
  detail: CommunityDetail
  toEdit?: () => void
  topicList: TopicDetailList[]
  showTopicListAndSearchTab: boolean
}

const DetailInfo: React.FC<Props> = ({ detail, topicList, toEdit, showTopicListAndSearchTab }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])

  const classes = useStyles()
  const [openReport, setOpenReport] = useState(false)
  const [tab, setTab] = useState(0)
  const data = detail.attributes
  const confirm = useConfirm()
  const { isNotMember, isPublic, isOfficial, isAutomatic } = useCommunityHelper(detail)

  const {
    isAuthenticated,
    followCommunity,
    followCommunityMeta,
    unfollowCommunity,
    unfollowCommunityMeta,
    unfollowCommunityPending,
    unfollowCommunityPendingMeta,
  } = useCommunityDetail()

  const router = useRouter()
  const { hash_key } = router.query

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isCoOrganizer, setIsCoOrganizer] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [isRequested, setIsRequested] = useState<boolean>(false)

  useEffect(() => {
    if (router?.query) {
      setTab(isAutomatic ? TABS.TOPIC_LIST : isNotMember ? TABS.INFO : TABS.TOPIC_LIST)
    }
  }, [router.query])

  useEffect(() => {
    setTab(isAutomatic ? TABS.TOPIC_LIST : isNotMember ? TABS.INFO : TABS.TOPIC_LIST)
  }, [detail])

  const setOtherRoleFalse = (setRoleType: string) => {
    if (setRoleType === ROLE_TYPES.IS_ADMIN) {
      setIsCoOrganizer(false)
      setIsFollowing(false)
      setIsRequested(false)
    } else if (setRoleType === ROLE_TYPES.IS_CO_ORGANIZER) {
      setIsAdmin(false)
      setIsFollowing(false)
      setIsRequested(false)
    } else if (setRoleType === ROLE_TYPES.IS_FOLLOWING) {
      setIsAdmin(false)
      setIsCoOrganizer(false)
      setIsRequested(false)
    } else if (setRoleType === ROLE_TYPES.IS_REQUESTED) {
      setIsAdmin(false)
      setIsCoOrganizer(false)
      setIsFollowing(false)
    }
  }

  const handleChangeRole = (setRoleType: string, value: boolean) => {
    setOtherRoleFalse(setRoleType)
    if (setRoleType === ROLE_TYPES.IS_ADMIN) {
      setIsAdmin(value)
    } else if (setRoleType === ROLE_TYPES.IS_CO_ORGANIZER) {
      setIsCoOrganizer(value)
    } else if (setRoleType === ROLE_TYPES.IS_FOLLOWING) {
      setIsFollowing(value)
    } else if (setRoleType === ROLE_TYPES.IS_REQUESTED) {
      setIsRequested(value)
    }
  }

  useEffect(() => {
    if (data.my_role === MEMBER_ROLE.ADMIN) {
      handleChangeRole(ROLE_TYPES.IS_ADMIN, true)
    } else if (data.my_role === MEMBER_ROLE.CO_ORGANIZER) {
      handleChangeRole(ROLE_TYPES.IS_CO_ORGANIZER, true)
    } else if (data.my_role === MEMBER_ROLE.MEMBER) {
      handleChangeRole(ROLE_TYPES.IS_FOLLOWING, true)
    } else if (data.my_role === MEMBER_ROLE.LEAVE || data.my_role == null) {
      handleChangeRole(ROLE_TYPES.IS_FOLLOWING, false)
    } else if (data.my_role === MEMBER_ROLE.REQUESTED) {
      handleChangeRole(ROLE_TYPES.IS_REQUESTED, true)
    }
  }, [])

  useEffect(() => {
    if (followCommunityMeta.loaded && isAutomatic) {
      handleChangeRole(ROLE_TYPES.IS_FOLLOWING, true)
      dispatch(commonActions.addToast(t('common:community.toast_follow')))
    }
    if (followCommunityMeta.loaded && !isAutomatic) {
      setIsRequested(true)
      dispatch(commonActions.addToast(t('common:community.toast_follow_manual_approval')))
    }
  }, [followCommunityMeta])

  useEffect(() => {
    if (unfollowCommunityMeta.loaded) {
      handleChangeRole(ROLE_TYPES.IS_FOLLOWING, false)
    }
  }, [unfollowCommunityMeta])

  useEffect(() => {
    if (unfollowCommunityPendingMeta.loaded) {
      handleChangeRole(ROLE_TYPES.IS_FOLLOWING, false)
      dispatch(commonActions.addToast(t('common:community.toast_cancel_follow_request')))
    }
  }, [unfollowCommunityPendingMeta])

  const followHandle = async () => {
    const resultAction = await dispatch(actions.getCommunityDetail(String(hash_key)))
    if (actions.getCommunityDetail.fulfilled.match(resultAction)) {
      followCommunity(String(hash_key))
    }
  }

  const unfollowHandle = async () => {
    const resultAction = await dispatch(actions.getCommunityDetail(String(hash_key)))
    if (actions.getCommunityDetail.fulfilled.match(resultAction)) {
      if (!isAutomatic) {
        confirm({ ...COMMUNITY_DIALOGS.UNFOLLOW })
          .then(() => {
            unfollowCommunity(String(hash_key))
          })
          .catch(() => {
            /* ... */
          })
      } else {
        unfollowCommunity(String(hash_key))
      }
    }
  }

  const cancelApplyingHandle = () => {
    confirm({ ...COMMUNITY_DIALOGS.JOIN_PENDING })
      .then(() => {
        unfollowCommunityPending(String(hash_key))
      })
      .catch(() => {
        /* ... */
      })
  }

  const DetailInfoButton = () => {
    return (
      <LoginRequired>
        {isAdmin || isCoOrganizer ? (
          <DetailInfoButtons
            primaryTextColor={false}
            title={t('common:community.edit')}
            variant="outlined"
            disabled={false}
            onClick={toEdit}
          />
        ) : isRequested ? (
          <DetailInfoButtons
            title={t('common:community.applying')}
            variant="outlined"
            color="primary"
            primaryTextColor={true}
            disabled={unfollowCommunityPendingMeta.pending}
            onClick={cancelApplyingHandle}
          />
        ) : isFollowing ? (
          <DetailInfoButtons
            primaryTextColor={false}
            title={t('common:profile.following')}
            variant="contained"
            color="primary"
            disabled={unfollowCommunityMeta.pending}
            onClick={unfollowHandle}
          />
        ) : (
          <DetailInfoButtons
            primaryTextColor={false}
            title={t('common:profile.follow_as')}
            variant="outlined"
            disabled={followCommunityMeta.pending}
            onClick={followHandle}
          />
        )}
      </LoginRequired>
    )
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }

  const handleCopy = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.toString())
      dispatch(commonActions.addToast(t('common:community.copy_shared_url_toast')))
    }
  }

  const getHeader = () => {
    return (
      <>
        <Box mb={2}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box color={Colors.white} display="flex" alignItems="center">
              <Typography className={classes.title} variant="h3">
                {data.name}
              </Typography>
              <Box>
                {isOfficial && (
                  <span className={classes.checkIcon}>
                    <Icon className="fa fa-check" fontSize="small" />
                  </span>
                )}
                {!isPublic && (
                  <Box className={classes.lockIconWrap}>
                    <Icon className={`fas fa-lock ${classes.lockIcon}`} />
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.detailCommonButtons}>
              {DetailInfoButton()}
              {!isOfficial && (
                <Box className={classes.menuOuter}>
                  <ESMenu>
                    <LoginRequired>
                      <ESMenuItem onClick={handleReportOpen}>{t('common:community.report')}</ESMenuItem>
                    </LoginRequired>
                  </ESMenu>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap">
            <Typography className={classes.communityId}>{`${t('common:community.community_id')}${detail.id}`}</Typography>
            <Box display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
              <Typography>{t('common:community.copy_shared_url')}</Typography>
            </Box>
            <TwitterShareButton url={window.location.toString()} title={_.defaultTo(detail.attributes.name, '')}>
              <img className={classes.twitter_logo} src="/images/twitter_logo.png" />
            </TwitterShareButton>
          </Box>
        </Box>

        <Box mt={2}>
          <FollowList community={detail} />
        </Box>

        {isAuthenticated && (
          <ESReport
            reportType={REPORT_TYPE.COMMUNITY}
            target_id={data.hash_key}
            title={t('common:community.report_community')}
            data={detail}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
        )}
      </>
    )
  }

  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={`${classes.tabs} community-tab`}>
          <ESTab label={t('common:community.info')} value={TABS.INFO} />
          {showTopicListAndSearchTab && <ESTab label={t('common:community.topic_list')} value={TABS.TOPIC_LIST} />}
          {showTopicListAndSearchTab && <ESTab label={t('common:community.search')} value={TABS.SEARCH} />}
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.INFO:
        return <InfoContainer isOfficial={isOfficial} data={data} />
      case TABS.TOPIC_LIST:
        return !!topicList && showTopicListAndSearchTab && <TopicListContainer />
      case TABS.SEARCH:
        return showTopicListAndSearchTab && <SearchContainer />
      default:
        break
    }
  }

  return (
    <Grid container className={classes.container}>
      <Box color={Colors.grey[300]} width="100%">
        {getHeader()}
        {getTabs()}
        {getContent()}
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  lockIconWrap: {
    position: 'relative',
    '&::before': {
      backgroundColor: Colors.white,
      content: "''",
      position: 'absolute',
      top: 11,
      right: 8,
      width: 4,
      height: 5,
      borderRadius: '50%',
    },
  },
  twitter_logo: {
    height: 23,
    width: 23,
  },
  container: {
    padding: theme.spacing(3),
  },
  title: {
    wordBreak: 'break-word',
  },
  lockIcon: {
    color: Colors.primary,
    fontSize: 18,
    marginLeft: theme.spacing(1),
  },
  checkIcon: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    backgroundColor: Colors.primary,
    borderRadius: '50%',
    marginLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiIcon-fontSizeSmall': {
      fontSize: '0.7rem',
    },
  },
  communityId: { marginRight: 20 },
  urlCopy: {
    marginRight: 12,
    cursor: 'pointer',
    color: '#EB5686',
  },
  link: {
    marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  detailCommonButtons: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    height: '36px',
  },
  commentIcon: {
    '&:hover': {
      outline: 'none',
      borderColor: '#d600fd',
      boxShadow: '0 0 10px #d600fd',
    },
    '&.MuiFab-root': {
      width: 220,
      height: 50,
    },
  },
  addCommentIcon: {
    transform: 'scaleX(-1)',
    margin: theme.spacing(1),
  },
  addCommentText: {
    letterSpacing: -1,
    margin: theme.spacing(1),
  },
  boxContainer: {
    display: 'flex',
  },
  menuOuter: {
    marginLeft: theme.spacing(0),
  },
  [theme.breakpoints.down('sm')]: {
    commentIcon: {
      '&.MuiFab-root': {
        width: 99,
        height: 99,
      },
    },
    addCommentIcon: {
      fontSize: 30,
      margin: theme.spacing(0),
    },
    addCommentText: {
      fontSize: 10,
      margin: theme.spacing(0),
    },
    boxContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuOuter: {
      marginLeft: theme.spacing(0),
    },
  },
}))

export default DetailInfo
