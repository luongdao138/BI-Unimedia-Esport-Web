// import { useTranslation } from 'react-i18next'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface Props {
  position?: number | string
  avatar: JSX.Element
  type?: string
  tab: number
  name?: string | undefined
  total?: string | number
}

const RankingItemSelf: React.FC<Props> = ({ avatar, name, total, position }) => {
  const classes = useStyles()
  // const { t } = useTranslation('common')

  return (
    <>
      <TableRow>
        <TableCell padding="none" colSpan={3}>
          <Box>
            <Typography component="p" className={classes.mySelf}>
              自分
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
      {position <= 10 ? (
        <TableRow className={classes.rowSelf}>
          <TableCell>
            <Box className={classes.placementWrapper}>
              <Typography
                className={`${classes.text} ${position === 1 && classes.first} ${position === 2 && classes.second} ${
                  position === 3 && classes.third
                } ${position >= 4 && classes.other}`}
              >
                {position}
                {position === 1 && <span>st</span>}
                {position === 2 && <span>nd</span>}
                {position === 3 && <span>rd</span>}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box display="flex">
              <Box>{avatar}</Box>
              <Box className={classes.nameWrapper} justifyContent="center">
                {name && (
                  <Typography variant="body2" className={classes.user_code} noWrap>
                    {name}
                  </Typography>
                )}
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Typography className={classes.tip}>{FormatHelper.currencyFormat(total.toString())}</Typography>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>
            <Box className={classes.placementWrapper}>
              <Typography className={classes.self}></Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box display="flex">
              <Box>{avatar}</Box>
              <Box className={classes.nameWrapper} justifyContent="center">
                {name && (
                  <Typography variant="body2" className={classes.user_code} noWrap>
                    {name}
                  </Typography>
                )}
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Typography className={classes.tip}>{FormatHelper.currencyFormat(total.toString())}</Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default RankingItemSelf

const useStyles = makeStyles((theme) => ({
  placementWrapper: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },
  mySelf: {
    position: 'relative',
    marginLeft: '3%',
    '&::before': {
      content: "''",
      width: '87%',
      height: '1px',
      position: 'absolute',
      fontSize: '12px',
      right: '0px',
      top: '50%',
      background: '#707070',
    },
  },
  text: {
    fontSize: 30,
    fontWeight: 800,
    fontStyle: 'normal',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
    '& span': {
      fontSize: '0.5em',
    },
    '&$first': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 30,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(247,247,53,1) 0%, rgba(195,247,53,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFFF65',
      '& span': {
        marginLeft: -4,
      },
    },
    '&$second': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 30,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(198,198,198,1) 0%, rgba(109,157,234,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #C3D0E3',
    },
    '&$third': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 30,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(255,182,65,1) 0%, rgba(227,111,60,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFC962',
    },
    '&$other': {
      textAlign: 'center',
      fontStyle: 'italic',
    },
    '&$self': {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  },
  first: {},
  second: {},
  third: {},
  other: {},
  self: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: "''",
      width: 20,
      height: 5,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#C4C4C4',
    },
  },
  rowSelf: {
    borderBottom: '1px solid #707070',
  },
  nameWrapper: {
    overflow: 'hidden',
    color: Colors.white,
    paddingLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(1),
    alignContent: 'center',
  },
  user_code: {
    color: Colors.white_opacity['70'],
    fontSize: 12,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
  },
  tip: {
    fontSize: 16,
    color: theme.palette.common.white,
    textAlign: 'right',
    wordBreak: 'break-word',
    fontFamily: "'Noto Sans JP', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 'bold',
  },
  [theme.breakpoints.down('sm')]: {
    user_code: {
      maxWidth: '80px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    text: {
      fontSize: '20px !important',
    },
    placementWrapper: {
      minWidth: 30,
      marginRight: 6,
    },
    nameWrapper: {
      paddingLeft: theme.spacing(1),
      overflow: 'hidden',
    },
    tip: {
      fontSize: 14,
    },
  },
}))
