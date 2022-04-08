import { useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'
import ReactTooltip from 'react-tooltip'

interface Props {
  id: string
  title: string
  offset?: any
  place?: 'top' | 'right' | 'bottom' | 'left'
}

const PlayerTooltip: React.FC<Props> = ({ id, title, offset, place = 'top' }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  return isMobile ? null : (
    <ReactTooltip
      id={id}
      type="dark"
      effect="solid"
      className={classes.playerTooltip}
      offset={offset || { top: -10, left: 10 }}
      place={place}
    >
      <span>{title}</span>
    </ReactTooltip>
  )
}
const useStyles = makeStyles(() => ({
  playerTooltip: {
    padding: '5px 7px !important',
    transition: 'opacity 0.3s ease-out',
  },
}))
export default memo(PlayerTooltip)
