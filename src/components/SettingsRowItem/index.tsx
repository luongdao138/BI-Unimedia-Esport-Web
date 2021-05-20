import { Typography, Box, Theme, makeStyles } from '@material-ui/core'
import ESSwitchIOS from '@components/Switch'
import { Colors } from '@theme/colors'

export interface SettingsRowItemProps {
  title?: string
  checked?: boolean
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  showSwitch?: boolean
}

const SettingsRowItem: React.FC<SettingsRowItemProps> = ({ title, checked, handleChange, name, showSwitch }) => {
  const classes = useStyles()

  return (
    <div>
      <Box margin={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden" className={classes.notificationWrap}>
          <Box overflow="hidden" textOverflow="ellipsis" ml={0} display="flex" flexDirection="column" justifyContent="center" width="100%">
            <Typography noWrap style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
              {title}
            </Typography>
          </Box>
          {showSwitch ? (
            <Box textAlign="center">
              <ESSwitchIOS key={title} handleChange={handleChange} name={name} checked={checked} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  notificationWrap: {
    width: '100%',
    padding: theme.spacing(2),
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
}))

export default SettingsRowItem
