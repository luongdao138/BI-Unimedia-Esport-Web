import { Box, Typography, Icon, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ReportToolTip from '@components/ReportToolTip'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import useCommunityDetail from '@containers/Community/Detail/useCommunityDetail'
import { useState } from 'react'
import { REPORT_TYPE } from '@constants/common.constants'
import ESReport from '@containers/Report'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'
import { CommunityDetail, TopicDetail } from '@services/community.service'
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useTopicHelper from '../../useTopicHelper'
import useCommunityHelper from '@containers/Community/hooks/useCommunityHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import moment from 'moment'
import Linkify from 'react-linkify'
import { useConfirm } from '@components/Confirm'
import { COMMUNITY_DIALOGS } from '@constants/community.constants'
import { CommonHelper } from '@utils/helpers/CommonHelper'

type CommunityHeaderProps = {
  user_avatar?: string
  nickname?: string
  user_code?: string
  content?: string
  image?: string
  isConfirm?: boolean
  hash_key?: string
  handleDelete?: () => void
  topic?: TopicDetail
  comment_count?: number
  community?: CommunityDetail
}
const MainTopic: React.FC<CommunityHeaderProps> = ({
  nickname,
  user_code,
  content,
  image,
  user_avatar,
  isConfirm,
  handleDelete,
  topic,
  comment_count,
  community,
}) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { isAuthenticated } = useCommunityDetail()
  const [openReport, setOpenReport] = useState(false)
  const topicData = topic?.attributes
  const { isOwner } = useTopicHelper(topicData?.owner_user_code)
  const { isModerator, isPublic, isNotMember } = useCommunityHelper(community)
  const confirm = useConfirm()
  const detail = {
    attributes: {
      nickname: topicData?.owner_name,
      user_code: topicData?.owner_user_code,
      content: topicData?.content,
      date: moment(topicData?.created_at).format('LL'),
      image: (!!topicData?.attachments && topicData.attachments[0]?.assets_url) || '',
      hash_key: topicData?.hash_key,
      avatar_image: topicData?.owner_profile,
      topic_title: topicData?.title,
    },
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }
  const handleDeleteOpen = () => {
    confirm({
      ...COMMUNITY_DIALOGS.DELETE_TOPIC,
      title: topicData?.title + t('common:topic.delete.title'),
    })
      .then(() => {
        handleDelete()
      })
      .catch(() => {
        /* ... */
      })
  }

  const renderClickableImage = () => {
    return (
      <SRLWrapper options={LIGHTBOX_OPTIONS}>
        <img className={classes.imageBox} src={isConfirm ? image : !!topicData?.attachments && topicData.attachments[0]?.assets_url} />
      </SRLWrapper>
    )
  }

  return (
    <>
      <Box className={isConfirm ? classes.containerConfirm : classes.container}>
        <Box m={2}>
          <Box className={classes.userContainer}>
            <Box className={topicData?.created_at ? classes.userInfoContainer : classes.userInfoContainerNoDate}>
              <ButtonBase
                onClick={() =>
                  CommonHelper.checkUserCode(topicData?.owner_user_code, () => {
                    router.push(`${ESRoutes.PROFILE}/${topicData?.owner_user_code}`)
                  })
                }
                style={{ cursor: CommonHelper.handleAccountSystem(topicData?.owner_user_code) ? 'default' : 'point' }}
                disabled={CommonHelper.handleAccountSystem(topicData?.owner_user_code)}
              >
                <ESAvatar
                  className={classes.avatar}
                  alt={isConfirm ? nickname : topicData?.owner_name}
                  src={isConfirm ? user_avatar : topicData?.owner_profile}
                />
              </ButtonBase>
              <Box className={classes.userInfoBox} ml={1} maxWidth="100%">
                <Typography className={classes.nickname}>{isConfirm ? nickname : topicData?.owner_name}</Typography>
                <Typography className={classes.userCode}>{isConfirm ? '@' + user_code : '@' + topicData?.owner_user_code}</Typography>
              </Box>
            </Box>
            {!isConfirm && (
              <Box className={classes.dateReportContainer}>
                <Typography className={classes.date}>{moment(topicData?.created_at).format('LL')}</Typography>

                {(isPublic || !isNotMember) && (
                  <Box className={classes.menuWrapper}>
                    {/* <ESMenu> */}
                    {(isModerator || isOwner) && (
                      // <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic.delete.button')}</ESMenuItem>
                      <ReportToolTip handleReportOpen={handleDeleteOpen} reportText={t('common:topic.delete.button')} />
                    )}
                    <LoginRequired>
                      {/* <ESMenuItem onClick={handleReportOpen}>{t('common:topic.report.button')}</ESMenuItem> */}
                      <ReportToolTip handleReportOpen={handleReportOpen} reportText={t('common:topic.report.button')} />
                    </LoginRequired>
                    {/* </ESMenu> */}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box className={classes.content} mb={2} mt={1}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                  {decoratedText}
                </a>
              )}
            >
              <Typography className={classes.multiline}> {isConfirm ? content : topicData?.content}</Typography>
            </Linkify>
          </Box>
          {(isConfirm ? image : !!topicData?.attachments && topicData.attachments[0]?.assets_url) && renderClickableImage()}
          {topicData && (
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mt={2}>
              <Box className={classes.numberBox}>
                <Icon className="fas fa-comment-alt" fontSize="small" />
              </Box>
              <Box className={classes.numberBox} mr={1} ml={1}>
                <Typography className={classes.count}>{FormatHelper.kFormatter(comment_count)}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {isAuthenticated && (
        <>
          <ESReport
            reportType={REPORT_TYPE.TOPIC}
            target_id={detail?.attributes.hash_key}
            data={detail}
            title={t('common:topic.report.dialog_title')}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
        </>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: theme.spacing(3),
    backgroundColor: 'black',
    flexDirection: 'column',
    borderRadius: 5,
    border: '1px solid ',
    borderColor: Colors.white_opacity[30],
    marginTop: theme.spacing(1),
  },
  containerConfirm: {
    display: 'flex',
    backgroundColor: 'black',
    flexDirection: 'column',
    borderRadius: 5,
    border: '1px solid ',
    borderColor: Colors.white_opacity[30],
    marginTop: theme.spacing(1),
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    width: 'calc(100% - 160px)',
  },
  userInfoContainerNoDate: {
    display: 'flex',
    width: 'calc(100% - 50px)',
  },
  userAvatarBox: {
    display: 'flex',
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  userInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  dateReportContainer: {
    display: 'flex',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: ' flex-end',
  },
  reportButton: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  replyButton: {
    padding: theme.spacing(0.5),
  },
  nickname: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 16,
  },
  userCode: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 12,
  },
  date: {
    fontSize: 11,
  },
  contentContainer: {
    display: 'flex',
  },
  content: {
    color: Colors.grey[300],
    fontSize: 14,
    wordBreak: 'break-word',
  },
  linkify: {
    color: Colors.white,
    textDecoration: 'underline',
    wordBreak: 'break-all',
  },
  numberBox: {
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
  },
  imageBox: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    maxHeight: 300,
    maxWidth: 300,
    objectFit: 'contain',
  },
  multiline: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  menuWrapper: {
    marginRight: -12,
  },
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default MainTopic
