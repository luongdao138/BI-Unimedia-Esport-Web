import { Box } from '@material-ui/core'
import { MESSAGE_TABS } from '..'

type ChatTabProps = {
  type?: string
  activeTab: MESSAGE_TABS
}

const ChatTab: React.FC<ChatTabProps> = ({ activeTab }) => {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ activeTab', activeTab)
  const isDisplayedAllMess = activeTab === MESSAGE_TABS.ALL

  return <Box>{isDisplayedAllMess ? <Box>all mess</Box> : <Box>tip mess</Box>}</Box>
}

export default ChatTab
