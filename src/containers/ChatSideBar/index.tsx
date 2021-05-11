import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

interface ChatSideBarProps {
  expand: boolean
  toggleChatBar: (state: boolean) => void
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ toggleChatBar, expand }) => {
  const classes = useStyles(expand)
  return (
    <Box className={`${classes.sidebarCont} ${expand ? 'expanded-sidebar' : ''}`}>
      <IconButton onClick={() => toggleChatBar(!expand)} className={classes.arrowBtn} disableRipple>
        <span className={classes.arrow}></span>
      </IconButton>
      <Box className={classes.content}>
        <Box className={classes.header}></Box>
        <Box className={classes.inner}>ChatListHere</Box>
      </Box>
      <div className="back-drop"></div>
    </Box>
  )
}

const useStyles = makeStyles({
  sidebarCont: {
    width: (expand) => (expand ? 260 : 90),
    height: '100%',
    willChange: 'width',
    display: 'block',
    position: 'fixed',
    transform: (expand) => (expand ? 'translateX(calc(-170px))' : 'translateX(calc(0px))'),
    transition: 'all 0.1s ease',
    borderLeft: '1px solid #70707070',
    top: 61,
    bottom: 0,
  },
  arrow: {
    display: 'inline-block',
    position: 'absolute',
    width: 8,
    height: 8,
    background: 'transparent',
    borderTop: '1px solid #bfbfbf',
    borderLeft: '1px solid #bfbfbf',
    transition: 'none',
    color: 'transparent',
    transform: (expand) => (expand ? 'rotate(-45deg)' : 'rotate(135deg)'),
    left: (expand) => (expand ? '7px' : '4px'),
  },
  arrowBtn: {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid #ffffff30',
    borderRight: 'none',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    left: -20,
    zIndex: 100,
    padding: 0,
    top: 40,
    '&:hover': {
      background: 'rgba(0,0,0,0.5)',
    },
  },

  content: {},
  inner: {},
  header: {},
})
export default ChatSideBar
