import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { TicketsResponse } from '@services/deliveryReport.service'
import { DateHelper } from '@utils/helpers/DateHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'
// import { useTranslation } from 'react-i18next'

const ItemTicket: React.FC<TicketsResponse> = (props) => {
  // const { t } = useTranslation('common')
  const { created_at, image_url, nickname, point } = props
  const classes = useStyles()
  return (
    <TableRow key={1}>
      <TableCell align="center">
        <Box display="flex" flexDirection="row">
          <ESAvatar src={image_url} />
          <Box ml={1} display="flex" justifyContent="center" flexDirection="column">
            <Typography className={classes.name}>{nickname}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{DateHelper.formatDateTime(created_at)}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{FormatHelper.currencyFormat(point.toString())}</Typography>
      </TableCell>
    </TableRow>
  )
}
export default ItemTicket

const useStyles = makeStyles(() => ({
  name: {
    fontSize: 12,
  },
}))
