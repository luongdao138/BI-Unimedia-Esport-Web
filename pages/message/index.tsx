import { useEffect } from 'react'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import Box from '@material-ui/core/Box'
import i18n from '@locales/i18n'
import { socketCreators } from '@store/socket/actions'
import { useAppDispatch } from '@store/hooks'
import { withAuth } from '@utils/withAuth'

const Message: PageWithLayoutType = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(socketCreators.cleanRoom())
  }, [])
  return (
    <MessageLayout>
      <Box display="flex" flex={1} justifyContent="center" alignItems="center" height={'100%'}>
        {i18n.t('common:chat.not_selected_text')}
      </Box>
    </MessageLayout>
  )
}

export default withAuth(Message)
