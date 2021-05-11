import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import SearchArea from '@containers/SearchArea'
import { searchOptions } from '@constants/common.constants'

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  appBar: {
    background: '#000',
    borderBottom: 'solid 1px #70707070',
  },
  toolbar: {
    minHeight: 60,
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
  },
  badge: {
    fontSize: 4,
  },
  icon: {
    fontSize: 22,
  },
  search: {},
  toolArea: {},
  button: {
    padding: 10,
  },
  [theme.breakpoints.down('md')]: {
    icon: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.down('xs')]: {
    icon: {
      fontSize: 16,
    },
    button: {
      padding: 8,
    },
  },
}))

interface returnItem {
  value: string
  type: number
}

interface headerProps {
  toggleDrawer: (open: boolean) => void
  open: boolean
}

export const Header: React.FC<headerProps> = ({ toggleDrawer, open }) => {
  const classes = useStyles()

  const onSearch = (_data: returnItem) => {
    //ignore @typescript-eslint/no-empty-function
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="lg" className="header-container">
          <Toolbar className={classes.toolbar}>
            <div
              onClick={() => toggleDrawer(!open)}
              className={`hamburger hamburger--slider js-hamburger mobile-toggle ${open ? 'is-active' : ''}`}
              id="toggle"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
            <a href="/" className="logo">
              <img src="/images/logo.svg" />
            </a>
            <div className={classes.search + ' search-area'}>
              <SearchArea selectData={searchOptions} onSearch={onSearch} />
            </div>
            <div className={classes.toolArea}>
              <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                <Icon className={`fa fa-search ${classes.icon}`} />
              </IconButton>
              <IconButton className={classes.button} disableRipple color="inherit">
                <Badge badgeContent={17} color="primary" className={classes.badge}>
                  <Icon className={`fa fa-bell ${classes.icon}`} />
                </Badge>
              </IconButton>
              <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                <Badge badgeContent={17} color="primary" className={classes.badge}>
                  <Icon className={`fa fa-inbox ${classes.icon}`} />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
