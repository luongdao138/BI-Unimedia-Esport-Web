import { Theme, makeStyles, Box } from '@material-ui/core'
import ESCard from '@components/Card'

type BannerItemsProps = {
  image: string
}
const BannerItems: React.FC<BannerItemsProps> = ({ image }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <ESCard className={classes.container}>
        <img className={classes.cardItem} src={image} />
      </ESCard>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
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
