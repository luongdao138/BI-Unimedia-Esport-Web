import { Box, Typography, makeStyles } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'

const ChatContainer: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography variant="h3" gutterBottom className={classes.label}>
        {'Chat Container'}
      </Typography>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 482,
    width: '100%',
  },
  label: {},
}))
export default ChatContainer
