import Loader from '@components/Loader'
import { Box } from '@material-ui/core'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import React from 'react'
import useStyles from '../styles'

interface Props {
  open: boolean
}

const ChatLoader: React.FC<Props> = ({ open }) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  if (!open) return null
  return (
    <Box className={classes.loaderBox}>
      <Loader />
    </Box>
  )
}

export default ChatLoader
