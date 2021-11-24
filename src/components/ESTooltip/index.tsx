import { Tooltip, TooltipProps } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const ESTooltip: React.FC<TooltipProps> = ({ children, ...rest }) => {
  const CustomTooltip = withStyles({
    tooltip: {
      fontSize: '14px',
      color: '#4d4d4d',
      marginTop: '14px',
      marginBottom: '12px',
      backgroundColor: '#fff',
      padding: '8px 12px',
    },
    arrow: {
      color: '#fff',
      left: '6px !important',
    },
  })(Tooltip)

  return <CustomTooltip {...rest}>{children}</CustomTooltip>
}

export default ESTooltip
