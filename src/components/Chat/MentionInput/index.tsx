import { makeStyles } from '@material-ui/core/styles'

interface MentionInputProps {
  expand?: boolean
}

const MentionInput: React.FC<MentionInputProps> = ({ expand }) => {
  const classes = useStyles()
  return <div className={classes.root}>{expand}</div>
}
const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
}))

MentionInput.defaultProps = {}

export default MentionInput
