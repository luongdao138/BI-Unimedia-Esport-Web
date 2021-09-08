import GameEditContainer from '@containers/Profile/GameEdit'
import BlankLayout from '@layouts/BlankLayout'
import { withAuth } from '@utils/withAuth'

const GameEditPage: React.FC = () => {
  return (
    <BlankLayout>
      <GameEditContainer />
    </BlankLayout>
  )
}

export default withAuth(GameEditPage)
