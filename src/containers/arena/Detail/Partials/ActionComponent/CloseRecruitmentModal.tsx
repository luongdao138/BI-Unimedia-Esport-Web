import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, Icon } from '@material-ui/core'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESPopup from '@components/Popup'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'
import LoginRequired from '@containers/LoginRequired'
interface CloseRecruitmentModalProps {
  tournament: TournamentDetail
  isRecruiting: boolean
  handleClose: () => void
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({ tournament, isRecruiting }) => {
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
      <Box className={classes.button}>
        <LoginRequired>
          <ButtonPrimaryOutlined
            disabled={!isRecruiting}
            onClick={() => setOpen(true)}
            leadingIcon={<Icon className="fas fa-user-slash" fontSize="small" />}
          >
            {t('common:tournament.close_recruitment.button_text')}
          </ButtonPrimaryOutlined>
        </LoginRequired>
      </Box>

      <ESPopup open={open}>
        <BlankLayout>
          <Box paddingY={2} className={classes.childrenContainer}>
            <Box pb={4} color={Colors.white} alignItems="center">
              <Typography className={classes.title}>{t('common:tournament.close_recruitment.dialog_title')}</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant="h2" className={classes.desc}>
                {t('common:tournament.close_recruitment.dialog_description')}
              </Typography>
            </Box>

            <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={18.5}>
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                    {t('common:common.cancel')}
                  </ESButton>
                </LoginRequired>
              </Box>
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ButtonPrimary round fullWidth onClick={() => close(tournament.attributes.hash_key)}>
                    {t('common:tournament.close_recruitment.confirm')}
                  </ButtonPrimary>
                </LoginRequired>
              </Box>
            </Box>

            <Box paddingTop={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center" color={Colors.yellow}>
              <WarningRounded fontSize="small" />
              <Typography variant="body2">{t('common:tournament.close_recruitment.warning')}</Typography>
            </Box>
          </Box>
        </BlankLayout>
      </ESPopup>

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
  desc: {
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

export default CloseRecruitmentModal
