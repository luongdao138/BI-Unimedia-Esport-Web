import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { DateHelper } from '@utils/helpers/DateHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'
// import { useTranslation } from 'react-i18next'

const ItemTicket: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <TableRow key={1}>
      <TableCell align="center">
        <Box display="flex" flexDirection="row">
          <ESAvatar />
          <Box ml={1} display="flex" justifyContent="center" flexDirection="column">
            <Typography className={classes.name}>もるチャン</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{DateHelper.formatDateTime('2013-02-04T10:35:24-08:00')}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">{FormatHelper.currencyFormat('10000')}</Typography>
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
