import React from 'react'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'

interface RandomizeDialogProps {
  onAction: () => void
}

const RandomizeDialog: React.FC<RandomizeDialogProps> = ({ onAction }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Box className={classes.actionButton}>
        <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
          {t('common:arena.randomize_button')}
        </ButtonPrimary>
      </Box>

      <ESModal open={open}>
        <BlankLayout>
          <Box paddingY={16} className={classes.childrenContainer}>
            <Box pb={4} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:arena.dialog.randomize_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2">{t('common:arena.dialog.randomize_desc')}</Typography>
            </Box>
            <Typography variant="caption" gutterBottom>
              {t('common:arena.dialog.randomize_sub1')}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {t('common:arena.dialog.randomize_sub2')}
            </Typography>

            <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" paddingTop={18.5}>
              <Box marginX={1} width="100%">
                <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                  {t('common:common.cancel')}
                </ESButton>
              </Box>
              <Box marginX={2} width="100%">
                <ButtonPrimary
                  round
                  fullWidth
                  onClick={() => {
                    setOpen(false)
                    onAction()
                  }}
                >
                  {t('common:arena.dialog.deploy_button')}
                </ButtonPrimary>
              </Box>
            </Box>

            <Box paddingTop={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center" color={Colors.yellow}>
              <WarningRounded fontSize="small" />
              <Typography variant="body2">{t('common:arena.dialog.randomize_warn')}</Typography>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))

export default RandomizeDialog
