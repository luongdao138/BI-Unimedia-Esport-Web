import { Box, Typography, makeStyles } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import ButtonPrimary from '@components/ButtonPrimary'

type ChatContainerProps = {
  onPressDonate?: () => void
}
const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate }) => {
  // const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography variant="h3" gutterBottom className={classes.label}>
        {'Chat Container'}
      </Typography>
      <Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer} onClick={onPressDonate}>
        <ButtonPrimary type="submit" round fullWidth>
          {'Donate Points'}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 482,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
  },
  label: {
    textAlign: 'center',
  },
}))
export default ChatContainer
