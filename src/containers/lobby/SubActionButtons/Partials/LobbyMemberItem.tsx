import { Typography, Theme, ListItemSecondaryAction, ListItemAvatar, ListItem, ListItemText, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ParticipantsItem } from '@services/lobby.service'
import Avatar from '@components/Avatar'
import _ from 'lodash'
import ESButton from '@components/Button'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'

interface Props {
  data: ParticipantsItem
  goToProfile?: (userCode: string) => void
  follow: (userCode: string) => void
  unFollow: (userCode: string) => void
  unBlock: (userCode: string) => void
}

const LobbyMemberItem: React.FC<Props> = ({ data, follow, unFollow, unBlock, goToProfile }) => {
  const classes = useStyles()
  const userCode = _.defaultTo(data.attributes.user_code, '')
  const nickName = _.defaultTo(data.attributes.nickname, '')
  const avatar = _.defaultTo(data.attributes.avatar_url, null)
  const isBlocked = _.get(data, 'attributes.is_blocked', false)
  const isFollowed = _.get(data, 'attributes.is_followed', false)

  const renderUnBlock = () => {
    if (isBlocked) {
      return (
        <ESButton
          onClick={() => unBlock(userCode)}
          variant="outlined"
          className={classes.button}
          size="medium"
          round
          normalColor={Colors.red[10]}
          hoverColor={Colors.red[30]}
        >
          {i18n.t('common:home.follow')}
        </ESButton>
      )
    }
  }

  const renderFollow = () => {
    if (!isBlocked && !isFollowed) {
      return (
        <ESButton onClick={() => follow(userCode)} variant="outlined" className={classes.button} size="medium" round>
          {i18n.t('common:common.blocking')}
        </ESButton>
      )
    }
  }

  const renderUnFollow = () => {
    if (!isBlocked && isFollowed) {
      return (
        <ESButton onClick={() => unFollow(userCode)} variant="contained" color="primary" size="medium" round className={classes.button}>
          {i18n.t('common:home.unfollow')}
        </ESButton>
      )
    }
  }

  return (
    <ListItem onClick={() => goToProfile && goToProfile(userCode)} className={classes.root}>
      <ListItemAvatar>
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="primary"
          overlap="circle"
          badgeContent={0}
          showZero={false}
        >
          <Avatar src={avatar} alt={nickName} />
        </Badge>
      </ListItemAvatar>
      <ListItemText className={classes.listItem}>
        <Typography noWrap={true} variant="h3">
          {nickName}
        </Typography>
        <Typography noWrap={true} variant="body2">
          {!_.isEmpty(userCode) ? '@' + userCode : ''}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction className={classes.secondaryAction}>
        {renderFollow()}
        {renderUnBlock()}
        {renderUnFollow()}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  listItem: {
    paddingRight: 140,
  },
  button: {},
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

export default LobbyMemberItem
