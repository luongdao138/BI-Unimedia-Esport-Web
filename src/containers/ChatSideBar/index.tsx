import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Icon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ChatRoomList from '@containers/ChatRoomList'

interface ChatSideBarProps {
  expand: boolean
  toggleChatBar: (state: boolean) => void
  arrow?: boolean
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ toggleChatBar, expand }) => {
  const classes = useStyles(expand)
  const { t } = useTranslation(['common'])
  return (
    <Box
      className={`${classes.sidebarCont} ${expand ? 'expanded-sidebar' : ''}`}
      onMouseEnter={() => toggleChatBar(true)}
      onMouseLeave={() => toggleChatBar(false)}
    >
      <Box className={classes.content}>
        <Box className={classes.header} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography className={classes.headerTitle} variant={'body1'}>
            {t('common:chat.title')}
          </Typography>
          <Icon className={`fas fa-inbox ${classes.headerIcon}`} />
        </Box>
        <Box className={classes.inner}>
          <ChatRoomList expand={expand} />
        </Box>
      </Box>
      <div className="back-drop"></div>
    </Box>
  )
}

const useStyles = makeStyles({
  sidebarCont: {
    width: 290, //
    height: '100%',
    display: 'block',
    position: 'fixed',
    transform: (expand) => (expand ? 'translateX(calc(-170px))' : 'translateX(calc(0px))'),
    transition: 'all 0.1s ease',
    borderLeft: '1px solid #70707070',
    top: 61,
    bottom: 0,
  },
  content: {
    height: '100%',
  },
  inner: {
    height: '100%',
    position: 'relative',
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerTitle: {
    color: Colors.white,
    display: (expand) => (expand ? 'flex' : 'none'),
  },
  headerIcon: {
    color: Colors.white,
    fontSize: (expand) => (expand ? '14px' : '18px'),
    paddingLeft: (expand) => (expand ? '0' : '14px'),
  },
})

ChatSideBar.defaultProps = {}

export default ChatSideBar
