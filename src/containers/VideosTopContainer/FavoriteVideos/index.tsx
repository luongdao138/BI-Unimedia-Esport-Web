import { Box, Typography, Theme, makeStyles } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'

const FavoriteVideos: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <Box>
      <Typography variant="h3" gutterBottom className={classes.label}>
        {'Favorite Videos'}
      </Typography>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  label: {},
}))
export default FavoriteVideos
