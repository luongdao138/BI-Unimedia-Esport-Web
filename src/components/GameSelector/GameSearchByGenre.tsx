import { GameGenre } from '@services/game.service'

interface Props {
  genres: GameGenre[]
}

const GameSearchByGenre: React.FC<Props> = ({ genres }) => {
  genres
  return <div>Game Search By Title</div>
}

export default GameSearchByGenre
