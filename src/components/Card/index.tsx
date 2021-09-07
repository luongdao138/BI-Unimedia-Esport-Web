import { Card, CardProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    background: '#0A0A0A',
  },
  root: {
    position: 'relative',
    margin: theme.spacing(1),
  },
  contentRoot: {
    background: Colors.black,
  },
}))

const ESCard: React.FC<CardProps> = ({ children, ...rest }) => {
  const classes = useStyles(rest)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...props } = rest
  return (
    <Card {...props} classes={{ root: classes.cardRoot }} className={classes.root}>
      {children}
    </Card>
  )
}

ESCard.defaultProps = {}
export default ESCard
