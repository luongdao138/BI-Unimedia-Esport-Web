import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

type CommunityHeaderProps = {
  title: string
  // onHandleBack: () => void
}
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title /* onHandleBack */ }) => {
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <>
      <Box className={classes.backContainer}>
        <IconButton /* onClick={onHandleBack} */ className={classes.iconButtonBg2}>
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
  root: {
    padding: theme.spacing(3),
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: Colors.black,
  },
  tabIndicator: {
    visibility: 'hidden',
  },
  tabRoot: {
    cursor: 'initial',
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 'fit-content',
  },
  tabsFixed: {
    display: 'flex',
    justifyContent: 'center',
  },
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
  [theme.breakpoints.up('md')]: {
    flexContainer: {
      justifyContent: 'space-around',
      maxWidth: theme.spacing(50),
      minWidth: theme.spacing(50),
    },
  },
  [theme.breakpoints.down('lg')]: {
    flexContainer: {
      justifyContent: 'space-around',
      maxWidth: theme.spacing(50),
      minWidth: theme.spacing(35),
    },
  },
  [theme.breakpoints.down('sm')]: {
    tabWrapper: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    backContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  ['@media (max-width: 960px)']: {
    backContainer: {
      maxWidth: 'none',
    },
  },
}))

export default CommunityHeader
