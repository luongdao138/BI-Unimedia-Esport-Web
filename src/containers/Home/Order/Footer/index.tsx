import { Box, Theme, Grid } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

export interface Props {
  onCancel: () => void
  onDone: () => void
}

export const FooterAction: React.FC<Props> = ({ onCancel, onDone }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <Grid container spacing={1} className={classes.actionWrap}>
      <Grid item sm={12} md={6} lg={6} xl={6}>
        <Box className={classes.actionCancelButton}>
          <ButtonPrimary round gradient={false} onClick={onCancel} fullWidth>
            {t('common:common.cancel')}
          </ButtonPrimary>
        </Box>
      </Grid>
      <Grid item sm={12} md={6} lg={6} xl={6}>
        <Box className={classes.actionDoneButton}>
          <ButtonPrimary round onClick={onDone} fullWidth>
            {t('common:common.done')}
          </ButtonPrimary>
        </Box>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionWrap: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(11),
    display: 'flex',
    justifyContent: 'center',
    background: Colors.black,
    borderTop: '1px solid',
    borderTopColor: Colors.white_opacity[30],
    width: '100%',
    margin: '0 auto',
    position: 'absolute',
    bottom: 0,
  },
  actionCancelButton: {
    maxWidth: '100%',
    width: 220,
    marginRight: theme.spacing(1),
    marginLeft: 'auto',
  },
  actionDoneButton: {
    maxWidth: '100%',
    width: 220,
    marginRight: 'auto',
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    actionWrap: {
      flexDirection: 'column-reverse',
      paddingBottom: theme.spacing(5),
    },
    actionCancelButton: {
      marginRight: 'auto',
    },
    actionDoneButton: {
      marginLeft: 'auto',
    },
  },
}))
