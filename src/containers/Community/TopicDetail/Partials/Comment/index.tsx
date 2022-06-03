import { Box, Typography, Icon, IconButton, Link, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import ESLoader from '@components/Loader'
import LoginRequired from '@containers/LoginRequired'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
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
import { REPLY_REGEX } from '@constants/community.constants'
import moment from 'moment'
import ReportToolTip from '@components/ReportToolTip'

const StyledBox = styled(Box)``
let currentReplyNumberRectX: number, currentReplyNumberRectY: number, maxHeight: number

type StyleProps = {
  currentReplyNumberRectX: number
  currentReplyNumberRectY: number
  isBottom: boolean
  maxHeight: number
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
    topic_title?: string
    id: number
  }
}

type CommunityHeaderProps = {
  comment: CommentsResponse
  menuParams?: MenuParams
  showComment: boolean
  setShowComment: Dispatch<SetStateAction<boolean[]>>
  handleReply?: (params: { hash_key: string; comment_no: number }) => void
  setOpenDelete?: Dispatch<SetStateAction<boolean>>
  setSelectedCommentNo?: Dispatch<SetStateAction<number>>
  onReport?: (comment: ReportData) => void
  index: number
  windowHeight: number
}
const Comment: React.FC<CommunityHeaderProps> = ({
  comment,
  menuParams,
  handleReply,
  setOpenDelete,
  setSelectedCommentNo,
  onReport,
  showComment,
  setShowComment,
  index,
  windowHeight,
}) => {
  const [isBottom, setIsBottom] = useState<boolean>(false)

  const classes = useStyles({ currentReplyNumberRectX, currentReplyNumberRectY, isBottom, maxHeight })
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const [replyAnchorEl, setReplyAnchorEl] = useState(null)
  const { isOwner } = useTopicHelper(comment.attributes.user_code)
  const { isModerator, isPublic, isNotMember, isTopicOwner } = menuParams
  const { getCommentDetail, commentDetail, commentDetailMeta, resetCommentDetail } = useTopicDetail()
  const contentRef = useRef(null)
  const popoverInnerRef = useRef()

  const toProfile = (user_code) => {
    CommonHelper.checkUserCode(user_code, () => {
      router.push(`${ESRoutes.PROFILE}/${user_code}`)
    })
  }

  const handleClickReply = (event, content) => {
    if (!_.isEmpty(replyAnchorEl)) {
      setReplyAnchorEl(() => null)
    }
    getCommentDetail({ topic_hash: topic_hash_key, comment_no: content.slice(2) })
    const currentRect = event.currentTarget.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    if (windowHeight / 2 > currentRect.top) {
      setIsBottom(false)
      maxHeight = windowHeight - currentRect.bottom - 62
      currentReplyNumberRectY = contentRect.bottom - currentRect.bottom
    } else {
      setIsBottom(true)
      maxHeight = currentRect.top - 63
      currentReplyNumberRectY = currentRect.top - contentRect.top
    }
    setReplyAnchorEl(event.currentTarget)
    currentReplyNumberRectX = currentRect.left - contentRect.left
    setShowComment((comments) => _.map(comments, (__, i) => (Number(i) === index ? true : false)))
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
      date: moment(commentData.created_at).format('LL'),
      image: commentData.attachments && commentData.attachments[0]?.assets_url,
      number: commentData.comment_no,
      hash_key: commentData.hash_key,
      avatar_image: commentData.owner_profile,
      id: commentData.id,
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
            return content.match(REPLY_REGEX) && !isReply ? renderPopoverLink(content, index, i) : content
          }
        )}
      </Typography>
    ))
  }

  const renderPopoverLink = (content, index, i) => {
    return (
      <Link key={`${index}-${i}`} onClick={(e) => handleClickReply(e, content)} className={classes.reply}>
        <Typography component="span" className={classes.replied_id}>
          {content}
        </Typography>
      </Link>
    )
  }

  const renderPopover = () => {
    return (
      <>
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
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <ESLoader />
          </Box>
        )}
      </>
    )
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
    function handleClick(e: any) {
      if (popoverInnerRef && popoverInnerRef.current) {
        const ref: any = popoverInnerRef.current
        if (!ref.contains(e.target) && document.getElementById('SRLLightbox') === null) {
          setShowComment((comments) => _.map(comments, () => false))
        }
      }
    }
  }, [])

  const popoverContent = () => {
    return (
      <StyledBox ref={popoverInnerRef} p={2}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
          <Box className={classes.userInfoContainer}>
            <Typography className={classes.number}>{replyData.comment_no}</Typography>
            <Box ml={1}>
              {replyData.is_system ? (
                <ESAvatar className={classes.avatar} alt={replyData.owner_nickname} src={replyData.owner_profile} />
              ) : (
                <ButtonBase
                  onClick={() => toProfile(replyData.user_code)}
                  style={{ cursor: CommonHelper.handleAccountSystem(replyData.user_code) ? 'default' : 'point' }}
                  disabled={CommonHelper.handleAccountSystem(replyData.user_code)}
                >
                  <ESAvatar className={classes.avatar} alt={replyData.owner_nickname} src={replyData.owner_profile} />
                </ButtonBase>
              )}
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
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                {decoratedText}
              </a>
            )}
          >
            {newLineText(replyData.content, true)}
          </Linkify>
          {replyData.attachments &&
            replyData.attachments[0]?.assets_url &&
            renderClickableImage(replyData.attachments[0]?.assets_url, true)}
        </Box>
      </StyledBox>
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
                {commentData.is_system ? (
                  <ESAvatar className={classes.avatar} alt={commentData.owner_nickname} src={commentData.owner_profile} />
                ) : (
                  <ButtonBase
                    onClick={() =>
                      CommonHelper.checkUserCode(commentData.user_code, () => {
                        router.push(`${ESRoutes.PROFILE}/${commentData.user_code}`)
                      })
                    }
                    style={{ cursor: CommonHelper.handleAccountSystem(commentData.user_code) ? 'default' : 'point' }}
                    disabled={CommonHelper.handleAccountSystem(commentData.user_code)}
                  >
                    <ESAvatar className={classes.avatar} alt={commentData.owner_nickname} src={commentData.owner_profile} />
                  </ButtonBase>
                )}
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
                  {/* <ESMenu> */}
                  {(isModerator || isOwner || isTopicOwner) && (
                    // <ESMenuItem onClick={handleDeleteOpen}>{t('common:topic_comment.delete.button')}</ESMenuItem>
                    <ReportToolTip handleReportOpen={handleDeleteOpen} reportText={t('common:topic_comment.delete.button')} />
                  )}
                  {!isOwner && (
                    <LoginRequired>
                      {/* <ESMenuItem onClick={handleReport}>{t('common:topic_comment.report.button')}</ESMenuItem> */}
                      <ReportToolTip handleReportOpen={handleReport} reportText={t('common:topic_comment.report.button')} />
                    </LoginRequired>
                  )}
                  {/* </ESMenu> */}
                </Box>
              )}
            </Box>
          </Box>
          <StyledBox className={classes.contentContainer} ref={contentRef}>
            {showComment && (
              <Box className={`${classes.popcontentArrow} ${Boolean(replyAnchorEl) && 'show'}`}>
                <Box className={classes.popcontent}>{renderPopover()}</Box>
              </Box>
            )}
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                  {decoratedText}
                </a>
              )}
            >
              {newLineText(commentData.content)}
            </Linkify>
          </StyledBox>
          {commentData.attachments &&
            commentData.attachments[0]?.assets_url &&
            renderClickableImage(commentData.attachments[0]?.assets_url)}
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton className={classes.shareButton} onClick={handleCommentReply}>
              <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </Box>
        </Box>
      </>
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
    padding: theme.spacing(0.25),
    backgroundColor: Colors.grey[200],
  },
  closeMainCommentIcon: {
    fontSize: 17,
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
    margin: theme.spacing(2),
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
  imageContainer: {
    marginTop: 9,
    marginBottom: theme.spacing(1),
  },
  popcontent: {
    position: 'absolute',
    width: `calc(100% + ${theme.spacing(4)}px)`,
    maxHeight: (props: StyleProps) => props.maxHeight,
    overflowY: 'auto',
    background: 'rgba(33, 33, 33, .9)',
    border: '3px solid #646464',
    borderRadius: 4,
    top: (props: StyleProps) => (props.isBottom ? 'auto' : `calc(100% - ${props.currentReplyNumberRectY}px)`),
    bottom: (props: StyleProps) => (props.isBottom ? `calc(100% - ${props.currentReplyNumberRectY}px)` : 'auto'),
    left: theme.spacing(-2),
    zIndex: 1,
    willChange: 'transform',
    transform: 'translateZ(0)',
    webkitTransform: 'translateZ(0)',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      opacity: 1,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: Colors.grey[10],
      borderRadius: 6,
      opacity: 1,
      visibility: 'visible',
    },
  },
  popcontentArrow: {
    visibility: 'hidden',
    opacity: 0,
    '&:before': {
      content: "''",
      position: 'absolute',
      top: (props: StyleProps) =>
        props.isBottom ? props.currentReplyNumberRectY : `calc(100% - ${props.currentReplyNumberRectY}px - 10px)`,
      left: (props: StyleProps) => props.currentReplyNumberRectX + theme.spacing(2) || theme.spacing(1),
      transform: (props: StyleProps) => (props.isBottom ? 'none' : 'rotate(180deg)'),
      marginLeft: -5,
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: '#646464 transparent transparent transparent',
    },
    '&.show': {
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
    '&:before': {
      content: '" "',
      whiteSpace: 'pre',
    },
  },
  number: {
    fontSize: 10,
  },
  shareButton: {
    padding: theme.spacing(0.5),
    marginRight: -12,
    color: Colors.white_opacity[70],
  },
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default Comment
