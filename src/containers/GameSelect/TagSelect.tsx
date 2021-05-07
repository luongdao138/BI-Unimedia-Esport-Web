import { useState } from 'react'
import { Box, Theme, makeStyles } from '@material-ui/core'
import ESChip from '@components/Chip'
import _ from 'lodash'

const TagSelect: React.FC = () => {
  const classes = useStyles()
  const [activeChips, setActiveChips] = useState([] as number[])
  const checkIsActive = (id: number) => !!activeChips.find((activeId) => activeId === id)

  const onChipClick = (id: number) => {
    const newChips = [...activeChips]
    if (checkIsActive(id)) {
      _.remove(newChips, (activeId) => activeId === id)
    } else {
      newChips.push(id)
    }
    setActiveChips(newChips)
  }

  const chips = [
    {
      id: 1,
      name: '学生',
    },
    {
      id: 2,
      name: '会社員',
    },
    {
      id: 3,
      name: 'パート・アルバイト',
    },
    {
      id: 4,
      name: 'プロゲーマー',
    },
    {
      id: 5,
      name: 'ストリーマー',
    },
    {
      id: 6,
      name: 'シニア',
    },
    {
      id: 7,
      name: 'ゲーム初心者',
    },
    {
      id: 8,
      name: 'エンジョイ勢',
    },
    {
      id: 9,
      name: 'ガチ勢',
    },
    {
      id: 10,
      name: '大会参加したい',
    },
    {
      id: 11,
      name: '大会参加したい',
    },
    {
      id: 12,
      name: '大会参加したい',
    },
    {
      id: 13,
      name: '大会参加したい',
    },
    {
      id: 14,
      name: '大会参加したい',
    },
  ]
  return (
    <Box marginTop={5}>
      {chips.map((chip) => (
        <ESChip
          key={chip.id}
          className={classes.chipSpacing}
          label={chip.name}
          onClick={() => onChipClick(chip.id)}
          color={checkIsActive(chip.id) ? 'primary' : undefined}
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))
export default TagSelect
