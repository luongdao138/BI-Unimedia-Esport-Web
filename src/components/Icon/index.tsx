import { Icon, IconProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  iconRoot: {
    width: '1.3em',
  },
  iconFontSizeSmall: {
    fontSize: '1.125rem',
  },
}))

const ESIcon: React.FC<IconProps> = (props) => {
  const classes = useStyles()
  return (
    <Icon
      classes={{
        root: classes.iconRoot,
        fontSizeSmall: classes.iconFontSizeSmall,
      }}
      {...props}
    />
  )
}

ESIcon.defaultProps = {}
export default ESIcon
