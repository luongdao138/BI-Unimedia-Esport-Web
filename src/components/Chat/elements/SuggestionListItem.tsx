import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@components/Avatar'
import Typography from '@material-ui/core/Typography'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import 'moment/locale/ja'

interface RoomListItemProps {
  item: ChatSuggestionList
}

const RoomListItem: React.FC<RoomListItemProps> = ({ item }) => {
  const avatar = _.get(item, 'profile', '')
  const name = _.get(item, 'nickName', '')
  const usercode = _.get(item, 'userCode', '')
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <ListItemAvatar>
        <Avatar className={classes.avatar} src={avatar} alt={name} />
      </ListItemAvatar>
      <ListItemText className={classes.content}>
        <Typography noWrap={true} className={classes.name} variant="body2">
          {name}
        </Typography>
        <Typography noWrap={true} className={classes.userCode} variant="body1">
          {_.isEmpty(usercode) ? '' : '@' + usercode}
        </Typography>
      </ListItemText>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  content: {},
  name: {
    color: Colors.text[400],
    fontSize: 14,
    fontWeight: 500,
  },
  userCode: {
    fontSize: 12,
    color: Colors.text[400],
  },
  avatar: {
    width: 50,
    height: 50,
  },
}))

RoomListItem.defaultProps = {}

export default RoomListItem
