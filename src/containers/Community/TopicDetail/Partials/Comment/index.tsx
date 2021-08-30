import { Box, Typography, Icon, IconButton } from '@material-ui/core'
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

type CommunityHeaderProps = {
  comment: CommentsResponse
}
const Comment: React.FC<CommunityHeaderProps> = ({ comment }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const isModerator = true
  const { isAuthenticated } = useCommunityDetail()
  const [openReport, setOpenReport] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const commentData = comment.attributes
  const detail = {
    attributes: {
      username: commentData.owner_nickname,
      mail: commentData.user_code,
      description: commentData.content,
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
  const handleDeleteSubmit = () => {
    //
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
              <Typography className={classes.mail}>{commentData.user_code}</Typography>
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

        <Box className={classes.discriptionContainer} mb={3}>
          <Typography className={classes.discription}>{commentData.content}</Typography>
        </Box>
        {commentData.attachments[0]?.assets_url && renderClickableImage()}
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton className={classes.shareButton}>
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
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  date: {
    fontSize: 11,
    color: Colors.white_opacity[30],
  },
  discriptionContainer: {
    display: 'flex',
  },
  imageBox: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    width: '66%',
  },
  discription: {
    color: Colors.white_opacity[70],
  },
  number: {
    fontSize: 10,
  },
  shareButton: {
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    imageBox: {
      width: '80%',
    },
  },
}))

export default Comment
