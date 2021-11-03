import ESLabel from '@components/Label'
import { Box, Theme, makeStyles } from '@material-ui/core'
export type TitleFavoriteProps = {
  iconSource?: string
  titleText: string
}
const TitleFavorite: React.FC<TitleFavoriteProps> = ({ iconSource, titleText }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      {iconSource && (
        <Box className={classes.iconContainer}>
          <img src={iconSource} width={33} height={44} />
        </Box>
      )}
      <ESLabel label={titleText} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconContainer: {
    marginRight: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}))
export default TitleFavorite
