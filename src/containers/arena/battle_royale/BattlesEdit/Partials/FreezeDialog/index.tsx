import React from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESPopup from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'

interface FreezeDialogProps {
  onAction: () => void
  onClose: () => void
  open: boolean
}

const FreezeDialog: React.FC<FreezeDialogProps> = ({ onAction, onClose, open }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <ESPopup open={open}>
      <BlankLayout>
        <Box paddingY={2} className={classes.childrenContainer}>
          <Box pb={4} color={Colors.white} alignItems="center">
            <Typography className={classes.title}>{t('common:arena.dialog.freeze_title')}</Typography>
          </Box>
          <Box pb={4}>
            <Typography variant="h2" className={classes.desc}>
              {t('common:arena.dialog.freeze_desc')}
            </Typography>
          </Box>
          <Typography variant="caption" gutterBottom>
            {t('common:arena.dialog.freeze_sub1')}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {t('common:arena.dialog.freeze_sub2')}
          </Typography>

          <Box className={classes.actionButtonContainer}>
            <ESButton variant="outlined" round size="large" onClick={onClose} className={classes.button}>
              {t('common:common.cancel')}
            </ESButton>
            <ButtonPrimary round onClick={onAction} className={classes.button}>
              {t('common:arena.dialog.confirm_button')}
            </ButtonPrimary>
          </Box>

          <Box paddingTop={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center" color={Colors.yellow}>
            <WarningRounded fontSize="small" />
            <Typography variant="body2">{t('common:arena.dialog.freeze_warn')}</Typography>
          </Box>
        </Box>
      </BlankLayout>
    </ESPopup>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  childrenContainer: {
    marginTop: '21vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    color: Colors.white,
  },
  actionButtonContainer: {
    marginTop: '14vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  button: {
    minWidth: 220,
    margin: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    childrenContainer: {
      marginTop: '10vh',
    },
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
      marginTop: '2vh',
      flexDirection: 'column-reverse',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
  },
}))

export default FreezeDialog
