import { Theme, makeStyles, Box } from '@material-ui/core'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'

type BannerItemsProps = {
  image: string
}
const BannerItems: React.FC<BannerItemsProps> = ({ image }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <ESCard className={classes.container}>
        <ESCardMedia className={classes.cardItem} src={image}></ESCardMedia>
      </ESCard>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 1100,
    height: 366,
    marginLeft: 192,
    marginRight: 192,
    marginBottom: theme.spacing(3),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItem: {
    width: 700,
    height: 340,
  },
}))
export default BannerItems
