import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core'
import theme from '@theme/index'

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  spacing: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  playerContainer: {
    position: 'relative',
    display: 'block',
    paddingTop: '56.25%',
    width: '100%',
  },
  panel: {
    padding: 0,
    height: '100%',
  },
  tab: {
    minWidth: '50%',
    minHeight: 30,
    '& span': {
      width: 'auto',
      padding: 5,
      borderBottom: `2px solid transparent`,
    },
    '&.Mui-selected span': {
      borderBottom: `2px solid ${Colors.secondary}`,
    },
  },
  tabs: {
    display: 'flex',
    fontSize: 14,
  },
  detail: {
    display: 'block',
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 100,
  },
  tabHeader: {
    color: Colors.white,
    background: theme.palette.background.paper,
    fontSize: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  chatHolder: {
    height: '100%',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    position: 'relative',
  },
  endDetail: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  bannerText: {
    color: 'grey',
  },
  touchPanel: {
    display: 'none',
  },
  desktopBanner: {
    marginTop: 4,
  },
  mobileBanner: {
    paddingTop: 8,
    paddingBottom: 8,
    display: 'block',
  },

  playerWrapper: {
    paddingTop: theme.spacing(3),
  },

  // [theme.breakpoints.down('lg')]: {
  // root: {
  //   paddingTop: 8,
  //   paddingBottom: 8,
  //   flex: 1,
  // },
  // },

  [theme.breakpoints.down('md')]: {
    desktopBanner: {
      display: 'none',
    },
    endDetail: {
      display: 'block',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: Colors.grey[900],
      borderColor: Colors.grey[600],
      borderTopWidth: 1,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderStyle: 'solid',
    },
    spacing: {
      padding: 0,
    },
    root: {
      paddingTop: 0,
      overflow: 'hidden',
      paddingBottom: 0,
    },
    playerWrapper: {
      paddingTop: 0,
    },
    // tabHeader: {
    //   display: 'none',
    // },
    detail: {
      display: 'none',
    },
    panel: {
      height: 'auto',
    },
    touchPanel: {
      display: 'block',
      position: 'absolute',
      left: 0,
      right: 100,
      height: '30%',
      bottom: 0,
      zIndex: 11,
    },
  },
  grid: {
    padding: 0,
  },

  [`${theme.breakpoints.up('sm')} and (max-device-height: 812px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)`]: {
    playerContainer: {
      height: `calc(100vh - 16px)`,
    },
  },
}))

export { useStyles }
