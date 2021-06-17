import { makeStyles } from '@material-ui/core/styles'
import { GameTitle } from '@services/game.service'
import Chip from '@components/Chip'
import { Box, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

type GameListProps = { games: GameTitle['attributes'][]; handleAdd: (game: GameTitle['attributes']) => void }

const GameList: React.FC<GameListProps> = ({ games, handleAdd }) => {
  const classes = useStyles()
  if (games.length === 0) {
    return (
      <Box pt={8} textAlign="center">
        <Typography color="textSecondary">{i18n.t('common:profile.favorite_game.no_result')}</Typography>
      </Box>
    )
  }
  return (
    <>
      {games.map((g, idx) => (
        <Chip key={idx} label={g.display_name} className={classes.chip} onClick={() => handleAdd(g)} />
      ))}
    </>
  )
}
export default GameList
