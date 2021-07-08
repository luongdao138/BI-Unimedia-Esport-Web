import React from 'react'
import { ListItemText, Typography, ListItem, ListItemAvatar, makeStyles, Box } from '@material-ui/core'
import Avatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { RecommendedUsers } from '@services/arena.service'

export interface MemberItemProps {
  item: RecommendedUsers
  disabled: boolean
  onAdd: (item: RecommendedUsers) => void
}

const MemberItem: React.FC<MemberItemProps> = ({ item, disabled, onAdd }) => {
  const classes = useStyles()

  const profile = _.get(item.attributes, 'avatar', null)
  const nickName = _.get(item.attributes, 'nickname', '')
  const userCode = _.get(item.attributes, 'user_code', '')

  const disabledClass = disabled ? classes.disabled : ''

  const handler = () => {
    !disabled && onAdd(item)
  }

  return (
    <Box className={`${classes.itemHolder}`}>
      <ListItem className={classes.root} onClick={handler}>
        <ListItemAvatar className={disabledClass}>
          <Avatar src={profile} alt={nickName} />
        </ListItemAvatar>
        <ListItemText className={`${disabledClass}`}>
          <Typography noWrap={true} variant="h3">
            {nickName}
          </Typography>
          <Typography noWrap={true} variant="body2">
            {!_.isEmpty(userCode) ? '@' + userCode : ''}
          </Typography>
        </ListItemText>
      </ListItem>
    </Box>
  )
}

MemberItem.defaultProps = {
  disabled: false,
}

const useStyles = makeStyles(() => ({
  itemHolder: {
    height: 70,
    listStyleType: 'none',
    paddingTop: 10,
    cursor: 'pointer',
    paddingBottom: 10,
  },
  disabled: {
    opacity: 0.3,
  },
  root: {
    padding: 2,
    listStyleType: 'none',
  },
  name: {
    color: Colors.text[200],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export default MemberItem
