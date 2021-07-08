import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

export interface SwitchIOSProps {
  title?: string
  checked?: boolean
  name?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 63,
      height: 36,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 4,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(28px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 28,
      height: 28,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 18,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch)

const ESSwitchIOS: React.FC<SwitchIOSProps> = ({ checked, handleChange, ...rest }) => {
  return <AntSwitch checked={checked} onChange={handleChange} {...rest} />
}

export default ESSwitchIOS
