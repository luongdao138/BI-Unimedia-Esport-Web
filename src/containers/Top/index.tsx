import { ParallaxContent } from './elements/ParallaxContent'
import { TopContent } from './elements/TopContent'
import { BottomContent } from './elements/BottomContent'

const TopContainer: React.FC = () => {
  return (
    <>
      <ParallaxContent />
      <TopContent />
      <BottomContent />
    </>
  )
}

export default TopContainer
