import GameEditContainer from '@containers/Profile/GameEdit'
import BlankLayout from '@layouts/BlankLayout'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const GameEditPage: React.FC = () => {
  useAuthenticated()
  return (
    <BlankLayout>
      <GameEditContainer />
    </BlankLayout>
  )
}

export default GameEditPage
