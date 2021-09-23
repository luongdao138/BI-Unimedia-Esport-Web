import { Box, Typography, Icon, IconButton, Popover, Link, ButtonBase, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESLoader from '@components/Loader'
import ESMenuItem from '@components/Menu/MenuItem'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import { createRef, Dispatch, SetStateAction, useState } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'
import { CommentsResponse } from '@services/community.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import router, { useRouter } from 'next/router'
import { Close as IconClose } from '@material-ui/icons'
import { ESRoutes } from '@constants/route.constants'
import Linkify from 'react-linkify'
import _ from 'lodash'
import useTopicHelper from '../../useTopicHelper'
import useTopicDetail from '../../useTopicDetail'
import styled from 'styled-components'
import { useRect } from '@utils/hooks/useRect'
import { REPLY_REGEX } from '@constants/community.constants'

let currentReplyNumberRectLeft: number
const StyledBox = styled(Box)``
const contentRef = createRef<HTMLDivElement>()

type StyleParams = {
  currentReplyNumberRectLeft: number
}

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
    topic_title?: string
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
  const contentRect = useRect(contentRef)
  const _theme = useTheme()
  const { isOwner } = useTopicHelper(comment.attributes.user_code)
  const { isModerator, isPublic, isNotMember, isTopicOwner } = menuParams
  const { getCommentDetail, commentDetail, commentDetailMeta, resetCommentDetail } = useTopicDetail()

  const toProfile = (user_code) => router.push(`${ESRoutes.PROFILE}/${user_code}`)

  const handleClickReply = (event, content) => {
    getCommentDetail({ topic_hash: topic_hash_key, comment_no: content.slice(2) })
    setReplyAnchorEl(event.currentTarget)
    currentReplyNumberRectLeft = event.currentTarget.getBoundingClientRect().left - contentRect.left
  }

  const handleCloseReply = () => {
    setReplyAnchorEl(null)
    resetCommentDetail()
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
      <Box className={classes.imageContainer}>
        <SRLWrapper options={LIGHTBOX_OPTIONS}>
          <img className={`${classes.imageBox} ${isPopOver && classes.popOverImage}`} src={image_url} />
        </SRLWrapper>
      </Box>
    )
  }

  const newLineText = (text, isReply = false) => {
    return _.map(_.split(text, '\n'), (str, i) => (
      <Typography key={i} className={classes.content}>
        {_.map(
          _.filter(_.split(str, REPLY_REGEX), (el) => !_.isEmpty(el)),
          (content, index) => {
            return content.match(REPLY_REGEX) && !isReply ? renderPopover(content, index) : content
          }
        )}
      </Typography>
    ))
  }

  const renderPopover = (content, index) => {
    return (
      <Link id={index} onClick={(e) => handleClickReply(e, content)} className={classes.reply}>
        <Typography className={classes.replied_id}>{content}</Typography>
      </Link>
    )
  }

  const popoverContent = () => {
    return (
      <>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
          <Box className={classes.userInfoContainerMain}>
            <Typography className={classes.number}>{replyData.comment_no}</Typography>
            <Box ml={1}>
              <ButtonBase onClick={() => toProfile(replyData.user_code)}>
                <ESAvatar className={classes.avatar} alt={replyData.owner_nickname} src={replyData.owner_profile} />
              </ButtonBase>
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
          <Typography className={classes.content}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                  {decoratedText}
                </a>
              )}
            >
              <Typography>{newLineText(replyData.content, true)}</Typography>
            </Linkify>
          </Typography>
          {replyData.attachments &&
            replyData.attachments[0]?.assets_url &&
            renderClickableImage(replyData.attachments[0]?.assets_url, true)}
        </Box>
      </>
    )
  }

  const notDeletedComment = () => {
    return (
      <StyledBox ref={contentRef}>
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
                <Box className={classes.menuWrapper}>
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
                </Box>
              )}
            </Box>
          </Box>
          {commentData.content && (
            <Box
              className={
                commentData.attachments && commentData.attachments[0]?.assets_url
                  ? classes.contentContainerWithImage
                  : classes.contentContainer
              }
            >
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                    {decoratedText}
                  </a>
                )}
              >
                {newLineText(commentData.content)}
              </Linkify>
            </Box>
          )}

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
          style={{
            left: contentRect.left + _theme.spacing(3),
          }}
        >
          {!_.isEmpty(commentDetail) &&
            commentDetailMeta.loaded &&
            (replyData.deleted_at ? deletedComment(replyData.comment_no, true) : popoverContent())}
          {commentDetailMeta.error && (
            <Box className={classes.emptyPopoverContent}>
              <Box flex={1} />
              <Typography className={`${classes.content} ${classes.center}`}>{t('common:topic_comment.comment_not_exist')}</Typography>
              <Box>
                <Box flex={1} textAlign="end">
                  <IconButton className={classes.closeMainComment} onClick={handleCloseReply}>
                    <IconClose fontSize="small" className={classes.closeMainCommentIcon} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
          {commentDetailMeta.pending && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          )}
        </Popover>
      </StyledBox>
    )
  }

  const deletedComment = (comment_no, isReply = false) => {
    return (
      <>
        <Box
          className={isReply ? classes.emptyPopoverContent : classes.containerDeleted}
          borderTop={!isReply && '1px solid rgba(255,255,255,0.1)'}
        >
          <Box flex={1}>
            <Typography className={classes.number}>{comment_no}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" flex={8} textAlign="center">
            <Typography className={`${classes.content} ${isReply && classes.center}`}>
              {t('common:topic_comment.has_deleted_comment')}
            </Typography>
          </Box>
          <Box flex={1} textAlign="end">
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
  center: {
    flex: 8,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  linkify: {
    color: Colors.white,
    textDecoration: 'underline',
    wordBreak: 'break-all',
  },
  container: {
    display: 'flex',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    flexDirection: 'column',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: `14.5px ${theme.spacing(2)}px 14.5px`,
  },
  containerDeleted: {
    display: 'flex',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `14.5px ${theme.spacing(2)}px 14.5px`,
  },
  emptyPopoverContent: {
    display: 'flex',
    justifyContent: 'space-between',
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
    position: 'relative',
    marginBottom: theme.spacing(1),
    marginTop: 9,
  },
  contentContainerWithImage: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: 7,
    marginTop: 9,
  },
  imageContainer: {
    marginTop: 9,
    marginBottom: theme.spacing(1),
  },
  popcontent: {
    position: 'absolute',
    width: 'calc(100% + 32px)',
    background: 'green',
    border: '2px solid blue',
    borderRadius: 4,
    padding: 24,
    top: '-90%',
    left: -16,
    visibility: 'hidden',
    opacity: 0,
    '& .show': {
      visibility: 'visible',
      opacity: 1,
    },
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
    marginRight: -12,
    color: Colors.white_opacity[70],
  },
  mainComment: {
    '& .MuiPopover-paper': {
      left: '0 !important',
      padding: theme.spacing(2),
      border: '3px solid #646464',
      background: 'rgba(33,33,33,.9)',
      borderRadius: 4,
      position: 'relative',
      overflow: 'initial !important',
      width: 791,
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 'Calc(100% + 3px)',
        left: (props: StyleParams) => props.currentReplyNumberRectLeft - 12,
        marginLeft: -5,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#646464 transparent transparent transparent',
      },
    },
  },
  menuWrapper: {
    marginRight: -12,
  },
  [theme.breakpoints.only('lg')]: {
    mainComment: {
      '& .MuiPopover-paper': {
        maxWidth: 610,
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
