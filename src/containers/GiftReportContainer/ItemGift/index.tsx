import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { GiftsResponse } from '@services/deliveryReport.service'

import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'
// import { useTranslation } from 'react-i18next'

const ItemGift: React.FC<GiftsResponse> = (props) => {
  // const { t } = useTranslation('common')
  const { image, name, point, point_user_giver } = props
  const classes = useStyles()
  return (
    <TableRow key={1}>
      <TableCell align="center">
        <Box display="flex" flexDirection="row">
          <ESAvatar src={image} alt={name} />
          <Box ml={1} display="flex" flexDirection="column" justifyContent="space-between" className={classes.teamAndName}>
            <Box className={classes.team}>
              <Typography variant="caption">個人</Typography>
            </Box>
            <Typography className={classes.name}>{name}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{point_user_giver}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{FormatHelper.currencyFormat(point.toString())}</Typography>
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
    maxWidth: 51,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  teamAndName: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  [theme.breakpoints.down('md')]: {
    team: {
      fontSize: 8,
    },
    name: {
      fontSize: 9,
      marginTop: 5,
    },
  },
}))
