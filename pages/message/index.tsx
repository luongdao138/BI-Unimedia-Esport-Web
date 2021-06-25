import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import Box from '@material-ui/core/Box'
import i18n from '@locales/i18n'

const Message: PageWithLayoutType = () => {
  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center" height={'100%'}>
      {i18n.t('common:chat.not_selected_text')}
    </Box>
  )
}

Message.Layout = MessageLayout

export default Message
