import { AppBar, Typography, Toolbar, Box, Link, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

export interface Props {
  onCancel: () => void
  onDone: () => void
}

export const Header: React.FC<Props> = ({ onCancel, onDone }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h2">{t('common:home.home')}</Typography>
        <Box display="flex" className={classes.actionWrap}>
          <Link underline={'none'} onClick={onCancel} className={classes.link}>
            <Typography className={classes.cancel}>{t('common:common.cancel')}</Typography>
          </Link>
          <Link underline={'none'} onClick={onDone} className={classes.link}>
            <Typography className={classes.done}>{t('common:common.done')}</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: Colors.black,
  },
  toolbar: {
    minHeight: 58,
    justifyContent: 'space-between',
  },
  cancel: {
    color: Colors.white_opacity[30],
    marginRight: theme.spacing(2),
  },
  done: {
    color: Colors.primary,
  },
  link: {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    actionWrap: {
      display: 'none',
    },
  },
}))
