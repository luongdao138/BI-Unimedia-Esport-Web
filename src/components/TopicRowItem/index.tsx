import { Typography, Box, Theme, makeStyles, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'

export interface TopicRowItemProps {
  title?: string
  mail?: string
  description?: string
  date?: string
  comment_number?: number
}

const TopicRowItem: React.FC<TopicRowItemProps> = ({ title, mail, description, date, comment_number }) => {
  const classes = useStyles()

  return (
    <>
      <Box mt={2} display="flex" maxHeight={66} alignItems="flex-start" width="100%">
        <Box display="flex" overflow="hidden" justifyContent="space-between" className={classes.wrap}>
          <Box display="flex" flexDirection="column" width="85%">
            <Box display="flex" flexDirection="row" justifyContent="" width="100%">
              <Typography className={classes.title}>{title}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" width="100%">
              <Box width="15%">
                <Typography className={classes.mail}>{mail}</Typography>
              </Box>
              <Box width="5%" />
              <Box width="80%">
                <Typography className={classes.description}>{description}</Typography>
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" width="15%" alignItems="flex-end">
            <Box width="100%" justifyContent="flex-end" display="flex">
              <Typography className={classes.date}>{date}</Typography>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" width="100%" justifyContent="flex-end">
              <Icon className="fas fa-comment-alt" fontSize="small" />
              <Box ml={1}>
                <Typography className={classes.comment_number}>{comment_number}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  mail: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  description: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  date: {
    color: Colors.white_opacity[30],
    fontSize: 12,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  comment_number: {
    color: Colors.white_opacity[70],
    fontSize: 14,
  },
}))

export default TopicRowItem
