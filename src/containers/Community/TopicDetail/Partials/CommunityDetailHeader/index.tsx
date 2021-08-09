import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

type CommunityHeaderProps = {
  title: string
}
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title }) => {
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <>
      <Box className={classes.backContainer}>
        <IconButton className={classes.iconButtonBg2}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <div style={{ overflow: 'hidden' }}>
          {!isMobile && (
            <Typography variant="h2" className={classes.wrapOne}>
              {title}
            </Typography>
          )}
        </div>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  backContainer: {
    position: 'fixed',
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.black,
    opacity: 0.7,
    zIndex: 100,
    maxWidth: 840,
  },
  iconButtonBg2: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  [theme.breakpoints.down('sm')]: {
    backContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
    },
  },

  ['@media (max-width: 960px)']: {
    backContainer: {
      maxWidth: 'none',
    },
  },
}))

export default CommunityHeader
