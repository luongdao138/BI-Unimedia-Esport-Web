import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(() => ({
  grow: { flexGrow: 1 },
  appBar: {
    background: '#000',
    borderBottom: 'solid 1px #70707070',
  },
  toolbar: {
    minHeight: 60,
    justifyContent: 'space-between',
  },
  badge: {
    fontSize: 4,
  },
  icon: {
    fontSize: 30,
  },
  search: {},
  toolArea: {},
}))

export const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar}>
            <img src="/images/logo.svg" />
            <div className={classes.search}>search area</div>
            <div className={classes.toolArea}>
              <IconButton color="inherit">
                <Badge
                  badgeContent={17}
                  color="primary"
                  className={classes.badge}
                >
                  <NotificationsIcon className={classes.icon} />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
