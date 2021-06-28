import React from 'react'
import { ListItemText, Typography, ListItem, ListItemAvatar, makeStyles, Box } from '@material-ui/core'
import Avatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { ShortMember } from '.'
import _ from 'lodash'

export interface MemberItemProps {
  item: ShortMember
  onAdd: (item: ShortMember) => void
}

const MemberItem: React.FC<MemberItemProps> = ({ item, onAdd }) => {
  const classes = useStyles()
  const profile = _.get(item, 'profile', null)
  const nickName = _.get(item, 'nickName', '')
  const userCode = _.get(item, 'userCode', '')

  const handler = () => {
    onAdd(item)
  }

  return (
    <Box className={`${classes.itemHolder} `}>
      <ListItem className={classes.root} onClick={handler}>
        <ListItemAvatar>
          <Avatar src={profile} alt={nickName} />
        </ListItemAvatar>
        <ListItemText className={`${classes.content}`}>
          <Typography noWrap={true} className={classes.name} variant="body2">
            {nickName}
          </Typography>
          <Typography noWrap={true} className={classes.body} variant="body1">
            {userCode}
          </Typography>
        </ListItemText>
      </ListItem>
    </Box>
  )
}

MemberItem.defaultProps = {}

const useStyles = makeStyles(() => ({
  itemHolder: {
    height: 70,
    listStyleType: 'none',
    paddingTop: 10,
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
  body: {
    color: Colors.text[200],
    fontWeight: 500,
  },
  content: {
    display: 'inline-block',
    visibility: 'visible',
    opacity: '1',
    marginTop: 0,
    width: '100%',
  },
}))

export default MemberItem
