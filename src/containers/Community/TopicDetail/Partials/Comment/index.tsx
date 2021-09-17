import { Box, Typography, Icon, IconButton, Popover, Link, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESLoader from '@components/Loader'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'
import { CommentsResponse } from '@services/community.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import router, { useRouter } from 'next/router'
import { Close as IconClose } from '@material-ui/icons'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import useTopicHelper from '../../useTopicHelper'
import useTopicDetail from '../../useTopicDetail'

let currentReplyNumberRectLeft = null

type MenuParams = {
  isTopicOwner: boolean
  isModerator: boolean
  isNotMember: boolean
  isPublic: boolean
}

export type ReportData = {
  attributes: {
    nickname: string
    user_code: string
    content: string
    date: string
    image: string
    number: number
    hash_key: string
  }
}

type CommunityHeaderProps = {
  comment: CommentsResponse
  menuParams?: MenuParams
  handleReply?: (params: { hash_key: string; comment_no: number }) => void
  setOpenDelete?: Dispatch<SetStateAction<boolean>>
  setSelectedCommentNo?: Dispatch<SetStateAction<number>>
  onReport?: (comment: ReportData) => void
}
const Comment: React.FC<CommunityHeaderProps> = ({ comment, menuParams, handleReply, setOpenDelete, setSelectedCommentNo, onReport }) => {
  const classes = useStyles({ currentReplyNumberRectLeft })
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const [replyAnchorEl, setReplyAnchorEl] = useState(null)
  const { isOwner } = useTopicHelper(comment.attributes.user_code)
  const { isModerator, isPublic, isNotMember, isTopicOwner } = menuParams
  const { getCommentDetail, commentDetail, commentDetailMeta } = useTopicDetail()

  const handleClickReply = (event, content) => {
    getCommentDetail({ topic_hash: topic_hash_key, comment_no: content.slice(2) })
    setReplyAnchorEl(event.currentTarget)
    currentReplyNumberRectLeft = event.currentTarget.getBoundingClientRect().left
  }

  const handleCloseReply = () => {
    setReplyAnchorEl(null)
  }

  const commentData = comment.attributes
  const hash_key = commentData.hash_key

  const detail = {
    attributes: {
      nickname: commentData.owner_nickname,
      user_code: commentData.user_code,
      content: commentData.content,
      date: CommonHelper.staticSmartTime(commentData.created_at),
      image: commentData.attachments && commentData.attachments[0]?.assets_url,
      number: commentData.comment_no,
      hash_key: commentData.hash_key,
      avatar_image: commentData.owner_profile,
    },
  }

  const replyData = commentDetail?.attributes

  const handleDeleteOpen = () => {
    setSelectedCommentNo(commentData.comment_no)
    setOpenDelete(true)
  }
  const handleReport = () => {
    onReport && onReport(detail)
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

  const reply_regex = /(>>[0-9]+)/g

  const newLineText = (text) => {
    return _.map(_.split(text, '\n'), (str, i) => (
      <Typography key={i} className={classes.content}>
        {_.map(
          _.filter(_.split(str, reply_regex), (el) => !_.isEmpty(el)),
          (content, index) => {
            return content.match(reply_regex) ? renderPopover(content, index) : content
          }
        )}
      </Typography>
    ))
  }

  const renderPopover = (content, index) => {
    return (
      <>
        <Link id={index} onClick={(e) => handleClickReply(e, content)} className={classes.reply}>
          <Typography className={classes.replied_id}>{content}</Typography>
        </Link>
      </>
    )
  }

  const popoverContent = () => {
    return (
      <>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
          <Box className={classes.userInfoContainerMain}>
            <Typography className={classes.number}>{replyData.comment_no}</Typography>
            <Box ml={1}>
              <ESAvatar className={classes.avatar} alt={replyData.owner_nickname} src={replyData.owner_profile} />
            </Box>
            <Box className={classes.userInfoBox} ml={1}>
              <Typography className={classes.username}>{replyData.owner_nickname}</Typography>
              <Typography className={classes.userCode}>{'@' + replyData.user_code}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography className={classes.date}>{CommonHelper.staticSmartTime(replyData.created_at)}</Typography>
            <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
              <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
            </IconButton>
          </Box>
        </Box>
        <Box mb={3}>
          <Typography className={classes.content}>{replyData.content}</Typography>
          {replyData.attachments &&
            replyData.attachments[0]?.assets_url &&
            renderClickableImage(replyData.attachments[0]?.assets_url, true)}
        </Box>
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
                      <ESMenuItem onClick={handleReport}>{t('common:topic_comment.report.button')}</ESMenuItem>
                    </LoginRequired>
                  )}
                </ESMenu>
              )}
            </Box>
          </Box>
          <Box className={classes.contentContainer}>{newLineText(commentData.content)}</Box>
          {commentData.attachments &&
            commentData.attachments[0]?.assets_url &&
            renderClickableImage(commentData.attachments[0]?.assets_url)}
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton className={classes.shareButton} onClick={handleCommentReply}>
              <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </Box>
        </Box>
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
          {!_.isEmpty(commentDetail) &&
            commentDetailMeta.loaded &&
            (replyData.deleted_at ? deletedComment(replyData.comment_no, true) : popoverContent())}
          {commentDetailMeta.error && (
            <Box my={1} display="flex" justifyContent="space-between">
              Not found
              <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
                <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
              </IconButton>
            </Box>
          )}
          {commentDetailMeta.pending && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          )}
        </Popover>
      </>
    )
  }

  const deletedComment = (comment_no, isReply = false) => {
    return (
      <>
        <Box className={classes.containerDeleted} borderTop={!isReply && '2px solid rgba(255,255,255,0.1)'}>
          <Box flex={1}>
            <Typography className={classes.number}>{comment_no}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" flex={8} textAlign="center">
            <Typography className={classes.content}>{t('common:topic_comment.has_deleted_comment')}</Typography>
          </Box>
          <Box flex={1}>
            {isReply && (
              <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
                <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
              </IconButton>
            )}
          </Box>
        </Box>
      </>
    )
  }

  return commentData.deleted_at !== null ? deletedComment(commentData.comment_no) : notDeletedComment()
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
    maxHeight: 300,
    maxWidth: 300,
    objectFit: 'contain',
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
        left: (props: { currentReplyNumberRectLeft: number }) => `min(${props.currentReplyNumberRectLeft}px, 747px)`,
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
