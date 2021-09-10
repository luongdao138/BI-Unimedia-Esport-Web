import { Typography, Box, Theme, makeStyles, Icon } from '@material-ui/core'
import { TopicDetail } from '@services/community.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { CommonHelper } from '@utils/helpers/CommonHelper'

export interface TopicRowItemProps {
  title?: string
  last_comment?: TopicDetail['attributes']['last_comment']['data']
  latest_date?: string
  comment_count?: number
  handleClick?: () => void
}

const TopicRowItem: React.FC<TopicRowItemProps> = ({ title, last_comment, latest_date, comment_count, handleClick }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const lastCommentData = last_comment?.attributes

  const renderContent = () => {
    if (lastCommentData.deleted_at) {
      return '「' + t('common:topic_comment.has_deleted') + '」'
    }
    return lastCommentData.content ? lastCommentData.content : comment_count === 0 ? '' : '「' + t('common:chat.uploaded_image') + '」'
  }

  return (
    <>
      <Box mt={1} display="flex" alignItems="flex-start" width="100%" onClick={handleClick}>
        <Box display="flex" overflow="hidden" justifyContent="space-between" className={classes.wrap}>
          <Box className={classes.container}>
            <Box display="flex" flexDirection="row" width="100%" mb={0.25}>
              <Typography className={classes.title}>{title}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" width="100%">
              <Typography className={classes.last_comment}>{renderContent()}</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" width={80} alignItems="flex-end" justifyContent="space-between">
            <Box width="100%" justifyContent="flex-end" display="flex">
              <Typography className={classes.latest_date}>{CommonHelper.staticSmartTime(latest_date)}</Typography>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" width="100%" justifyContent="flex-end">
              <Icon className="fas fa-comment-alt" fontSize="small" />
              <Box ml={1}>
                <Typography className={classes.comment_count}>{comment_count}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 80px)',
  },
  wrap: {
    width: '100%',
    padding: theme.spacing(2),
    background: Colors.black_opacity[70],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  title: {
    color: Colors.white_opacity[70],
    fontSize: 14,
    wordBreak: 'break-all',
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
  },
  mail: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  last_comment: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  latest_date: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  comment_count: {
    color: Colors.white_opacity[70],
    fontSize: 14,
  },
}))

export default TopicRowItem
