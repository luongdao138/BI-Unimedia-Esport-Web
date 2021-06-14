import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'

interface CloseRecruitmentModalProps {
  tournament: TournamentDetail
  handleClose: () => void
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({ tournament }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { close, closeMeta } = useEntry()

  useEffect(() => {
    if (closeMeta.loaded || closeMeta.error) {
      setOpen(false)
    }
  }, [closeMeta.loaded, closeMeta.error])

  return (
    <Box>
      <Box className={classes.actionButton}>
        <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
          {t('common:tournament.close_recruitment.button_text')}
        </ButtonPrimary>
      </Box>
      <Box className={classes.description}>
        <Typography variant="body2">{t('common:tournament.close_recruitment.description')}</Typography>
      </Box>

      <ESModal open={open}>
        <BlankLayout>
          <Box paddingY={16} className={classes.childrenContainer}>
            <Box pb={4} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:tournament.close_recruitment.dialog_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2">{t('common:tournament.close_recruitment.dialog_description')}</Typography>
            </Box>

            <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" paddingTop={18.5}>
              <Box marginX={1} width="100%">
                <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                  {t('common:common.cancel')}
                </ESButton>
              </Box>
              <Box marginX={2} width="100%">
                <ButtonPrimary round fullWidth onClick={() => close(tournament.attributes.hash_key)}>
                  {t('common:tournament.close_recruitment.confirm')}
                </ButtonPrimary>
              </Box>
            </Box>

            <Box paddingTop={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center" color={Colors.yellow}>
              <WarningRounded fontSize="small" />
              <Typography variant="body2">{t('common:tournament.close_recruitment.warning')}</Typography>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>

      {closeMeta.pending && <ESLoader open={closeMeta.pending} />}
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
  description: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
}))

export default CloseRecruitmentModal
