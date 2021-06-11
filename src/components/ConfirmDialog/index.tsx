import { makeStyles, Theme, Typography, Box, Paper } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'

type Props = {
  open: boolean
  handleClose: (value: boolean) => void
  onSubmit: any
}

const ConfirmDialog: React.FC<Props> = ({ open, handleClose, onSubmit }) => {
  const classes = useStyles()

  return (
    <ESModal open={open} handleClose={() => handleClose(false)}>
      <Box display="flex" alignItems="center" height="100%" maxWidth={754} margin="0 auto" className={classes.dialogContainer}>
        <Paper className={classes.paperBg}>
          <Box textAlign="center" py={5}>
            <Typography className={classes.title}>{i18n.t('common:common.confirm_title')}</Typography>
            <Box pt={5} px={120 / 8} className={classes.detailContainer}>
              <Typography className={classes.detail}>{i18n.t('common:common.info')}</Typography>
            </Box>

            <Box
              pt={148 / 8}
              width="100%"
              justifyContent="center"
              display="flex"
              alignItems="center"
              flexDirection="row"
              className={classes.bottomButton}
            >
              <Box width={220} className={classes.buttonTop} pr={2}>
                <ButtonPrimary fullWidth gradient={false} onClick={() => handleClose(false)}>
                  {i18n.t('common:common.confirm_back')}
                </ButtonPrimary>
              </Box>
              <Box width={220} className={classes.button}>
                <ButtonPrimary fullWidth onClick={onSubmit}>
                  {i18n.t('common:common.confirm_ok')}
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
  [theme.breakpoints.down('sm')]: {
    bottomButton: {
      flexDirection: 'column-reverse',
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
