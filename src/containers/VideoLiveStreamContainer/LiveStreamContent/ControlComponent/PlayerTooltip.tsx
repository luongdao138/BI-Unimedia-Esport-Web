import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'
import ReactTooltip from 'react-tooltip'

interface Props {
  id: string
  title: string
  offset?: any
}

const PlayerTooltip: React.FC<Props> = ({ id, title, offset }) => {
  const classes = useStyles()
  return (
    <ReactTooltip id={id} type="dark" effect="solid" className={classes.playerTooltip} offset={offset || { top: -10, left: 10 }}>
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
