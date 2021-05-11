import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

import Tabs from '../Tabs'
import Tab from '../Tab'
import TabPanel from '../TabPanel'

import GameSearchByGenre from './GameSearchByGenre'
import GameSearchByTitle from './GameSearchByTitle'
import AddGame from './AddGame'
import { useAppDispatch } from '@store/hooks'
import { getGameByGenreId, getGameGenres } from '@store/game/actions'

const GameSelector: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { t } = useTranslation(['common'])
  useEffect(() => {
    dispatch(getGameGenres())
    dispatch(getGameByGenreId(1))
  }, [])
  return (
    <>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tab} aria-label="simple tabs example">
        <Tab label={t('common:profile.favorite_game.title')} value={0} />
        <Tab label={t('common:profile.favorite_game.search_by_genre')} value={1} />
        <Tab label={t('common:profile.favorite_game.create_new')} value={2} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <GameSearchByTitle />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <GameSearchByGenre genres={[]} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AddGame genres={[]} />
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
