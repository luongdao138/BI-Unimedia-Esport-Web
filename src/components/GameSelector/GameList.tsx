import { makeStyles } from '@material-ui/core/styles'
import { GameTitle } from '@services/game.service'
import Chip from '@components/Chip'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const GameList: React.FC<{ games: GameTitle[] }> = ({ games }) => {
  const classes = useStyles()
  if (games.length === 0) {
    return (
      <Box pt={8} textAlign="center">
        <Typography color="textSecondary">一致するゲームは見つかりませんでした</Typography>
      </Box>
    )
  }
  return (
    <>
      {games.map((g, idx) => (
        <Chip key={idx} label={g.attributes.display_name} className={classes.chip} />
      ))}
    </>
  )
}
export default GameList
