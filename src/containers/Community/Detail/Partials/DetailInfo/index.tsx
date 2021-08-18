import { useState } from 'react'
import { Grid, Box, Icon, Typography, useMediaQuery, useTheme, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import * as commonActions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
// import { FormatHelper } from '@utils/helpers/FormatHelper'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import InfoContainer from './../InfoContainer'
import TopicListContainer from './../TopicListContainer'
import useCommunityDetail from './../../useCommunityDetail'
import ESButton from '@components/Button'
import ESReport from '@containers/Report'
import { REPORT_TYPE } from '@constants/common.constants'
import SearchContainer from '../SearchContainer'
import Fab from '@material-ui/core/Fab'
import AddCommentIcon from '@material-ui/icons/AddComment'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import FollowList from '../FollowList'
import ApproveList from '../ApproveList'

type Props = {
  detail: any
  toEdit?: () => void
}

enum TABS {
  INFO = 0,
  TOPIC_LIST = 1,
  SEARCH = 2,
}

const DetailInfo: React.FC<Props> = ({ detail, toEdit }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [openReport, setOpenReport] = useState(false)
  const [tab, setTab] = useState(0)
  const data = detail.attributes

  const isFollowing = false
  const isAdmin = true
  const { isAuthenticated } = useCommunityDetail()

  const router = useRouter()
  const _theme = useTheme()
  const { community_id } = router.query
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  const handleReportOpen = () => {
    setOpenReport(true)
  }

  const handleCopy = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.toString())
    }
    dispatch(commonActions.addToast(t('common:community.copy_shared_url_toast')))
  }

  const getHeader = () => {
    return (
      <>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box pt={1} color={Colors.white} display="flex">
            <Typography className={classes.title} variant="h3">
              {data.title}
            </Typography>
            <Box ml={3.6}>
              {data.is_official ? (
                <ButtonBase href="#" target="_blank">
                  <img className={classes.checkIcon} src="/images/check_icon.png" />
                </ButtonBase>
              ) : (
                data.is_private && <Icon className={`fas fa-lock ${classes.lockIcon}`} />
              )}
            </Box>
          </Box>
          <Box ml={1} display="flex" flexDirection="row" flexShrink={0}>
            {isAuthenticated ? (
              isAdmin ? (
                <ESButton variant="outlined" round className={classes.button} disabled={false} onClick={toEdit}>
                  {t('common:community.edit')}
                </ESButton>
              ) : isFollowing ? (
                <ESButton variant="contained" color="primary" round className={classes.button} disabled={true}>
                  {t('common:profile.following')}
                </ESButton>
              ) : (
                <ESButton variant="outlined" round className={classes.button} disabled={false}>
                  {t('common:profile.follow_as')}
                </ESButton>
              )
            ) : null}
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
          <ESTab label={t('common:community.topic_list')} value={TABS.TOPIC_LIST} />
          <ESTab label={t('common:community.search')} value={TABS.SEARCH} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.INFO:
        return <InfoContainer />
      case TABS.TOPIC_LIST:
        return <TopicListContainer />
      case TABS.SEARCH:
        return <SearchContainer />
      default:
        break
    }
  }

  const toCreateTopic = () => {
    router.push(ESRoutes.TOPIC_CREATE.replace(/:id/gi, community_id.toString()))
  }

  return (
    <Grid container className={classes.container}>
      <Box color={Colors.grey[300]} display="flex" flex="1" flexDirection="column" width="100%">
        {getHeader()}
        {getTabs()}
        {getContent()}
        <Box className={classes.commentIconContainer}>
          <Box />
          <Box>
            <Fab
              variant={isMobile ? 'round' : 'extended'}
              size="large"
              color="primary"
              aria-label="add"
              className={classes.commentIcon}
              onClick={() => toCreateTopic()}
            >
              <Box className={classes.boxContainer}>
                <AddCommentIcon className={classes.addCommentIcon} />
                <Typography className={classes.addCommentText}>
                  {isMobile ? t('common:community.topic_creation') : t('common:topic_create.title')}
                </Typography>
              </Box>
            </Fab>
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
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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
