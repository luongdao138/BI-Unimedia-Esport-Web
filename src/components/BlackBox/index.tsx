import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactNode } from 'react'

type BlackBoxProps = {
  children?: ReactNode
}
const BlackBox: React.FC<BlackBoxProps> = ({ children }) => {
  const classes = useStyles()

  return <Box className={classes.root}>{children}</Box>
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: theme.spacing(0.5),
    backgroundColor: Colors.black,
  },
}))

export default BlackBox
