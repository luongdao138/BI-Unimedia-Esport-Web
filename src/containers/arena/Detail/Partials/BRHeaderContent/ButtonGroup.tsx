import { makeStyles } from '@material-ui/core/styles'
import { Box, BoxProps } from '@material-ui/core'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

type Size = 'medium' | 'large'

interface ButtonGroupProps extends BoxProps {
  children: ReactNode
  size?: Size
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, size = 'medium', ...rest }) => {
  const classes = useStyles({ size })
  return (
    <Box className={classes.buttonGroup} {...rest}>
      {children}
    </Box>
  )
}

export default ButtonGroup

const useStyles = makeStyles((theme) => ({
  buttonGroup: (props: { size: Size }) => {
    const width = props.size === 'medium' ? 160 : 280
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      '& >*': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width,
      },
      '& >*:first-child': {
        marginLeft: 0,
      },
      '& >*:last-child': {
        marginRight: 0,
      },
    }
  },
  [theme.breakpoints.down('sm')]: {
    buttonGroup: (props: { size: Size }) => {
      const width = props.size === 'medium' ? 160 : 280
      return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& >*': {
          marginLeft: 0,
          marginRight: 0,
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
          width,
        },
        '& >*:first-child': {
          marginTop: 0,
        },
        '& >*:last-child': {
          marginBottom: 0,
        },
      }
    },
  },
}))
