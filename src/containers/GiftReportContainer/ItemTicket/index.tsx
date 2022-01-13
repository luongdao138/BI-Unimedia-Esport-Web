import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
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
        <Typography component="span">2021/11/29_12:00</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography component="span">1,500</Typography>
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
