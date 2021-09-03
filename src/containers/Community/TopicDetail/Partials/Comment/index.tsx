import { Box, Typography, Icon, IconButton, Popover, Link } from '@material-ui/core'
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
import { CommentsResponse } from '@services/community.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import useTopicDetail from '../../useTopicDetail'
import { useRouter } from 'next/router'
import { Close as IconClose } from '@material-ui/icons'

type CommunityHeaderProps = {
  comment: CommentsResponse
  handleReply?: (params: { hash_key: string; comment_no: number }) => void
}
const Comment: React.FC<CommunityHeaderProps> = ({ comment, handleReply }) => {
  const classes = useStyles()
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const isModerator = true
  const { isAuthenticated } = useCommunityDetail()
  const [openReport, setOpenReport] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [replyAnchorEl, setReplyAnchorEl] = useState(null)

  const handleClickReply = (event) => {
    setReplyAnchorEl(event.currentTarget)
  }

  const handleCloseReply = () => {
    setReplyAnchorEl(null)
  }

  const { deleteComment, getCommentsList } = useTopicDetail()
  const commentData = comment.attributes
  const hash_key = commentData.hash_key
  const detail = {
    attributes: {
      nickname: commentData.owner_nickname,
      user_code: commentData.user_code,
      content: commentData.content,
      date: CommonHelper.staticSmartTime(commentData.created_at),
      image: commentData.attachments[0]?.assets_url,
      number: commentData.comment_no,
      hash_key: commentData.hash_key,
    },
  }

  const handleReportOpen = () => {
    setOpenReport(true)
  }
  const handleDeleteOpen = () => {
    setOpenDelete(true)
  }
  const handleDeleteSubmit = async () => {
    await deleteComment(hash_key)
    setOpenDelete(false)
    getCommentsList({ hash_key: String(topic_hash_key), page: 1 })
  }

  const handleCommentReply = () => {
    handleReply({ hash_key: hash_key, comment_no: commentData.comment_no })
  }

  const renderClickableImage = () => {
    return (
      <Box mb={1}>
        <SRLWrapper options={LIGHTBOX_OPTIONS}>
          <img className={classes.imageBox} src={commentData.attachments[0]?.assets_url} />
        </SRLWrapper>
      </Box>
    )
  }

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.userContainer}>
          <Box className={classes.userInfoContainer}>
            <Typography className={classes.number}>{commentData.comment_no}</Typography>
            <Box ml={1}>
              <ESAvatar className={classes.avatar} alt={commentData.owner_nickname} src={commentData.owner_profile} />
            </Box>

            <Box className={classes.userInfoBox} ml={1}>
              <Typography className={classes.username}>{commentData.owner_nickname}</Typography>
              <Typography className={classes.userCode}>{'@' + commentData.user_code}</Typography>
            </Box>
          </Box>
          <Box className={classes.dateReportContainer}>
            <Typography className={classes.date}>{CommonHelper.staticSmartTime(commentData.created_at)}</Typography>
            <ESMenu>
              {isModerator && <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic_comment.delete.button')}</ESMenuItem>}
              <LoginRequired>
                <ESMenuItem onClick={handleReportOpen}>{t('common:topic_comment.report.button')}</ESMenuItem>
              </LoginRequired>
            </ESMenu>
          </Box>
        </Box>
        {!!commentData && !!commentData.main_comment && (
          <>
            <Link aria-describedby={'reply'} onClick={handleClickReply} className={classes.reply}>
              <Typography>{`>>${commentData.main_comment.comment_no}`}</Typography>
            </Link>
            <Popover
              id={'reply'}
              open={Boolean(replyAnchorEl)}
              anchorEl={replyAnchorEl}
              className={classes.mainComment}
              onClose={handleCloseReply}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
                <Box className={classes.userInfoContainerMain}>
                  <Typography className={classes.number}>{commentData.main_comment.comment_no}</Typography>
                  <Box ml={1}>
                    <ESAvatar
                      className={classes.avatar}
                      alt={commentData.main_comment.owner_nickname}
                      src={commentData.main_comment.owner_profile}
                    />
                  </Box>
                  <Box className={classes.userInfoBox} ml={1}>
                    <Typography className={classes.username}>{commentData.main_comment.owner_nickname}</Typography>
                    <Typography className={classes.userCode}>{'@' + commentData.main_comment.user_code}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography className={classes.date}>{CommonHelper.staticSmartTime(commentData.main_comment.created_at)}</Typography>
                  <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
                    <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
                  </IconButton>
                </Box>
              </Box>
              <Box mb={3}>
                <Typography className={classes.content}>{commentData.main_comment.content}</Typography>
              </Box>
            </Popover>
          </>
        )}
        <Box className={classes.contentContainer} mb={1}>
          <Typography className={classes.content}>{commentData.content}</Typography>
        </Box>
        {commentData.attachments[0]?.assets_url && renderClickableImage()}
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton className={classes.shareButton} onClick={handleCommentReply}>
            <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
          </IconButton>
        </Box>
      </Box>
      {isAuthenticated && (
        <>
          <ESReport
            reportType={REPORT_TYPE.TOPIC_COMMENT}
            target_id={detail.attributes.hash_key}
            data={detail}
            open={openReport}
            handleClose={() => setOpenReport(false)}
          />
          <DiscardDialog
            title={t('common:topic_comment.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDeleteSubmit}
            description={t('common:topic_comment.delete.description')}
            confirmTitle={t('common:topic_comment.delete.submit')}
          />
        </>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  closeMainComment: {
    marginLeft: 14,
    padding: theme.spacing(0.5),
    backgroundColor: Colors.grey[200],
  },
  closeMainCommentIcon: {
    fontSize: 10,
  },
  reply: {
    width: 'fit-content',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  container: {
    display: 'flex',
    margin: theme.spacing(3),
    marginBottom: theme.spacing(2),
    flexDirection: 'column',
    borderTop: '2px solid rgba(255,255,255,0.1)',
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px 0`,
  },
  userContainer: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    width: 'calc(100% - 150px)',
  },
  userInfoContainerMain: {
    display: 'flex',
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
    width: 40,
    height: 40,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  userCode: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  date: {
    fontSize: 12,
    color: Colors.white_opacity[30],
  },
  contentContainer: {
    display: 'flex',
  },
  imageBox: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    width: '66%',
  },
  content: {
    color: Colors.grey[300],
    wordBreak: 'break-word',
  },
  number: {
    fontSize: 10,
  },
  shareButton: {
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    color: Colors.white_opacity[70],
  },
  mainComment: {},
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default Comment
