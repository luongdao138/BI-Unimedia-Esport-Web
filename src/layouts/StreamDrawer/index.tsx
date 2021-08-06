import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Colors } from '@theme/colors'
import StreamSideMenu from '@containers/StreamSideMenu'

interface StreamDrawerProps {
  toggleDrawer: (open: boolean) => void
  isStreamer: boolean
  downMd?: boolean
  open: boolean
}

export const StreamDrawer: React.FC<StreamDrawerProps> = ({ toggleDrawer, open, isStreamer, downMd }) => {
  const classes = useStyles()

  return (
    <Drawer
      disableScrollLock
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{ className: classes.paper }}
      anchor="left"
      className="StreamDrawer"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <Box
        className={classes.box}
        onMouseLeave={() => {
          !downMd ? toggleDrawer(false) : ''
        }}
      >
        <StreamSideMenu isStreamer={isStreamer} />
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles(() => ({
  paper: {
    top: 61,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    borderRight: `1px solid ${Colors.text[300]}`,
    overflow: 'hidden',
  },
  box: {
    width: 184,
    height: '100%',
    paddingLeft: 24,
    paddingRight: 0,
  },
}))
