import { Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@components/Tabs'
import Tab from '@components/Tab'
import { LOBBY_STATUS } from '@constants/lobby.constants'
import i18n from '@locales/i18n'

type Props = {
  status: LOBBY_STATUS
  showTab?: boolean
}

const LobbyStatusHeader: React.FC<Props> = ({ status, showTab = true }) => {
  const classes = useStyles()
  const value = status === LOBBY_STATUS.CANCELLED || status === LOBBY_STATUS.DELETED ? LOBBY_STATUS.ENDED : status

  return (
    <>
      <div>
        {showTab && (
          <Tabs
            value={value}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
            classes={{ indicator: classes.tabIndicator, flexContainer: classes.flexContainer, fixed: classes.tabsFixed }}
          >
            <Tab label={i18n.t('common:lobby.tabs.ready')} icon={<Icon className="fa fa-desktop" />} classes={{ root: classes.tabRoot }} />
            <Tab
              label={i18n.t('common:lobby.tabs.recruiting')}
              icon={<Icon className="fa fa-door-open" />}
              classes={{ root: classes.tabRoot }}
            />
            <Tab
              label={i18n.t('common:lobby.tabs.entry_closed')}
              icon={<Icon className="fa fa-hourglass-start" />}
              classes={{ root: classes.tabRoot }}
            />
            <Tab
              label={i18n.t('common:lobby.tabs.in_progress')}
              icon={<Icon className="fa fa-headset" />}
              classes={{ root: classes.tabRoot }}
            />
            <Tab
              label={i18n.t('common:lobby.tabs.ended')}
              icon={<Icon className="fa fa-door-closed" />}
              classes={{ root: classes.tabRoot }}
            />
            <Tab style={{ display: 'none' }} />
          </Tabs>
        )}
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
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
  [theme.breakpoints.up('md')]: {
    flexContainer: {
      width: '100%',
      justifyContent: 'space-around',
      maxWidth: theme.spacing(50),
      minWidth: theme.spacing(50),
    },
  },
  [theme.breakpoints.down('lg')]: {
    flexContainer: {
      width: '100%',
      justifyContent: 'space-around',
      maxWidth: theme.spacing(60),
      minWidth: theme.spacing(35),
    },
  },
  [theme.breakpoints.down('sm')]: {
    tabWrapper: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
}))

export default LobbyStatusHeader
