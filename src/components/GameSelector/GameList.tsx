import { makeStyles } from '@material-ui/core/styles'
import { GameTitle } from '@services/game.service'
import ESChip from '@components/Chip'
import { Box, Container, List, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listContainer: {
    maxHeight: 330,
    overflowY: 'auto',
  },
}))

type GameListProps = {
  games: GameTitle['attributes'][]
  selectedGames: GameTitle['attributes'][]
  handleAdd: (game: GameTitle['attributes']) => void
}

const GameList: React.FC<GameListProps> = ({ games, selectedGames, handleAdd }) => {
  const classes = useStyles()
  if (games.length === 0) {
    return (
      <Box pt={8} textAlign="center">
        <Typography color="textSecondary">{i18n.t('common:profile.favorite_game.no_result')}</Typography>
      </Box>
    )
  }

  const checkIsSelected = (id: number) => selectedGames.find((g) => g.id === id)

  return (
    <>
      {games.length > 0 && (
        <Container maxWidth="md" className={classes.listContainer}>
          <List>
            {games.map((g, idx) => (
              <ESChip
                key={idx}
                className={classes.chip}
                label={g.display_name}
                onClick={() => handleAdd(g)}
                color={checkIsSelected(g.id) ? 'primary' : 'default'}
              />
            ))}
          </List>
        </Container>
      )}
    </>
  )
}
export default GameList
