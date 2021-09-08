import { makeStyles, Theme, Typography, Box, Paper, ButtonBase } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'

type Props = {
  open: boolean
  handleClose: (value: boolean) => void
}

const ConfirmDialog: React.FC<Props> = ({ open, handleClose }) => {
  const classes = useStyles()

  return (
    <ESModal open={open} handleClose={() => handleClose(false)}>
      <Box display="flex" alignItems="center" height="100%" maxWidth={754} margin="0 auto" className={classes.dialogContainer}>
        <Paper className={classes.paperBg}>
          <Box textAlign="center" py={5}>
            <Typography className={classes.title}>{i18n.t('common:home.app_version')}</Typography>
            <Box pt={5} px={120 / 8} className={classes.detailContainer}>
              <Typography className={classes.detail}>{i18n.t('common:home.app_desc')}</Typography>
            </Box>
            <Box className={classes.buttonWrap}>
              <ButtonBase href="https://apps.apple.com/jp/app/exelab/id1525346211" target="_blank">
                <img className={classes.app_store} src="/images/appstore.png" />
              </ButtonBase>
              <ButtonBase href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab" target="_blank">
                <img className={classes.google_play} src="/images/googleplay.png" />
              </ButtonBase>
            </Box>
            <Box className={classes.bottomButton}>
              <Box width={220} className={classes.button}>
                <ButtonPrimary fullWidth onClick={() => handleClose(false)}>
                  {i18n.t('common:common.confirm_back')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ESModal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paperBg: {
    background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(54,54,54,1) 100%)',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  description: {
    fontSize: 14,
    color: Colors.white_opacity[70],
    whiteSpace: 'pre-line',
  },
  buttonWrap: {
    paddingTop: theme.spacing(4),
  },
  app_store: {
    height: 50,
    maxWidth: '100%',
    paddingBottom: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  google_play: {
    height: 50,
    maxWidth: '100%',
    paddingBottom: theme.spacing(1),
  },
  bottomButton: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    app_store: {
      marginRight: theme.spacing(2),
    },
    button: {
      width: 280,
      paddingBottom: theme.spacing(2),
    },
    buttonTop: {
      width: 280,
      paddingRight: 0,
    },
    detailContainer: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    dialogContainer: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}))

export default ConfirmDialog
