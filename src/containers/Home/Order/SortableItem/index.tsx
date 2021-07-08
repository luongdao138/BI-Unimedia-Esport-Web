import React from 'react'
import { Typography, Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

export type Props = {
  name: string
}

export const SortableItem: React.FC<Props> = ({ name }) => {
  const classes = useStyles()

  return (
    <Box mb={3} className={classes.dragItemWrap}>
      <IconButton className={classes.iconButton}>
        <Icon className="fas fa-bars" fontSize="small" />
      </IconButton>
      <Typography variant="h3" className={classes.dragTitle}>
        {name}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  dragItemWrap: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    '&:hover': {
      background: Colors.white_opacity[30],
      cursor: 'grab',
    },
  },
  iconButton: {
    color: Colors.white_opacity[30],
  },
  dragTitle: {
    color: Colors.white_opacity[70],
  },
}))
