import ESLabel from '@components/Label'
import { Box, Theme, makeStyles, Typography } from '@material-ui/core'
export type TitleSeeMoreProps = {
  iconSource?: string
  titleText: string
  rightText?: string
  onPress?: () => void
}
const TitleSeeMore: React.FC<TitleSeeMoreProps> = ({ iconSource, titleText, rightText, onPress }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      {iconSource && (
        <Box className={classes.iconContainer}>
          <img src={iconSource} width={33} height={44} />
        </Box>
      )}
      <ESLabel label={titleText} />
      <Box className={classes.viewMoreContainer} onClick={onPress}>
        {rightText && <Typography className={classes.viewMoreStyle}>{rightText}</Typography>}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconContainer: {},
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  viewMoreContainer: {
    display: 'flex',
    paddingLeft: theme.spacing(4),
    height: '100%',
  },
  viewMoreStyle: {
    color: '#707070',
  },
  [theme.breakpoints.down(769)]: {
    viewMoreStyle: {
      display: 'none',
    },
  },
}))
export default TitleSeeMore
