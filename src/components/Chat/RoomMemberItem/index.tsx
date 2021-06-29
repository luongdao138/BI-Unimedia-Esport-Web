import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import Avatar from '@components/Avatar'
import Button from '@components/Button'
import i18n from '@locales/i18n'

interface RoomMemberItemProps {
  id: number
  name: string
  userCode: string
  onDelete: (id: number) => void
  profile: string
}

const RoomMemberItem: React.FC<RoomMemberItemProps> = ({ id, name, userCode, onDelete, profile }) => {
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
          <Avatar src={profile} alt="M" />
        </Badge>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={userCode} />
      <ListItemSecondaryAction>
        <Button variant="outlined" onClick={() => onDelete(id)} round>
          {i18n.t('common:chat.delete_member')}
        </Button>
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
