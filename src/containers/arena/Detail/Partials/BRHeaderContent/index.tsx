import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

type BRHeaderContentProps = {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

const BRHeaderContent: React.FC<BRHeaderContentProps> = ({ header, content, footer }) => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.content}>
        <div className={classes.header}>{header}</div>
        {content}
      </div>
      <div className={classes.footer}>{footer}</div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    borderRadius: 4,
    padding: theme.spacing(0.75),
    backgroundColor: Colors.white_opacity['7'],
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  footer: {},
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: theme.palette.common.black,
    borderRadius: 4,
    marginBottom: theme.spacing(3),
  },
}))

export default BRHeaderContent
