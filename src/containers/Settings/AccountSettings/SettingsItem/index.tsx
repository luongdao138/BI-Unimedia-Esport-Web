import { makeStyles, Theme, Box, Typography, IconButton, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'

export interface SettingsItemProps {
  title?: string
  disabled?: boolean
  value: string
  invisible?: boolean
  url?: string
}

const SettingsItem: React.FC<SettingsItemProps> = ({ title, disabled, value, invisible, url }) => {
  const classes = useStyles()

  return (
    <Box margin={2} display="flex" justifyContent="space-between">
      <Box className={classes.settingItemWrap}>
        <Box overflow="hidden" textOverflow="ellipsis" ml={0} display="flex" flexDirection="column" justifyContent="center">
          <Typography className={classes.title} noWrap>
            {title}
          </Typography>
        </Box>
        <Typography className={disabled ? classes.disabled : classes.value}>{invisible ? '*************' : value}</Typography>
        {url && (
          <IconButton className={classes.iconButton} disableRipple size="small">
            <Icon className={`fas fa-edit ${classes.icon}`} />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  settingItemWrap: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    paddingRight: theme.spacing(5),
    position: 'relative',
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  title: {
    color: Colors.white_opacity['70'],
    fontWeight: 'bold',
    width: 110,
  },
  value: {
    color: Colors.white_opacity['70'],
  },
  disabled: {
    color: Colors.white_opacity['30'],
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  icon: {
    fontSize: 14,
    color: Colors.white_opacity['70'],
  },
}))

export default SettingsItem
