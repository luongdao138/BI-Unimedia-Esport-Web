import Backdrop from '@material-ui/core/Backdrop'
import ESLoader from '@components/Loader'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  open: boolean
}

const FullScreenLoader: React.FC<Props> = ({ open }) => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <ESLoader />
    </Backdrop>
  )
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default FullScreenLoader
