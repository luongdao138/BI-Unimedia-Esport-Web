import { useEffect, useState } from 'react'
import { Colors } from '@theme/colors'
import ESPopup from '@components/Popup'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import { Box, makeStyles, Typography, Theme } from '@material-ui/core'
import ESLoader from '@components/FullScreenLoader'
import useCancelDialog from './useCancelDialog'
import LinkButton from '@components/LinkButton'
import { LobbyDetail } from '@services/lobbydump.service'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'

interface Props {
  hashKey: string
  arena: LobbyDetail
}

const CancelDialog: React.FC<Props> = ({ arena, hashKey }) => {
  const [modal, setModal] = useState(false)
  const [isCanceled, setCanceled] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { meta, cancelTournament } = useCancelDialog()

  useEffect(() => {
    if (arena && arena.attributes) {
      const _status = arena.attributes.status === TOURNAMENT_STATUS.CANCELLED || arena.attributes.status === TOURNAMENT_STATUS.COMPLETED
      setCanceled(_status)
    }
  }, [arena])

  const handleClose = () => {
    setModal(false)
  }

  const handleSubmit = () => {
    cancelTournament(hashKey)
    setModal(false)
  }

  return (
    <>
      <Box mt={3}>
        {!isCanceled && <LinkButton onClick={() => setModal(true)}>{t('common:tournament_cancel.confirm_cancel_btn')}</LinkButton>}
      </Box>
      <ESPopup open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          <Box pt={2} pb={2} className={classes.topContainer}>
            <Box px={5} display="flex" flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
              <Typography className={classes.title}>{t('common:tournament_cancel.cancel_title')}</Typography>
              <Box pt={4}>
                <Typography className={classes.desc}>
                  {t('common:tournament_cancel.cancel_detail1')}
                  <br />
                  {t('common:tournament_cancel.cancel_detail2')}
                </Typography>
              </Box>

              <Box
                pt={148 / 8}
                width="100%"
                justifyContent="space-evenly"
                display="flex"
                alignItems="center"
                flexDirection="row"
                className={classes.buttonContainer}
              >
                <Box width={220} pb={2} className={classes.button}>
                  <ButtonPrimary fullWidth gradient={false} onClick={handleClose}>
                    {t('common:tournament_cancel.cancel_t')}
                  </ButtonPrimary>
                </Box>
                <Box width={220} pb={2} className={classes.button}>
                  <ButtonPrimary fullWidth onClick={handleSubmit}>
                    {t('common:tournament_cancel.cancel_button')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Box>
            {meta.pending && <ESLoader open={meta.pending} />}
          </Box>
        </BlankLayout>
      </ESPopup>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  title: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
    color: Colors.white,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    buttonContainer: {
      flexDirection: 'column-reverse',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
    button: {
      width: 280,
    },
  },
}))

export default CancelDialog
