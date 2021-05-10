import { useState, ReactNode } from 'react'
import { Menu, IconButton, Icon, Box, withStyles } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

interface MenuProps {
  children: ReactNode
  className?: string
}
const useStyles = makeStyles(() => ({
  iconButtonBg: {
    alignItems: 'center',
  },
}))

const StyledMenu = withStyles({
  paper: {
    background: 'white',
  },
})(Menu)

const ESMenu: React.FC<MenuProps> = ({ className, children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={className}>
      <IconButton className={classes.iconButtonBg} onClick={handleClick}>
        <Icon className="fa fa-ellipsis-v" fontSize="small" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {children}
      </StyledMenu>
    </Box>
  )
}

export default ESMenu
