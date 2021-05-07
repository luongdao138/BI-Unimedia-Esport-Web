import { AppBar, Typography, Toolbar, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  grow: { flexGrow: 1 },
  appBar: {
    background: '#000',
  },
  toolbar: {
    minHeight: 58,
    justifyContent: 'space-between',
  },
  badge: {
    fontSize: 4,
  },
  icon: {
    fontSize: 30,
  },
}))

export const Header: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h2">{t('common:home.home')}</Typography>
          <IconButton>
            <Icon className="fas fa-ellipsis-v" fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
