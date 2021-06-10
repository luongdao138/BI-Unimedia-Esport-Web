import React from 'react'
import { ListItemText, Typography, ListItem, ListItemAvatar, makeStyles, Theme, Box } from '@material-ui/core'
import ESCheckbox from '@components/Checkbox'
import Avatar from '@components/Avatar'
import { Colors } from '@theme/colors'

export interface MemberItemProps {
  id: number
  nickName: string
  userCode: string
  check: boolean
  onChange: (id: number) => void
  profile: string
}

const MemberItem: React.FC<MemberItemProps> = ({ id, nickName, profile, userCode, check, onChange }) => {
  nickName
  const classes = useStyles()
  const handler = () => onChange(id)

  return (
    <Box className={classes.itemHolder}>
      <ESCheckbox checked={check} onChange={handler} />
      <ListItem className={classes.root} onClick={handler}>
        <ListItemAvatar>
          <Avatar src={profile} alt="m" />
        </ListItemAvatar>
        <ListItemText className={classes.content}>
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

const useStyles = makeStyles((theme: Theme) => ({
  itemHolder: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: theme.spacing(23),
    marginTop: 14,
    cursor: 'pointer',
  },
  root: {
    padding: 2,
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
