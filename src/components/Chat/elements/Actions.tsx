import React from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { TOOLBAR_ACTIONS } from '../constants'

export interface ActionsProps {
  onPressActions?: (type: number) => void
  disabled?: boolean
}

const Actions: React.FC<ActionsProps> = ({ onPressActions, disabled }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {TOOLBAR_ACTIONS.map((value) => {
        return (
          <IconButton
            key={value.type}
            className={classes.iconButton}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault
              onPressActions ? onPressActions(value.type) : undefined
            }}
            disableRipple
            disabled={disabled === true}
          >
            <Icon className={`${classes.icon} ${value.icon}`} />
          </IconButton>
        )
      })}
    </Box>
  )
}

Actions.defaultProps = {}

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row',
    display: 'flex',
  },
  iconButton: {
    alignItems: 'flex-end',
    '&:hover $icon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    fontSize: 16,
  },
}))

export default Actions
