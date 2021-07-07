import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, IconButton, Icon } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import LinkButton from '@components/LinkButton'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'

interface UnjoinModalProps {
  tournament: TournamentDetail
}

const UnjoinModal: React.FC<UnjoinModalProps> = ({ tournament }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { leave, leaveMeta } = useEntry()

  useEffect(() => {
    if (leaveMeta.loaded || leaveMeta.error) {
      setOpen(false)
    }
  }, [leaveMeta.loaded, leaveMeta.error])

  return (
    <Box textAlign="center" mt={2}>
      <LinkButton onClick={() => setOpen(true)}>{t('common:tournament.decline_entry')}</LinkButton>
      <ESModal open={open}>
        <BlankLayout>
          <Box paddingBottom={16} paddingTop={8} className={classes.childrenContainer}>
            <Box py={2}>
              <IconButton className={classes.iconButtonBg} onClick={() => setOpen(false)}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
            </Box>
            <Box pb={4} pt={12} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:tournament.unjoin_dialog.dialog_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2" className={classes.description}>
                {t('common:tournament.unjoin_dialog.dialog_description')}
              </Typography>
            </Box>

            <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={18.5}>
              <Box className={classes.actionButton}>
                <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                  {t('common:common.cancel')}
                </ESButton>
              </Box>
              <Box className={classes.actionButton}>
                <ButtonPrimary round fullWidth onClick={() => leave(tournament.attributes.hash_key)}>
                  {t('common:tournament.unjoin_dialog.decline')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>

      {leaveMeta.pending && <ESLoader open={leaveMeta.pending} />}
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
