import { Typography, Theme, ListItemSecondaryAction, ListItemAvatar, ListItem, ListItemText, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ParticipantsItem } from '@services/lobby.service'
import Avatar from '@components/Avatar'
import _ from 'lodash'
import ESButton from '@components/Button'
import i18n from '@locales/i18n'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Colors } from '@theme/colors'

interface Props {
  data: ParticipantsItem
  goToProfile?: (userCode: string) => void
  follow?: (userCode: string) => void
  unFollow?: (userCode: string) => void
  unBlock?: (userCode: string) => void
  isMe: boolean
  isAuth: boolean
}

const LobbyMemberItem: React.FC<Props> = ({ data, follow, unFollow, unBlock, goToProfile, isMe, isAuth }) => {
  const classes = useStyles()
  const userCode = _.defaultTo(data.attributes.user_code, '')
  const nickName = _.defaultTo(data.attributes.nickname, '')
  const avatar = _.defaultTo(data.attributes.avatar_url, null)
  const isBlocked = _.get(data, 'attributes.is_blocked', false)
  const isFollowed = _.get(data, 'attributes.is_followed', false)
  const isLoading = _.get(data, 'pending', false)

  const renderUnBlock = () => {
    if (isBlocked) {
      return !isLoading ? (
        <ESButton
          onClick={() => unBlock(userCode)}
          variant="outlined"
          className={classes.button}
          size="medium"
          round
          disabled={isLoading}
          normalColor={Colors.red[10]}
          hoverColor={Colors.red[30]}
        >
          {i18n.t('common:common.blocking')}
        </ESButton>
      ) : (
        <CircularProgress size={24} className={classes.loader} />
      )
    }
  }

  const renderFollow = () => {
    if (!isBlocked && !isFollowed) {
      return !isLoading ? (
        <ESButton
          disabled={isLoading}
          onClick={() => follow && follow(userCode)}
          variant="outlined"
          className={classes.button}
          size="medium"
          round
        >
          {i18n.t('common:home.follow')}
        </ESButton>
      ) : (
        <CircularProgress size={24} className={classes.loader} />
      )
    }
  }

  const renderUnFollow = () => {
    if (!isBlocked && isFollowed) {
      return !isLoading ? (
        <ESButton
          onClick={() => unFollow && unFollow(userCode)}
          variant="contained"
          color="primary"
          size="medium"
          disabled={isLoading}
          round
          className={classes.button}
        >
          {i18n.t('common:home.unfollow')}
        </ESButton>
      ) : (
        <CircularProgress size={24} className={classes.loader} />
      )
    }
  }

  return (
    <ListItem ContainerProps={{ style: { listStyle: 'none' } }} className={classes.root}>
      <ListItemAvatar>
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="primary"
          overlap="circle"
          badgeContent={0}
          showZero={false}
          style={{ cursor: 'pointer' }}
          onClick={() => goToProfile && goToProfile(userCode)}
        >
          <Avatar src={avatar} alt={nickName} />
        </Badge>
      </ListItemAvatar>
      <ListItemText className={classes.listItem}>
        <Typography noWrap={true} variant="h3" style={isMe === true ? { color: Colors.yellow } : undefined}>
          {nickName}
        </Typography>
        <Typography noWrap={true} variant="body2">
          {!_.isEmpty(userCode) ? i18n.t('common:common.at') + userCode : ''}
        </Typography>
      </ListItemText>

      {isMe === false && isAuth && (
        <ListItemSecondaryAction className={classes.secondaryAction}>
          {renderFollow()}
          {renderUnBlock()}
          {renderUnFollow()}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    listStyle: 'none',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  listItem: {
    paddingRight: 140,
  },
  button: {},
  [theme.breakpoints.down('sm')]: {
    secondaryAction: {
      right: theme.spacing(2),
    },
  },
  loader: {
    width: 10,
    height: 10,
    marginRight: 40,
  },
}))

export default LobbyMemberItem
