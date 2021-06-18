import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import Tabs from '../Tabs'
import Tab from '../Tab'
import TabPanel from '../TabPanel'
import GameSearchByGenre from './GameSearchByGenre'
import GameSearchByTitle from './GameSearchByTitle'
import AddGame from './AddGame'
import GameList from './GameList'
import useGameGenre from './useGameGenre'
import useGameTitles from './useGameTitles'
import { GameTitle } from '@services/game.service'
import _ from 'lodash'
import SelectedGames from './SelectedGames'
import { Box } from '@material-ui/core'

type GameTitleItem = GameTitle['attributes']
export type GameSelectorProps = { values: GameTitleItem[]; onChange: (games: GameTitleItem[]) => void; single?: boolean }

const GameSelector: React.FC<GameSelectorProps> = (props) => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { t } = useTranslation(['common'])
  const { genres } = useGameGenre()
  const { games, clearGames } = useGameTitles()

  const handleChangeTab = (_, v) => {
    setTab(v)
    clearGames()
  }
  const handleAdd = (game: GameTitleItem) => {
    if (props.single) {
      props.onChange([game])
    } else if (!_.some(props.values, game)) {
      props.onChange([game, ...props.values])
    }
  }
  const handleRemove = (game: GameTitleItem) => {
    props.onChange(_.differenceBy(props.values, [game], 'id'))
  }
  return (
    <Box mb={4}>
      <Tabs value={tab} onChange={handleChangeTab} className={classes.tab}>
        <Tab label={t('common:profile.favorite_game.search_title')} value={0} />
        <Tab label={t('common:profile.favorite_game.search_by_genre')} value={1} />
        <Tab label={t('common:profile.favorite_game.create_new')} value={2} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <GameSearchByTitle>
          <GameList games={games} selectedGames={props.values} handleAdd={handleAdd} />
        </GameSearchByTitle>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <GameSearchByGenre genres={genres} clearGames={clearGames}>
          <GameList games={games} selectedGames={props.values} handleAdd={handleAdd} />
        </GameSearchByGenre>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AddGame genres={genres} handleAdd={handleAdd} />
      </TabPanel>
      <SelectedGames games={props.values} handleRemove={handleRemove} />
    </Box>
  )
}

GameSelector.defaultProps = {
  single: false,
}

export default GameSelector

const useStyles = makeStyles(() => ({
  tab: {
    borderBottom: `1px solid ${Colors.white}30`,
  },
}))
