import { TwitterIcon, TwitterShareButton } from 'react-share'
import { useRouter } from 'next/router'
import _ from 'lodash'

interface TwitterShareButtonProps {
  title?: string | undefined
  url?: string | undefined
  utm?: string
  hashtags?: string[] | undefined
}

const ESTwitterShareButton: React.FC<TwitterShareButtonProps> = (props) => {
  const { title, url, utm, hashtags } = props
  const router = useRouter()
  const { query } = router
  const shareURL = query?.utm_source === 'twitter' ? url : `${url}/?${utm}`

  return (
    <TwitterShareButton title={_.defaultTo(title, '')} url={_.defaultTo(shareURL, '')} hashtags={hashtags} windowHeight={600}>
      <TwitterIcon round size={23} style={{ marginLeft: 12 }} />
    </TwitterShareButton>
  )
}

ESTwitterShareButton.defaultProps = {
  hashtags: ['eXeLAB', 'エグゼラボ'],
}
export default ESTwitterShareButton
