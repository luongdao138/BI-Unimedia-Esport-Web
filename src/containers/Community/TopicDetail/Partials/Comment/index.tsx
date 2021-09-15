import { Box, Typography, Icon, IconButton, Popover, Link, ButtonBase } from '@material-ui/core'
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
import router, { useRouter } from 'next/router'
import { Close as IconClose } from '@material-ui/icons'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import useTopicHelper from '../../useTopicHelper'

let currentReplyNumberRectLeft = null

type MenuParams = {
  isTopicOwner: boolean
  isModerator: boolean
  isNotMember: boolean
  isPublic: boolean
}
type CommunityHeaderProps = {
  comment: CommentsResponse
  menuParams?: MenuParams
  handleReply?: (params: { hash_key: string; comment_no: number }) => void
}

const Comment: React.FC<CommunityHeaderProps> = ({ comment, menuParams, handleReply }) => {
  const classes = useStyles({ currentReplyNumberRectLeft })
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const { isAuthenticated } = useCommunityDetail()
  const [openReport, setOpenReport] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [replyAnchorEl, setReplyAnchorEl] = useState(null)
  const { isOwner } = useTopicHelper(comment.attributes.user_code)
  const { isModerator, isPublic, isNotMember, isTopicOwner } = menuParams

  const handleClickReply = (event) => {
    setReplyAnchorEl(event.currentTarget)
    currentReplyNumberRectLeft = event.currentTarget.getBoundingClientRect().left
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

  const replyData = commentData

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

  const renderClickableImage = (image_url: string, isPopOver?: boolean) => {
    return (
      <Box mb={1}>
        <SRLWrapper options={LIGHTBOX_OPTIONS}>
          <img className={`${classes.imageBox} ${isPopOver && classes.popOverImage}`} src={image_url} />
        </SRLWrapper>
      </Box>
    )
  }

  const reply_regex = /(>>[0-9]+)+/g

  const newLineText = (text) => {
    if (commentData?.deleted_at) {
      return <Typography className={classes.content}>{t('common:topic_comment.has_deleted') + '。'}</Typography>
    }
    return _.map(_.split(text, '\n'), (str, i) => (
      <Typography key={i} className={classes.content}>
        {_.map(_.split(str, reply_regex), (content, index) => {
          return content.match(reply_regex) ? renderPopover(content, index) : content
        })}
      </Typography>
    ))
  }

  const renderPopover = (content, index) => {
    return (
      <>
        <Link aria-describedby={index} onClick={handleClickReply} className={classes.reply}>
          <Typography className={classes.replied_id}>{content}</Typography>
        </Link>
      </>
    )
  }

  const notDeletedComment = () => {
    return (
      <>
        <Box className={classes.container}>
          <Box className={classes.userContainer}>
            <Box className={classes.userInfoContainer}>
              <Typography className={classes.number}>{commentData.comment_no}</Typography>

              <Box ml={1}>
                <ButtonBase onClick={() => router.push(`${ESRoutes.PROFILE}/${commentData.user_code}`)}>
                  <ESAvatar className={classes.avatar} alt={commentData.owner_nickname} src={commentData.owner_profile} />
                </ButtonBase>
              </Box>

              <Box className={classes.userInfoBox} ml={1}>
                <Typography className={classes.username}>{commentData.owner_nickname}</Typography>
                <Typography className={classes.userCode}>{'@' + commentData.user_code}</Typography>
              </Box>
            </Box>
            <Box className={classes.dateReportContainer}>
              <Typography className={classes.date}>{CommonHelper.staticSmartTime(commentData.created_at)}</Typography>
              {(isPublic || !isNotMember) && (
                <ESMenu>
                  {(isModerator || isOwner || isTopicOwner) && (
                    <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic_comment.delete.button')}</ESMenuItem>
                  )}
                  {!isOwner && (
                    <LoginRequired>
                      <ESMenuItem onClick={handleReportOpen}>{t('common:topic_comment.report.button')}</ESMenuItem>
                    </LoginRequired>
                  )}
                </ESMenu>
              )}
            </Box>
          </Box>
          {!!commentData && !!commentData.main_comment && (
            <>
              <Link onClick={handleClickReply} className={classes.reply}>
                <Typography>{`>>${commentData.main_comment.comment_no}`}</Typography>
              </Link>
            </>
          )}
          <Box className={classes.contentContainer}>{newLineText(commentData.content)}</Box>
          {commentData.attachments[0]?.assets_url && renderClickableImage(commentData.attachments[0]?.assets_url)}
          {!isOwner && (
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton className={classes.shareButton} onClick={handleCommentReply}>
                <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
              </IconButton>
            </Box>
          )}
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

        <Popover
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
            horizontal: 'right',
          }}
        >
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
            <Box className={classes.userInfoContainerMain}>
              <Typography className={classes.number}>{replyData?.main_comment?.comment_no}</Typography>
              <Box ml={1}>
                <ESAvatar
                  className={classes.avatar}
                  alt={replyData?.main_comment?.owner_nickname}
                  src={replyData?.main_comment?.owner_profile}
                />
              </Box>
              <Box className={classes.userInfoBox} ml={1}>
                <Typography className={classes.username}>{replyData?.main_comment?.owner_nickname}</Typography>
                <Typography className={classes.userCode}>{'@' + replyData?.main_comment?.user_code}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography className={classes.date}>{CommonHelper.staticSmartTime(replyData?.main_comment?.created_at)}</Typography>
              <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
                <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
              </IconButton>
            </Box>
          </Box>
          <Box mb={3}>
            <Typography className={classes.content}>{replyData?.main_comment?.content}</Typography>
            {replyData?.main_comment?.assets_url && renderClickableImage(replyData?.main_comment?.assets_url, true)}
          </Box>
        </Popover>
      </>
    )
  }

  const deletedComment = () => {
    return (
      <>
        <Box className={classes.containerDeleted}>
          <Box flex={1}>
            <Typography className={classes.number}>{commentData.comment_no}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" flex={8} textAlign="center">
            {newLineText(commentData.content)}
          </Box>
          <Box flex={1} />
        </Box>
      </>
    )
  }

  return commentData.deleted_at ? deletedComment() : notDeletedComment()
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
  replied_id: {
    color: Colors.primary,
    textDecoration: 'underline',
    display: 'inline',
  },
  container: {
    display: 'flex',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flexDirection: 'column',
    borderTop: '2px solid rgba(255,255,255,0.1)',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  containerDeleted: {
    display: 'flex',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '2px solid rgba(255,255,255,0.1)',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  userContainer: {
    display: 'flex',
    marginBottom: theme.spacing(1),
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
    flexDirection: 'column',
  },
  imageBox: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    width: '66%',
  },
  popOverImage: {
    maxHeight: '50vh',
    objectFit: 'cover',
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
  mainComment: {
    '& .MuiPopover-paper': {
      padding: 16,
      border: '3px solid #646464',
      background: 'rgba(33,33,33,.9)',
      borderRadius: 4,
      position: 'relative',
      overflow: 'initial !important',
      width: 754,
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 'Calc(100% + 3px)',
        left: (props: { currentReplyNumberRectLeft: number }) => props.currentReplyNumberRectLeft || 8,
        marginLeft: -5,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#646464 transparent transparent transparent',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default Comment
