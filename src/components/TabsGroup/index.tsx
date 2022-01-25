import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React from 'react'

export type TabsGroupProps = {
  data: Array<{
    value: number
    label: string
  }>
  value: number
  onClick: (value: number) => void
  hiddenOnSP?: boolean
}

const TabsGroup: React.FC<TabsGroupProps> = ({ data, value, onClick, hiddenOnSP = true }) => {
  const classes = useStyles()

  return (
    <Box className={`${classes.container} ${hiddenOnSP ? classes.hiddenOnSP : ''}`} display={'flex'}>
      {data.map((item, k) => {
        return (
          <Box
            className={classes.singleTab}
            key={k}
            onClick={() => onClick(item.value)}
            style={{ backgroundColor: value === item.value ? Colors.white : Colors.white_opacity[30] }}
          >
            {item.label}
          </Box>
        )
      })}
    </Box>
  )
}

export default TabsGroup

const useStyles = makeStyles((theme) => ({
  container: {
    gap: '16px',
  },
  singleTab: {
    cursor: 'pointer',
    height: '30px',
    padding: '6px 14px',
    color: '#212121',
    fontSize: '12px',
    lineHeight: '21px',
    borderRadius: '5px',
  },
  [theme.breakpoints.down(769)]: {
    container: {
      '&$hiddenOnSP': {
        display: 'none',
      },
    },
  },
}))
