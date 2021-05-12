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

type GameTitleItem = GameTitle['attributes']
export type GameSelectorProps = { values: GameTitleItem[]; onChange: (games: GameTitleItem[]) => void }

const GameSelector: React.FC<GameSelectorProps> = (props) => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { t } = useTranslation(['common'])
  const { genres } = useGameGenre()
  const { games, clearGames } = useGameTitles()
  const filteredGames = _.differenceBy(games, props.values, 'id')
  const handleChangeTab = (_, v) => {
    setTab(v)
    clearGames()
  }
  const handleAdd = (game: GameTitleItem) => {
    if (!_.some(props.values, game)) {
      props.onChange([...props.values, game])
    }
  }
  const handleRemove = (game: GameTitleItem) => {
    props.onChange(_.differenceBy(props.values, [game], 'id'))
  }
  return (
    <>
      <Tabs value={tab} onChange={handleChangeTab} className={classes.tab}>
        <Tab label={t('common:profile.favorite_game.title')} value={0} />
        <Tab label={t('common:profile.favorite_game.search_by_genre')} value={1} />
        <Tab label={t('common:profile.favorite_game.create_new')} value={2} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <GameSearchByTitle>
          <GameList games={filteredGames} handleAdd={handleAdd} />
        </GameSearchByTitle>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <GameSearchByGenre genres={genres} clearGames={clearGames}>
          <GameList games={filteredGames} handleAdd={handleAdd} />
        </GameSearchByGenre>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AddGame genres={genres} />
      </TabPanel>
      <SelectedGames games={props.values} handleRemove={handleRemove} />
    </>
  )
}

export default GameSelector

const useStyles = makeStyles(() => ({
  tab: {
    borderBottom: `1px solid ${Colors.white}30`,
  },
}))
