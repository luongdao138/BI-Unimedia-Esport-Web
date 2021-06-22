import { Colors } from '@theme/colors'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import QRCode from 'qrcode.react'
import { getUserCode } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import { useTranslation } from 'react-i18next'

type Props = {
  handleClose: () => void
}

const QrContainer: React.FC<Props> = ({ handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const userCode = useAppSelector(getUserCode)

  return (
    <Box pt={7.5} pb={9} className={classes.topContainer}>
      <Box py={2}>
        <IconButton className={classes.iconButtonBg} onClick={handleClose}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
      </Box>
      <Box px={5} pt={6.625} display="flex" flexDirection="column" alignItems="center">
        <QRCode value={`${userCode}`} includeMargin size={300} />

        <Box pt={1} pb={6}>
          <Typography className={classes.qr}>{t('common:qr_screen.title')}</Typography>
        </Box>
        <Typography className={classes.qrHint}>@{userCode}</Typography>
      </Box>
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
  qr: {
    fontSize: 10,
    color: Colors.text[200],
  },
  qrHint: {
    fontSize: 18,
    color: Colors.text[200],
    fontWeight: 'bold',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default QrContainer
