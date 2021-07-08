import { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Icon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ChatRoomList from '@containers/ChatRoomList'
import { useRouter } from 'next/router'
import i18n from '@locales/i18n'
import { ESRoutes } from '@constants/route.constants'
import Button from '@components/Button'
import { socketCreators } from '@store/socket/actions'
import { useAppDispatch } from '@store/hooks'

interface ChatSideBarProps {
  expand: boolean
  toggleChatBar: (state: boolean) => void
  arrow?: boolean
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ toggleChatBar, expand }) => {
  const classes = useStyles(expand)
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(socketCreators.cleanRoom())
  }, [])

  return (
    <Box
      className={`${classes.sidebarCont} ${expand ? 'expanded-sidebar' : ''}`}
      onMouseOver={() => toggleChatBar(true)}
      onMouseLeave={() => toggleChatBar(false)}
    >
      <Box className={classes.contentInner}>
        <Box className={classes.header} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography className={classes.headerTitle} variant={'body1'}>
            {t('common:chat.title')}
          </Typography>
          <>
            {expand ? (
              <Button
                size="small"
                variant="outlined"
                className={`room-create-button ${classes.create}`}
                round
                onClick={() => {
                  router.push(ESRoutes.MESSAGE_ROOM_CREATE)
                }}
                startIcon={<Icon style={{ fontSize: 10, color: Colors.white }} className={`fa fa-plus`} />}
              >
                {i18n.t('common:chat.create_new')}
              </Button>
            ) : (
              <Icon
                onClick={() => {
                  router.push('/message')
                }}
                className={`fas fa-inbox ${classes.headerIcon}`}
              />
            )}
          </>
        </Box>
        <Box className={classes.inner}>
          <ChatRoomList expand={expand} />
        </Box>
      </Box>
      <div className="back-drop"></div>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  sidebarCont: {
    width: '100%', //
    height: 'calc(100vh - 61px)',
    display: 'block',
    paddingBottom: 50,
    position: 'fixed',
    transform: 'translateX(calc(0px))',
    transition: 'all 0.1s ease',
    borderLeft: '1px solid #70707070',
    top: 61,
    bottom: 0,
    '&.expanded-sidebar': {
      transform: 'translateX(calc(-170px))',
    },
    '&.expanded-sidebar $headerTitle': {
      display: 'flex',
    },
    '&.expanded-sidebar $headerIcon': {
      fontSize: '14px',
      paddingLeft: 0,
    },
  },
  contentInner: {
    height: '100%',
    width: 290,
  },
  inner: {
    height: '100%',
    position: 'relative',
  },
  create: {},
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 6,
    height: 44,
  },
  headerTitle: {
    color: Colors.white,
    display: 'none',
  },
  headerIcon: {
    color: Colors.white,
    fontSize: '18px',
    cursor: 'pointer',
    paddingLeft: '14px',
  },
  [theme.breakpoints.down('lg')]: {
    sidebarCont: {
      width: '100%',
    },
    contentInner: {
      width: 260,
    },
  },
}))

ChatSideBar.defaultProps = {}

export default ChatSideBar
