import { Box, Typography, Icon, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import useCommunityDetail from '@containers/Community/Detail/useCommunityDetail'
import { useState } from 'react'
import { REPORT_TYPE } from '@constants/common.constants'
import ESReport from '@containers/Report'
import DiscardDialog from '@containers/Community/Partials/DiscardDialog'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'
import { CommunityDetail, TopicDetail } from '@services/community.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useTopicHelper from '../../useTopicHelper'
import useCommunityHelper from '@containers/Community/hooks/useCommunityHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'

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
  const [openDelete, setOpenDelete] = useState(false)
  const topicData = topic?.attributes
  const { isOwner } = useTopicHelper(topicData?.owner_user_code)
  const { isModerator, isPublic, isNotMember } = useCommunityHelper(community)
  const detail = {
    attributes: {
      nickname: topicData?.owner_name,
      user_code: topicData?.owner_user_code,
      content: topicData?.content,
      date: CommonHelper.staticSmartTime(topicData?.created_at),
      image: !!topicData?.attachments && topicData.attachments[0]?.assets_url,
      hash_key: topicData?.hash_key,
      avatar_image: topicData?.owner_profile,
    },
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }
  const handleDeleteOpen = () => {
    setOpenDelete(true)
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
              <ButtonBase onClick={() => router.push(`${ESRoutes.PROFILE}/${topicData?.owner_user_code}`)}>
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
                <Typography className={classes.date}>{CommonHelper.staticSmartTime(topicData?.created_at)}</Typography>

                {(isPublic || !isNotMember) && (
                  <Box className={classes.menuWrapper}>
                    <ESMenu>
                      {(isModerator || isOwner) && <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic.delete.button')}</ESMenuItem>}
                      {!isOwner && (
                        <LoginRequired>
                          <ESMenuItem onClick={handleReportOpen}>{t('common:topic.report.button')}</ESMenuItem>
                        </LoginRequired>
                      )}
                    </ESMenu>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box className={classes.contentContainer} mb={2} mt={1}>
            <Typography className={classes.content}>{isConfirm ? content : topicData?.content}</Typography>
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
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
          <DiscardDialog
            title={topicData?.title + t('common:topic.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDelete}
            description={t('common:topic.delete.description')}
            confirmTitle={t('common:topic.delete.submit')}
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
    width: 'calc(100% - 150px)',
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
    color: Colors.white_opacity[30],
  },
  contentContainer: {
    display: 'flex',
  },
  content: {
    color: Colors.grey[300],
    fontSize: 14,
    wordBreak: 'break-word',
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
