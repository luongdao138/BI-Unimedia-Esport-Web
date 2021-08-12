import { useState } from 'react'
import { Grid, Box, Icon, Typography } from '@material-ui/core'
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
import SearchContainer from '../../SearchContainer'
import FollowList from '../FollowList'

type Props = {
  detail: any
}

enum TABS {
  INFO = 0,
  TOPIC_LIST = 1,
  SEARCH = 2,
}

const DetailInfo: React.FC<Props> = ({ detail }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  // const [openReport, setOpenReport] = useState(false)
  const [tab, setTab] = useState(0)
  const data = detail.attributes

  const isFollowing = false
  const { isAuthenticated } = useCommunityDetail()

  const handleReportOpen = () => {
    // setOpenReport(true)
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
          <Box pt={1} color={Colors.white}>
            <Typography className={classes.title} variant="h3">
              {data.title}
            </Typography>
          </Box>
          <Box ml={1} display="flex" flexDirection="row" flexShrink={0}>
            {isAuthenticated ? (
              isFollowing ? (
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

        <Box marginTop={2}>
          <FollowList />
        </Box>
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

  return (
    <Grid container className={classes.container}>
      <Box color={Colors.grey[300]} display="flex" flex="1" flexDirection="column">
        {getHeader()}
        {getTabs()}
        {getContent()}
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
}))

export default DetailInfo
