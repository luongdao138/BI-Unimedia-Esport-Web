import { makeStyles } from '@material-ui/core/styles'
import { Typography, ListItemSecondaryAction, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import Avatar from '@components/Avatar'
import Button from '@components/Button'
import i18n from '@locales/i18n'
import _ from 'lodash'

interface RoomMemberItemProps {
  id: number
  name: string
  userCode: string
  isAdminOrSelf: boolean
  onDelete: (id: number) => void
  profile: string
}

const RoomMemberItem: React.FC<RoomMemberItemProps> = ({ id, name, userCode, isAdminOrSelf, onDelete, profile }) => {
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
          <Avatar src={profile} alt={name} />
        </Badge>
      </ListItemAvatar>
      <ListItemText className={classes.listItem}>
        <Typography noWrap={true} variant="h3">
          {name}
        </Typography>
        <Typography noWrap={true} variant="body2">
          {!_.isEmpty(userCode) ? '@' + userCode : ''}
        </Typography>
      </ListItemText>
      {!isAdminOrSelf && (
        <ListItemSecondaryAction className={classes.secondaryAction}>
          <Button variant="outlined" onClick={() => onDelete(id)} round>
            {i18n.t('common:chat.delete_member')}
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  listItem: {
    paddingRight: 140,
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    secondaryAction: {
      right: 0,
    },
  },
}))

export default RoomMemberItem
