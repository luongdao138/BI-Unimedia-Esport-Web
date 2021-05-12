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

const GameSelector: React.FC = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { t } = useTranslation(['common'])
  const { genres } = useGameGenre()
  const { games, clearGames } = useGameTitles()
  const handleChangeTab = (_, v) => {
    setTab(v)
    clearGames()
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
          <GameList games={games} />
        </GameSearchByTitle>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <GameSearchByGenre genres={genres} clearGames={clearGames}>
          <GameList games={games} />
        </GameSearchByGenre>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AddGame genres={genres} />
      </TabPanel>
    </>
  )
}

export default GameSelector

const useStyles = makeStyles(() => ({
  tab: {
    borderBottom: `1px solid ${Colors.white}30`,
  },
}))
