// import { useTranslation } from 'react-i18next'
import { Box, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { RECEIPT_SEND_TABS } from '../ChatContainer/Tabs/RankingTab'

interface Props {
  position: number | string
  avatar: JSX.Element
  type?: string
  tab: number
  name?: string | undefined
  tip?: number
  self?: boolean
}

const RankingItem: React.FC<Props> = ({ position, avatar, type, tab, name, tip }) => {
  const classes = useStyles()
  // const { t } = useTranslation('common')

  return (
    <TableRow>
      <TableCell>
        <Box className={classes.placementWrapper}>
          <Typography
            className={`${classes.text} ${position === 1 && classes.first} ${position === 2 && classes.second} ${
              position === 3 && classes.third
            } ${position >= 4 && classes.other} ${self && classes.self}`}
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
          <Box className={classes.nameWrapper} justifyContent={`${tab === RECEIPT_SEND_TABS.RECEIPT ? 'space-between' : 'center'}`}>
            {tab === RECEIPT_SEND_TABS.RECEIPT && (
              <Typography variant="h3" component="p" noWrap className={classes.type}>
                {type}
              </Typography>
            )}
            {name && (
              <Typography variant="body2" className={classes.user_code} noWrap>
                {name}
              </Typography>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography className={classes.tip}>{tip}</Typography>
      </TableCell>
    </TableRow>
  )
}

export default RankingItem

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  contentWrapper: {
    height: 66,
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: Colors.white_opacity['10'],
    },
    paddingRight: 120,
  },
  placementWrapper: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  mySelf: {
    '&::before': {
      content: "''",
      width: '90%',
      height: '1px',
      position: 'absolute',
      fontSize: '12px',
      right: 0,
      top: '50%',
      background: '#707070',
    },
  },
  text: {
    fontSize: 24,
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
    },
    '&$self': {
      textAlign: 'center',
    },
  },
  first: {},
  second: {},
  third: {},
  other: {},
  self: {},
  nameWrapper: {
    overflow: 'hidden',
    color: Colors.white,
    paddingLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(1),
    alignContent: 'center',
  },
  type: {
    backgroundColor: '#767676',
    color: Colors.white,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 10,
  },
  breakWord: {
    wordBreak: 'break-word',
  },
  user_code: {
    color: Colors.white_opacity['70'],
    fontSize: 12,
  },
  tip: {
    fontSize: 16,
    color: theme.palette.common.white,
    textAlign: 'right',
  },
  [theme.breakpoints.down('sm')]: {
    contentWrapper: {
      paddingLeft: 0,
    },
  },
  [theme.breakpoints.down('xs')]: {
    itemAvatar: {
      width: 30,
      '& .MuiAvatar-root': {
        width: 30,
        height: 30,
      },
    },
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
