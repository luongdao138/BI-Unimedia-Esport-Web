import { SUB_TABS } from '@constants/common.constants'
import { Box } from '@material-ui/core'

type ChatTabProps = {
  type?: string
  activeTab: number
}

const ChatTab: React.FC<ChatTabProps> = ({ activeTab }) => {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ activeTab', activeTab)
  const isDisplayedAllMess = activeTab === SUB_TABS.MESS.ALL

  return <Box>{isDisplayedAllMess ? <Box>all mess</Box> : <Box>tip mess</Box>}</Box>
}

export default ChatTab
