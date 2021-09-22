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
        <Box className={classes.boxOut}>
          <img src={iconSource} width={33} height={44} />
          <ESLabel label={titleText} />
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
    alignItems: 'center',
    alignContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  viewMoreStyle: {
    color: '#707070',
    textAlign: 'center',
  },
  [theme.breakpoints.down(769)]: {
    viewMoreStyle: {
      display: 'none',
    },
  },
  boxOut: {
    display: 'flex',
    flexDirection: 'row',
  },
}))
export default TitleSeeMore
