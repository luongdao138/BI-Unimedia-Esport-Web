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
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import InfoContainer from './../InfoContainer'
import TopicListContainer from './../TopicListContainer'
import useCommunityDetail from './../../useCommunityDetail'
import ESButton from '@components/Button'
import ESReport from '@containers/Report'
import { useRouter } from 'next/router'
import { REPORT_TYPE } from '@constants/common.constants'
import SearchContainer from '../SearchContainer'
import TopicCreateButton from '@containers/Community/Partials/TopicCreateButton'
import { ESRoutes } from '@constants/route.constants'
import FollowList from '../FollowList'
import ApproveList from '../ApproveList'
import { CommunityDetail, TopicDetail } from '@services/community.service'
import { MEMBER_ROLE, JOIN_CONDITION, IS_OFFICIAL, OPEN_RANGE } from '@constants/community.constants'

type Props = {
  detail: CommunityDetail
  toEdit?: () => void
  topicList: TopicDetail[]
  showTopicListAndSearchTab: boolean
}

enum TABS {
  INFO = 0,
  TOPIC_LIST = 1,
  SEARCH = 2,
}

const DetailInfo: React.FC<Props> = ({ detail, topicList, toEdit, showTopicListAndSearchTab }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])

  const classes = useStyles()
  const [openReport, setOpenReport] = useState(false)
  const [tab, setTab] = useState(0)
  const data = detail.attributes

  const { isAuthenticated, followCommunity, unfollowCommunity, followCommunityMeta, unfollowCommunityMeta } = useCommunityDetail()

  const router = useRouter()
  const { hash_key } = router.query

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isCoOrganizer, setIsCoOrganizer] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [isRequested, setIsRequested] = useState<boolean>(false)
  const [isCommunityAutomatic, setIsCommunityAutomatic] = useState<boolean>(true)

  const setOtherRoleFalse = (setRoleType: string) => {
    if (setRoleType == 'setIsAdmin') {
      setIsCoOrganizer(false)
      setIsFollowing(false)
      setIsRequested(false)
    } else if (setRoleType == 'setIsCoOrganizer') {
      setIsAdmin(false)
      setIsFollowing(false)
      setIsRequested(false)
    } else if (setRoleType == 'setIsFollowing') {
      setIsAdmin(false)
      setIsCoOrganizer(false)
      setIsRequested(false)
    } else if (setRoleType == 'setIsRequested') {
      setIsAdmin(false)
      setIsCoOrganizer(false)
      setIsFollowing(false)
    }
  }

  const handleChangeRole = (setRoleType: string, value: boolean) => {
    setOtherRoleFalse(setRoleType)
    if (setRoleType == 'setIsAdmin') {
      setIsAdmin(value)
    } else if (setRoleType == 'setIsCoOrganizer') {
      setIsCoOrganizer(value)
    } else if (setRoleType == 'setIsFollowing') {
      setIsFollowing(value)
    } else if (setRoleType == 'setIsRequested') {
      setIsRequested(value)
    }
  }

  useEffect(() => {
    if (data.my_role === MEMBER_ROLE.ADMIN) {
      handleChangeRole('setIsAdmin', true)
    } else if (data.my_role === MEMBER_ROLE.CO_ORGANIZER) {
      handleChangeRole('setIsCoOrganizer', true)
    } else if (data.my_role === MEMBER_ROLE.MEMBER) {
      handleChangeRole('setIsFollowing', true)
    } else if (data.my_role === MEMBER_ROLE.LEAVE || data.my_role == null) {
      handleChangeRole('setIsFollowing', false)
    } else if (data.my_role === MEMBER_ROLE.REQUESTED) {
      handleChangeRole('setIsRequested', true)
    }
    if (data.join_condition === JOIN_CONDITION.AUTOMATIC) {
      setIsCommunityAutomatic(true)
    } else if (data.join_condition === JOIN_CONDITION.MANUAL) {
      setIsCommunityAutomatic(false)
    }
  }, [])

  useEffect(() => {
    if (followCommunityMeta.loaded) {
      handleChangeRole('setIsFollowing', true)
    }
  }, [followCommunityMeta])

  useEffect(() => {
    if (unfollowCommunityMeta.loaded) {
      handleChangeRole('setIsFollowing', false)
    }
  }, [unfollowCommunityMeta])

  const followHandle = () => {
    followCommunity(String(hash_key))
    if (!isCommunityAutomatic) {
      setIsRequested(true)
    }
  }

  const unfollowHandle = () => {
    unfollowCommunity(String(hash_key))
  }

  const followButton = () => {
    return (
      <ESButton variant="outlined" round className={classes.button} disabled={followCommunityMeta.pending} onClick={followHandle}>
        {t('common:profile.follow_as')}
      </ESButton>
    )
  }

  const applyingButton = () => {
    return (
      <ESButton variant="outlined" round className={classes.button} disabled={true}>
        {t('common:community.applying')}
      </ESButton>
    )
  }

  const unfollowButton = () => {
    return (
      <ESButton
        variant="contained"
        round
        className={classes.button}
        color="primary"
        disabled={unfollowCommunityMeta.pending}
        onClick={unfollowHandle}
      >
        {t('common:profile.following')}
      </ESButton>
    )
  }

  const editButton = () => {
    return (
      <ESButton variant="outlined" round className={classes.button} disabled={false} onClick={toEdit}>
        {t('common:community.edit')}
      </ESButton>
    )
  }

  const DetailInfoButton = () => {
    return (
      <>
        {isAuthenticated
          ? isAdmin || isCoOrganizer
            ? editButton()
            : isRequested
            ? applyingButton()
            : isFollowing
            ? unfollowButton()
            : followButton()
          : null}
      </>
    )
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }

  const handleCopy = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.toString())
    }
    dispatch(commonActions.addToast(t('common:community.copy_shared_url_toast_text')))
  }

  const getHeader = () => {
    return (
      <>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box pt={1} color={Colors.white} display="flex">
            <Typography className={classes.title} variant="h3">
              {data.name}
            </Typography>
            <Box ml={3.6}>
              {data.is_official === IS_OFFICIAL.OFFICIAL ? (
                <img className={classes.checkIcon} src="/images/check_icon.png" />
              ) : (
                data.open_range === OPEN_RANGE.SEARCHABLE && <Icon className={`fas fa-lock ${classes.lockIcon}`} />
              )}
            </Box>
          </Box>
          <Box ml={1} display="flex" flexDirection="row" flexShrink={0}>
            {DetailInfoButton()}
            <ESMenu>
              <LoginRequired>
                <ESMenuItem onClick={handleReportOpen}>{t('common:community.report')}</ESMenuItem>
              </LoginRequired>
            </ESMenu>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>{`${t('common:community.community_id')}${detail.id}`}</Typography>
          <Box display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
            <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
            <Typography>{t('common:community.copy_shared_url')}</Typography>
          </Box>
          <ESButtonTwitterCircle className={classes.marginLeft} link={'blabla'} />
        </Box>

        <Box marginTop={2} display="flex">
          <FollowList />
          <ApproveList />
        </Box>

        {isAuthenticated && (
          <ESReport
            reportType={REPORT_TYPE.COMMUNITY}
            target_id={Number(detail.id)}
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
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
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
        return <InfoContainer data={data} />
      case TABS.TOPIC_LIST:
        return !!topicList && showTopicListAndSearchTab && <TopicListContainer topicList={topicList} />
      case TABS.SEARCH:
        return showTopicListAndSearchTab && <SearchContainer />
      default:
        break
    }
  }

  const toCreateTopic = () => {
    router.push(ESRoutes.TOPIC_CREATE.replace(/:id/gi, data.hash_key.toString()))
  }

  return (
    <Grid container className={classes.container}>
      <Box color={Colors.grey[300]} display="flex" flex="1" flexDirection="column" width="100%">
        {getHeader()}
        {getTabs()}
        {getContent()}
        <Box className={classes.commentIconContainer}>
          <Box>
            <TopicCreateButton onClick={toCreateTopic} />
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  title: {
    wordBreak: 'break-word',
  },
  lockIcon: {
    color: Colors.primary,
    fontSize: 18,
  },
  checkIcon: {
    height: 20,
  },
  urlCopy: {
    marginLeft: 20,
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
  button: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
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
  commentIconContainer: {
    zIndex: 50,
    display: 'flex',
    justifyContent: 'flex-end',
    width: 99,
    left: 'calc(100% - 99px)',
    position: 'sticky',
    bottom: theme.spacing(4),
  },
  boxContainer: {
    display: 'flex',
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
  },
}))

export default DetailInfo
