import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Colors } from '@theme/colors'
import SideMenu from '@containers/SideMenu'

interface DrawerProps {
  toggleDrawer: (open: boolean) => void
  open: boolean
}

export const ESDrawer: React.FC<DrawerProps> = ({ toggleDrawer, open }) => {
  const classes = useStyles()

  return (
    <Drawer
      disableScrollLock
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{ className: classes.paper }}
      anchor="left"
      className="ESDrawer"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <Box className={classes.box}>
        <SideMenu />
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
