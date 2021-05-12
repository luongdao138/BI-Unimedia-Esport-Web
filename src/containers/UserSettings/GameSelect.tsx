import { useState } from 'react'
import { Box, Theme, makeStyles } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ESInput from '@components/Input'
import { GameTitlesResponse } from '@services/settings.service'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

interface Props {
  gameTitles: GameTitlesResponse
  onGameSelect: (gameTitle: GameTitlesResponse[0]) => void
  onSearch: (searchText: string) => void
}

const GameSelect: React.FC<Props> = (props) => {
  const { gameTitles } = props
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { t } = useTranslation(['common'])

  const onSearchInputChange = _.debounce((e) => {
    props.onSearch(e.target.value)
  }, 1000)

  return (
    <Box marginTop={2} width={1}>
      <ESTabs value={tab} onChange={(_, v) => setTab(v)} classes={{ flexContainer: classes.tabContainer }}>
        <ESTab label={t('common:profile.favorite_game.title')} value={0} />
        <ESTab label={t('common:profile.favorite_game.search_by_genre')} value={1} />
        <ESTab label={t('common:profile.favorite_game.create_new')} value={2} />
      </ESTabs>
      <Box pt={4} pl={2.5}>
        <ESInput placeholder={t('common:search_by_keyword')} fullWidth onChange={onSearchInputChange} />
        <Box pt={4}>
          {gameTitles.map((title) => (
            <ESChip
              key={title.id}
              className={classes.chipSpacing}
              label={title.attributes.display_name}
              onClick={() => props.onGameSelect(title)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
//
const useStyles = makeStyles((theme: Theme) => ({
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tabContainer: {
    borderBottom: '2px solid #6c6c6c',
  },
}))
export default GameSelect
