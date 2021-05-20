import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import Avatar from '@components/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

interface RoomMemberItemProps {
  name: string
}

const RoomMemberItem: React.FC<RoomMemberItemProps> = ({ name }) => {
  const classes = useStyles()
  return (
    <ListItem onClick={() => null} className={classes.root}>
      <ListItemAvatar>
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="primary"
          overlap="circle"
          badgeContent={0}
          showZero={false}
        >
          <Avatar alt="M" />
        </Badge>
      </ListItemAvatar>

      <ListItemText primary={name} secondary="Jan 9, 2014" />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
}))

export default RoomMemberItem
