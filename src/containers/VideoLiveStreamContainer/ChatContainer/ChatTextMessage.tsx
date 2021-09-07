import React, { useState } from 'react'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESMenuItem from '@components/Menu/MenuItem'
import { useTranslation } from 'react-i18next'

type ChatContainerProps = {
  message?: string
  user?: string
}

const ChatTextMessage: React.FC<ChatContainerProps> = ({ message, user }) => {
  const [showMenu, setShowMenu] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <Box className={classes.chatMessageContainer}>
      <Box className={classes.container}>
        <Typography className={classes.chatMessage}>
          <span className={classes.chatMessageUser}>{`${user}: `}</span>
          {message}
        </Typography>
        <Typography
          onClick={() => {
            setShowMenu(!showMenu)
          }}
          className={classes.three_dot}
        >
          <Icon className={`fa fa-ellipsis-v ${classes.icon}`} fontSize="small" />
        </Typography>
      </Box>
      {showMenu && (
        <Box className={`${classes.dropDownContent} MuiPaper-elevation8 MuiPaper-rounded`}>
          <ESMenuItem
            onClick={() => {
              setShowMenu(false)
            }}
          >
            {t('live_stream_screen.delete_message')}
          </ESMenuItem>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  dropDownContent: {
    overflow: 'hidden',
    position: 'absolute',
    background: 'white',
    right: 0,
    top: 25,
    willChange: 'all',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: 'auto',
    visiblity: 'visible',
    opocity: 1,
    transition: 'all 0.5s ease',
    height: 'auto',
    display: 'block',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  chatMessageContainer: {
    flexDirection: 'column',
    display: 'flex',
    '&:hover $three_dot': {
      display: 'flex',
    },
    position: 'relative',
  },
  chatMessage: {
    fontSize: 14,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  chatMessageUser: {
    fontSize: 14,
    color: '#FF4786',
  },
  three_dot: {
    marginTop: '4px',
    cursor: 'pointer',
    display: 'none',
  },
  icon: {},
}))

export default ChatTextMessage
