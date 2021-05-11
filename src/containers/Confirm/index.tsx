import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useConfirm from './useConfirm'
import ESPinInput from '@components/PinInput'
import ESLoader from '@components/FullScreenLoader'
import { useRouter } from 'next/router'
import ButtonPrimary from '@components/ButtonPrimary'

const ConfirmContainer: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const { user, registerConfirm, metaConfirm } = useConfirm(confirmationCode)

  const handleSubmit = () => {
    const params = {
      email: user.email,
      confirmation_code: confirmationCode,
    }

    registerConfirm(params)
  }

  const buttonActive = (): boolean => {
    return user.email !== '' && confirmationCode.length === 6 && !metaConfirm.error
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={() => router.back()}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>
            <Typography variant="h2">{t('common:register_by_email.back')}</Typography>
          </Box>
        </Box>

        <Box width="100%" px={5} pt={12} flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
          <Typography variant="h3" className={classes.hint}>
            6桁の認証コードを送信しました
          </Typography>
          <Box py={4} display="flex" alignItems="center" flexDirection="column">
            <ESPinInput error={!!metaConfirm.error} value={confirmationCode} onChange={(value) => setConfirmationCode(value)} />
          </Box>
          <Typography variant="body2" className={classes.hint}>
            認証コードを再送する
          </Typography>
        </Box>

        <Box pt={12}>
          <Typography variant="body2" className={classes.hint}>
            認証コードが届かない場合
          </Typography>
          <Typography variant="body2" className={classes.hintDetail}>
            入力したメールアドレスに誤りがある可能性があります。前の画面に戻り、もう一度送信してください。
          </Typography>
        </Box>

        <Box className={classes.blankSpace}></Box>
      </Box>

      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive()} onClick={handleSubmit}>
              {t('common:register_by_email.button')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
      {metaConfirm.pending && <ESLoader open={metaConfirm.pending} />}
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
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.black,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  hint: {
    color: Colors.grey[300],
  },
  hintDetail: {
    color: Colors.text[300],
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default ConfirmContainer
