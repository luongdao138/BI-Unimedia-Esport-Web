import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

interface Props {
  openBottomPanel: boolean
  setOpenBottomPanel: (v: boolean) => void
}

const ChatWarningModal: React.FC<Props> = ({ openBottomPanel, setOpenBottomPanel }) => {
  const classes = useStyles()

  return (
    <Drawer
      anchor="bottom"
      open={openBottomPanel}
      onClose={() => setOpenBottomPanel(false)}
      classes={{ paper: classes.paper }}
      variant="persistent"
      ModalProps={{
        hideBackdrop: true,
      }}
    >
      <Box py={2} px={2}>
        <Box display="flex" justifyContent="space-between">
          <Box className={classes.warningContainer}>
            <ErrorIcon color="primary" />
          </Box>
          <Box>
            <IconButton aria-label="close" onClick={() => setOpenBottomPanel(false)} classes={{ root: classes.closeIcon }}>
              <CloseIcon color="secondary" />
            </IconButton>
          </Box>
        </Box>
        <Typography align="center" color="primary">
          アーカイブ配信ではコメントができません
        </Typography>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: Colors.grey[950],
    width: '100%',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderTop: '1px solid #EFEFF4',
    borderLeft: '1px solid #EFEFF4',
    borderRight: '1px solid #EFEFF4',
  },
  closeIcon: {
    padding: 0,
  },
  warningContainer: {
    margin: 'auto',
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
}))

export default ChatWarningModal
