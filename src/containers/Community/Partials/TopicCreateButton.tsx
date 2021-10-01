import { Box, ButtonBase, makeStyles, Typography } from '@material-ui/core'
import AddCommentIcon from '@material-ui/icons/AddComment'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

type Props = {
  onClick: () => void
  isMobile: boolean
}

const TopicCreateButton: React.FC<Props> = ({ onClick, isMobile }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <Box>
      {isMobile ? (
        <ButtonBase
          onClick={onClick}
          className={`${classes.button} gradient button-primary primary-rounded primary-small`}
          style={{ width: 99, height: 99, borderRadius: 50 }}
        >
          <div className="circle"></div>
          <Box className={classes.boxContainer}>
            <AddCommentIcon className={classes.addCommentIcon} />
            <Typography className={classes.addCommentText}>{t('common:community.topic_creation')}</Typography>
          </Box>
        </ButtonBase>
      ) : (
        <ButtonBase
          onClick={onClick}
          className={`${classes.button} gradient button-primary primary-rounded primary-small`}
          style={{ width: 220, height: 50 }}
        >
          <div className="circle"></div>
          <Box className={classes.boxContainer}>
            <AddCommentIcon className={classes.addCommentIcon} />
            <Typography className={classes.addCommentText}>{t('common:topic_create.title')}</Typography>
          </Box>
        </ButtonBase>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      '& .MuiSvgIcon-root': {
        color: Colors.primary,
      },
      '& .MuiTypography-root': {
        color: Colors.primary,
      },
    },
  },
  boxContainer: {
    display: 'flex',
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
  },
  addCommentIcon: {
    transform: 'scaleX(-1)',
    margin: theme.spacing(1),
  },
  addCommentText: {
    letterSpacing: 0,
    margin: theme.spacing(1),
    whiteSpace: 'nowrap',
    zIndex: 1,
  },

  [theme.breakpoints.down('sm')]: {
    addCommentIcon: {
      fontSize: 30,
      margin: theme.spacing(0),
    },
    addCommentText: {
      fontSize: 10,
      margin: theme.spacing(0),
      whiteSpace: 'nowrap',
    },
    boxContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))

export default TopicCreateButton
