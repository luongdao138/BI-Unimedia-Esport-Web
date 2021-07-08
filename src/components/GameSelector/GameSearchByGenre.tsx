import { GameGenre } from '@services/game.service'
import { ReactNode, useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Button from '@components/Button'

import useGameByGenreId from './useGameByGenreId'
import { useTranslation } from 'react-i18next'

interface Props {
  genres: GameGenre[]
  children?: ReactNode
  clearGames: () => void
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  listItemSecondary: {
    right: theme.spacing(4.5),
  },
  [theme.breakpoints.down('sm')]: {
    listItem: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
    listItemSecondary: {
      right: theme.spacing(2),
    },
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}))

const GameSearchByGenre: React.FC<Props> = ({ genres, children, clearGames }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [selectedGenre, setSelectedGenre] = useState<GameGenre | undefined>()
  const { getGameByGenreId, meta } = useGameByGenreId()

  useEffect(() => {
    if (selectedGenre) {
      getGameByGenreId(selectedGenre.attributes.id)
    }
  }, [selectedGenre])

  const handleSelect = (genre: GameGenre) => setSelectedGenre(genre)
  const handleUnselect = () => {
    clearGames()
    setSelectedGenre(undefined)
  }

  return (
    <Box pt={4}>
      {selectedGenre ? (
        <Box px={5} className={classes.container}>
          <Button onClick={handleUnselect} startIcon={<ChevronLeft />}>
            {`${t('common:profile.favorite_game.genre')}${selectedGenre.attributes.name}`}
          </Button>
          <Box pt={3}>{meta.loaded && !meta.pending && children}</Box>
        </Box>
      ) : (
        <List>
          {genres.map((genre, idx) => (
            <ListItem key={idx} onClick={() => handleSelect(genre)} button className={classes.listItem}>
              <ListItemText>{genre.attributes.name}</ListItemText>
              <ListItemSecondaryAction className={classes.listItemSecondary}>
                <ChevronRight />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default GameSearchByGenre
