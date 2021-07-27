import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core'
import theme from '@theme/index'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 24,
    paddingBottom: 24,
    flex: 1,
  },
  spacing: {
    paddingLeft: 8,
    paddingRight: 8,
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
    minWidth: 90,
    minHeight: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  tabs: {
    display: 'none',
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
    background: Colors.grey[900],
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey[1000],
    height: '100%',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    position: 'relative',
  },
  endDetail: {
    display: 'none',
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

  [theme.breakpoints.down('lg')]: {
    root: {
      paddingTop: 8,
      paddingBottom: 8,
      flex: 1,
    },
  },

  [theme.breakpoints.down('sm')]: {
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
    tabHeader: {
      display: 'none',
    },
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
