import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
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
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const { leave, leaveMeta } = useEntry()

  useEffect(() => {
    if (leaveMeta.loaded || leaveMeta.error) {
      setOpen(false)
    }
  }, [leaveMeta.loaded, leaveMeta.error])

  return (
    <Box>
      <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(true)}>
        {t('common:tournament.unjoin')}
      </ESButton>

      <ESModal open={open}>
        <BlankLayout>
          <Box paddingY={16} className={classes.childrenContainer}>
            <Box pb={4} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:tournament.unjoin_dialog.dialog_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2">{t('common:tournament.unjoin_dialog.dialog_description')}</Typography>
            </Box>

            <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={18.5}>
              <Box className={classes.actionButton}>
                <ESButton variant={!isMobile ? 'outlined' : 'text'} round fullWidth size="large" onClick={() => setOpen(false)}>
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
    marginTop: theme.spacing(3),
    textAlign: 'center',
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
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
      flexDirection: 'column-reverse',
    },
  },
}))

export default UnjoinModal
