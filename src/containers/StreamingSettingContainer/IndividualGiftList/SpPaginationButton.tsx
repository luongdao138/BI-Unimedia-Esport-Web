import { makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import React from 'react'
import { Colors } from '@theme/colors'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disable?: boolean
  type: 'page' | 'control'
}

const SpPaginationButton: React.FC<Props> = ({ children, type, disable, onClick }) => {
  const classes = useStyles()
  const buttonClassName = `${classes.container} ${type === 'page' ? classes.page : classes.control} ${
    type === 'control' && disable ? classes.controlDisable : ''
  }`
  return (
    <ESButton className={buttonClassName} disabled={disable && type === 'control'} onClick={onClick}>
      {children}
    </ESButton>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    minWidth: '30px',
    width: '30px',
    height: '30px',
    marginLeft: '4px',
    marginRight: '4px',
  },
  page: {
    backgroundColor: Colors.primary,
  },
  control: {
    border: `1px solid ${Colors.primary}`,
    borderRadius: '5px',
  },
  controlDisable: {
    backgroundColor: Colors.white_opacity['30'],
  },
}))

export default SpPaginationButton
