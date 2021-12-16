import { TwitterIcon, TwitterShareButton } from 'react-share'
import { useRouter } from 'next/router'
import _ from 'lodash'

interface TwitterShareButtonProps {
  title?: string | undefined
  url?: string | undefined
  utm?: string
  games?: any
}

const ESTwitterShareButton: React.FC<TwitterShareButtonProps> = (props) => {
  const { title, url, utm, games } = props
  const router = useRouter()
  const { query } = router
  const shareURL = query?.utm_source === 'twitter' ? url : `${url}/?${utm}`

  const getHashTags = (() => {
    const hashtags = ['eXeLAB', 'エグゼラボ']
    if (_.isArray(games) && games.length) {
      games.forEach((game) => {
        hashtags.push(game?.display_name.replaceAll(/\s/g, ''))
      })
      return hashtags
    }
    if (games.data) return [...hashtags, _.trim(games?.data?.attributes?.display_name.replaceAll(/\s/g, ''))]
    return hashtags
  })()

  return (
    <TwitterShareButton title={_.defaultTo(title, '')} url={_.defaultTo(shareURL, '')} hashtags={getHashTags} windowHeight={600}>
      <TwitterIcon round size={23} style={{ marginLeft: 12 }} />
    </TwitterShareButton>
  )
}

export default ESTwitterShareButton
