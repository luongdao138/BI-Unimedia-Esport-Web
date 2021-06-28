import { useState } from 'react'
import { Colors } from '@theme/colors'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import { Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import ESLoader from '@components/FullScreenLoader'
import useCancelDialog from './useCancelDialog'
import LinkButton from '@components/LinkButton'

interface Props {
  hashKey: string
}

const CancelDialog: React.FC<Props> = ({ hashKey }) => {
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { meta, cancelTournament } = useCancelDialog()

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
        <LinkButton onClick={() => setModal(true)}>{t('common:tournament_cancel.confirm_cancel_btn')}</LinkButton>
      </Box>
      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          <Box pt={7.5} pb={9} className={classes.topContainer}>
            <Box py={2}>
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
            </Box>
            <Box px={5} pt={12} display="flex" flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
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
      </ESModal>
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
