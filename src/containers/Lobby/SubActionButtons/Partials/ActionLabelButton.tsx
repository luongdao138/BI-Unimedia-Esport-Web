import { ButtonProps, Typography, Box } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import ESButton from '@components/Button'

const useStyles = makeStyles(() => ({
  floatLabel: {
    position: 'absolute',
    paddingLeft: 2,
    paddingRight: 2,
    left: 10,
    top: -10,
    backgroundColor: Colors.grey[500],
    textTransform: 'none',
    lineHeight: 0,
    zIndex: 2,
    '&:after': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
      height: 8,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'block',
      zIndex: -1,
      backgroundColor: '#0f0f0f',
    },
  },
  disabled: {
    color: Colors.white_opacity['30'],
  },
  btn: {
    '&:hover': {
      background: 'transparent',
    },
  },
}))

const ActionLabelButton: React.FC<ButtonProps & { gradient?: boolean; round?: boolean; onClick: () => void; actionLabel?: string }> = ({
  children,
  actionLabel,
  onClick,
  ...rest
}) => {
  const classes = useStyles()
  return (
    <Box position="relative">
      {actionLabel && (
        <Box className={`${classes.floatLabel} ${rest.disabled ? classes.disabled : ''}`}>
          <Typography variant="caption">{actionLabel}</Typography>
        </Box>
      )}
      <ESButton className={actionLabel && classes.btn} {...rest} variant="outlined" fullWidth onClick={onClick}>
        {children}
      </ESButton>
    </Box>
  )
}

ActionLabelButton.defaultProps = {
  round: false,
}
export default ActionLabelButton
