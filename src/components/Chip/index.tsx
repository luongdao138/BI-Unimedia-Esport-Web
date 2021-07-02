import { Chip, ChipProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  root: (props: { isGameList: boolean }) => ({
    fontSize: theme.typography.body1.fontSize,
    height: 36,
    maxWidth: props.isGameList ? '100%' : theme.spacing(20),
    borderRadius: 4,
    color: theme.palette.text.primary,
    backgroundColor: Colors.grey['200'],
  }),
  colorPrimary: {
    backgroundColor: `${Colors.primary} !important`,
  },
  clickable: {
    '&:focus': {
      backgroundColor: Colors.grey['200'],
    },
  },
  clickableColorPrimary: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white,
    },
    '&:focus': {
      color: theme.palette.common.white,
      backgroundColor: Colors.primary,
    },
  },
  deleteIcon: {
    color: theme.palette.common.white,
    width: 18,
    height: 18,
  },
  labelSmall: {
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
  },
}))

const ESChip: React.FC<ChipProps & { isGameList?: boolean }> = ({ classes: _classes, isGameList = false, ...rest }) => {
  const classes = useStyles({ isGameList: isGameList })
  const iconProps: ChipProps = {
    deleteIcon: <CloseIcon />,
  }
  return <Chip classes={classes} {...rest} {...iconProps} />
}

export default ESChip
