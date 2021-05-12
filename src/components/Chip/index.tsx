import { Chip, ChipProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.typography.body1.fontSize,
    height: 36,
    borderRadius: 4,
    color: theme.palette.text.primary,
    backgroundColor: Colors.grey['200'],
  },
  clickableColorPrimary: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white,
    },
    '&:focus': {
      color: theme.palette.common.white,
    },
  },
  deleteIcon: {
    color: theme.palette.common.white,
  },
}))

const ESChip: React.FC<ChipProps> = ({ classes: _classes, ...rest }) => {
  const classes = useStyles()
  const iconProps: ChipProps = {
    deleteIcon: <CloseIcon />,
  }
  return <Chip classes={classes} {...rest} {...iconProps} />
}

export default ESChip
