import { Container, List } from '@material-ui/core'
import Chip from '@components/Chip'
import { makeStyles } from '@material-ui/core/styles'
import { GameTitle } from '@services/game.service'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    paddingBottom: theme.spacing(20),
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14),
    },
  },
  listContainer: {
    maxWidth: 600,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    maxHeight: 190,
    overflowY: 'auto',
  },
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

type SelectedGamesProps = { games: GameTitle['attributes'][]; handleRemove: (game: GameTitle['attributes']) => void }
const SelectedGames: React.FC<SelectedGamesProps> = ({ games, handleRemove }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {games.length > 0 && (
        <Container maxWidth="md" className={classes.listContainer}>
          <List>
            {games.map((g, idx) => (
              <Chip key={idx} label={g.display_name} className={classes.chip} onDelete={() => handleRemove(g)} />
            ))}
          </List>
        </Container>
      )}
    </div>
  )
}

SelectedGames.propTypes = {}

export default SelectedGames
