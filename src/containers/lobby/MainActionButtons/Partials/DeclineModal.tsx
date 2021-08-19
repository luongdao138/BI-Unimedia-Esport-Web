import React, { useEffect } from 'react'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import LinkButton from '@components/LinkButton'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESPopup from '@components/Popup'
import BlankLayout from '@layouts/BlankLayout'
import ESLoader from '@components/FullScreenLoader'
import LoginRequired from '@containers/LoginRequired'
import { Meta } from '@store/metadata/actions/types'

interface UnjoinModalProps {
  unjoinMeta: Meta
  onConfirm: () => void
  text: string
}

const UnjoinModal: React.FC<UnjoinModalProps> = ({ unjoinMeta, onConfirm, text }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (unjoinMeta.loaded || unjoinMeta.error) {
      setOpen(false)
    }
  }, [unjoinMeta.loaded, unjoinMeta.error])

  return (
    <Box textAlign="center" mt={2}>
      <LoginRequired>
        <LinkButton onClick={() => setOpen(true)}>{text}</LinkButton>
      </LoginRequired>
      <ESPopup open={open}>
        <BlankLayout>
          <Box paddingBottom={2} paddingTop={2} className={classes.childrenContainer}>
            <Box pb={4} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:tournament.unjoin_dialog.dialog_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2" className={classes.description}>
                {t('common:tournament.unjoin_dialog.dialog_description')}
              </Typography>
            </Box>

            <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={18.5}>
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                    {t('common:common.cancel')}
                  </ESButton>
                </LoginRequired>
              </Box>
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ButtonPrimary round fullWidth onClick={() => onConfirm}>
                    {t('common:tournament.unjoin_dialog.decline')}
                  </ButtonPrimary>
                </LoginRequired>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      </ESPopup>

      {unjoinMeta.pending && <ESLoader open={unjoinMeta.pending} />}
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
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
  },
  button: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  cancelBtn: {
    padding: '12px 22px',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
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

export default UnjoinModal
