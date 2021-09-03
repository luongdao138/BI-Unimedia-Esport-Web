import { CardContent, CardContentProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  contentRoot: {
    background: Colors.black_card,
  },
}))

const ESCardContent: React.FC<CardContentProps> = ({ children }) => {
  const classes = useStyles()
  return <CardContent classes={{ root: classes.contentRoot }}>{children}</CardContent>
}

ESCardContent.defaultProps = {}
export default ESCardContent
