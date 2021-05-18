import { CardContent, CardContentProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  contentRoot: {
    background: Colors.black_card,
  },
}))

const ESCardContent: React.FC<CardContentProps> = ({ children, ...rest }) => {
  const classes = useStyles(rest)
  return <CardContent classes={{ root: classes.contentRoot }}>{children}</CardContent>
}

ESCardContent.defaultProps = {}
export default ESCardContent
