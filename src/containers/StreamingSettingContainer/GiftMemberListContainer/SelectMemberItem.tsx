import React from 'react'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'

const SelectMemberItem: React.FC = () => {
  const classes = useStyles()
  const itemType = () => {
    return 'チーム'
  }

  const itemName = () => {
    return 'もるチャン'
  }

  return (
    <Box className={classes.container}>
      <ESAvatar />
      <Box className={classes.textContainer}>
        <Typography className={classes.itemType}>{itemType()}</Typography>
        <Typography>{itemName()}</Typography>
      </Box>
      <Box className={classes.buttonRemove}>
        <Icon className={`fa fa-times ${classes.iconRemove}`} fontSize="small" />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  iconRemove: {},
  buttonRemove: {
    alignSelf: 'center',
    padding: '8px',
  },
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: '10px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: '8px',
    paddingBottom: '4px',
    paddingTop: '4px',
  },
  itemType: {
    width: '52px',
    borderRadius: '5px',
    height: '15px',
    fontSize: '10px',
    color: Colors.white,
    fontWeight: 'bold',
    backgroundColor: '#767676',
    textAlign: 'center',
  },
}))

export default SelectMemberItem
