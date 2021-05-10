import { AppBar, Typography, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'

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
          <ESMenu>
            <ESMenuItem
              onClick={() => {
                return null
              }}
            >
              コミュニティを作る
            </ESMenuItem>
          </ESMenu>
        </Toolbar>
      </AppBar>
    </div>
  )
}
