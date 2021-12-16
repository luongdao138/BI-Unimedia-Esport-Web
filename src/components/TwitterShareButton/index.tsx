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

  const trimAllSpace = (str) => str.replaceAll(/\s/g, '')

  const getHashTags = (() => {
    let hashtags = '#eXeLAB #エグゼラボ'
    if (_.isArray(games) && games.length) {
      games.forEach((game) => {
        hashtags += ` #${trimAllSpace(game?.display_name)}`
      })
    } else if (games.data) {
      hashtags += ` #${trimAllSpace(games?.data?.attributes?.display_name)}`
    }
    return hashtags
  })()

  return (
    <TwitterShareButton title={_.defaultTo(`${title} ${getHashTags}`, '')} url={_.defaultTo(shareURL, '')} windowHeight={600}>
      <TwitterIcon round size={23} style={{ marginLeft: 12 }} />
    </TwitterShareButton>
  )
}

export default ESTwitterShareButton
