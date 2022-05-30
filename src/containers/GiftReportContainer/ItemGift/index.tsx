import ESAvatar from '@components/Avatar'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { GiftsResponse } from '@services/deliveryReport.service'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'
import { useTranslation } from 'react-i18next'

enum TYPE {
  PERSONAL = 0,
  TEAM = 1,
}
enum USER {
  VIEWER = 0,
  STREAM = 1,
}

const ItemGift: React.FC<GiftsResponse> = (props) => {
  const { t } = useTranslation('common')
  const { image, name, point, point_user_giver, type, streamer, user_nickname, user_avatar } = props
  const classes = useStyles()

  const typeName = type === TYPE.PERSONAL ? t('streaming_gift_report_screen.personal') : t('streaming_gift_report_screen.team')
  return (
    <TableRow key={1}>
      <TableCell align="center">
        <Box display="flex" flexDirection="row">
          {streamer !== USER.STREAM ? (
            <>
              <ESAvatar src={image} alt={name} />
              <Box ml={1} display="flex" flexDirection="column" justifyContent="space-between" className={classes.teamAndName}>
                <Box className={classes.team}>
                  <Typography variant="caption">{typeName}</Typography>
                </Box>
                <Typography className={classes.name}>{name}</Typography>
              </Box>
            </>
          ) : (
            <>
              <ESAvatar src={user_avatar} alt={user_nickname} />
              <Box className={classes.wrapNameStreamer}>
                <Typography className={classes.nameStreamer}>{user_nickname}</Typography>
              </Box>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography component="span">{point_user_giver}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="span">{FormatHelper.currencyFormat(point.toString())}</Typography>
      </TableCell>
    </TableRow>
  )
}
export default ItemGift

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
  },
  team: {
    fontSize: 10,
    backgroundColor: '#767676',
    textAlign: 'center',
    borderRadius: 4,
    color: theme.palette.text.primary,
    maxWidth: 51,
    minWidth: 51,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  teamAndName: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  wrapNameStreamer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8px',
  },
  nameStreamer: {
    fontSize: 12,
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
