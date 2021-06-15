import React from 'react'
import { makeStyles } from '@material-ui/core'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import i18n from '@locales/i18n'
import { MENU_ACTIONS } from '../constants'

export interface MessageMenuProps {
  onPressMenuItem: (type: MENU_ACTIONS) => void
  isMe?: boolean
}

const MessageMenu: React.FC<MessageMenuProps> = ({ onPressMenuItem, isMe }) => {
  const classes = useStyles()

  const renderOtherPersonMenu = () => {
    if (!isMe) {
      return (
        <ESMenu disableRipple iconClass={classes.menuIcon}>
          <ESMenuItem onClick={() => onPressMenuItem(MENU_ACTIONS.COPY_CONTENT)}>{i18n.t('common:chat.copy_content')}</ESMenuItem>
          <ESMenuItem onClick={() => onPressMenuItem(MENU_ACTIONS.REPLY_MSG)}>{i18n.t('common:chat.reply_msg')}</ESMenuItem>
          <ESMenuItem onClick={() => onPressMenuItem(MENU_ACTIONS.REPORT_CHAT)}>{i18n.t('common:chat.report_chat')}</ESMenuItem>
        </ESMenu>
      )
    }
    return null
  }

  const rendePersonMenu = () => {
    if (isMe) {
      return (
        <ESMenu disableRipple iconClass={classes.menuIcon}>
          <ESMenuItem onClick={() => onPressMenuItem(MENU_ACTIONS.COPY_CONTENT)}>{i18n.t('common:chat.copy_content')}</ESMenuItem>
          <ESMenuItem onClick={() => onPressMenuItem(MENU_ACTIONS.DELETE_MESSAGE)}>{i18n.t('common:chat.delete_chat')}</ESMenuItem>
        </ESMenu>
      )
    }
    return null
  }

  return (
    <>
      {rendePersonMenu()}
      {renderOtherPersonMenu()}
    </>
  )
}

const useStyles = makeStyles(() => ({
  menuIcon: {
    '& .MuiIcon-fontSizeSmall': {
      fontSize: '0.8rem',
    },
    '&:hover': {
      background: 'transparent',
    },
  },
}))

MessageMenu.defaultProps = {
  isMe: false,
}

export default MessageMenu
