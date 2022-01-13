import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'
// import { useTranslation } from 'react-i18next'

const ItemGift: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <TableRow key={1}>
      <TableCell align="center">
        <Box display="flex" flexDirection="row">
          <ESAvatar />
          <Box ml={1} display="flex" flexDirection="column" justifyContent="space-between" className={classes.teamAndName}>
            <Box className={classes.team}>
              <Typography variant="caption">個人</Typography>
            </Box>
            <Typography className={classes.name}>もるチャン</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">2</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">1,500</Typography>
      </TableCell>
    </TableRow>
  )
}
export default ItemGift

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 12,
  },
  team: {
    fontSize: 10,
    backgroundColor: Colors.grey['200'],
    textAlign: 'center',
    borderRadius: 4,
    color: theme.palette.text.primary,
  },
  teamAndName: {
    paddingTop: 2,
    paddingBottom: 2,
  },
}))
