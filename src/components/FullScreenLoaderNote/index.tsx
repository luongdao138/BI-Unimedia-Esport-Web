import Backdrop from '@material-ui/core/Backdrop'
import ESLoader from '@components/Loader'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

interface Props {
  open: boolean
  showNote?: boolean
  contentLoader?: string
}

const FullScreenLoaderNote: React.FC<Props> = ({ open, showNote = true, contentLoader }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <div className={classes.overView}>
        <ESLoader />
        {showNote && <Typography className={classes.textLoading}>{contentLoader}</Typography>}
        {/* {showNote && <Typography className={classes.textLoading}>{t('streaming_setting_screen.note_loading')}</Typography>} */}
      </div>
    </Backdrop>
  )
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff',
  },
  textLoading: {
    fontSize: 13,
    color: '#fff',
    marginTop: 7,
    textAlign: 'center',
    // fontWeight:'bold'
  },
  overView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default FullScreenLoaderNote
