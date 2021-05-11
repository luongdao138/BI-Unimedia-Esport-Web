import { makeStyles } from '@material-ui/core/styles'

interface RoomListItemProps {
  expand?: boolean
}

const RoomListItem: React.FC<RoomListItemProps> = ({ expand }) => {
  const classes = useStyles()
  return <div className={classes.root}>{expand}</div>
}
const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
}))

RoomListItem.defaultProps = {}

export default RoomListItem
