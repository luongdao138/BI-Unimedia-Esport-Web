import { TwitterIcon, TwitterShareButton } from 'react-share'
import _ from 'lodash'

interface TwitterShareButtonProps {
  title?: string | undefined
  url?: string | undefined
  hashtags?: string[] | undefined
}

const ESTwitterShareButton: React.FC<TwitterShareButtonProps> = (props) => {
  const { title, url, hashtags } = props
  return (
    <TwitterShareButton title={_.defaultTo(title, '')} url={_.defaultTo(url, '')} hashtags={hashtags} windowHeight={600}>
      <TwitterIcon round size={23} style={{ marginLeft: 12 }} />
    </TwitterShareButton>
  )
}

ESTwitterShareButton.defaultProps = {
  hashtags: ['eXeLAB', 'エグゼラボ'],
}
export default ESTwitterShareButton
