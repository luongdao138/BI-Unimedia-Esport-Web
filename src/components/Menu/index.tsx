import { useState, ReactNode } from 'react'
import { Menu, IconButton, Icon, Box, withStyles } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

interface MenuProps {
  children: ReactNode
  className?: string
  disableRipple?: boolean
  iconClass?: string
  hover?: boolean
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

const ESMenu: React.FC<MenuProps> = ({ className, children, disableRipple, iconClass, hover }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={className} onMouseEnter={hover && handleClick} onMouseLeave={hover && handleClose}>
      <IconButton className={`${classes.iconButtonBg} ${iconClass ? iconClass : ''}`} disableRipple={disableRipple} onClick={handleClick}>
        <Icon className="fa fa-ellipsis-v" fontSize="small" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
      >
        {children}
      </StyledMenu>
    </Box>
  )
}

ESMenu.defaultProps = {
  disableRipple: false,
}

export default ESMenu
