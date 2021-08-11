import { Box, Typography, Icon, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'

type CommunityHeaderProps = {
  username: string
  mail: string
  discription: string
  date?: string
  count?: number
  image?: string
}
const MainTopic: React.FC<CommunityHeaderProps> = ({ username, mail, discription, date, image, count }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.userContainer}>
          <Box className={classes.userInfoContainer}>
            <ESAvatar className={classes.avatar} alt={username} src={username ? '' : '/images/avatar.png'} />
            <Box className={classes.userInfoBox} ml={1} maxWidth="100%">
              <Typography className={classes.username}>{username}</Typography>
              <Typography className={classes.mail}>{mail}</Typography>
            </Box>
          </Box>
          {date && count && (
            <Box className={classes.dateReportContainer}>
              <Typography className={classes.date}>{date}</Typography>
              <Box className={classes.reportButton}>
                <IconButton>
                  <Icon className="fa fa-ellipsis-v" fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

        <Box className={classes.discriptionContainer} mb={3}>
          <Typography className={classes.discription}>{discription}</Typography>
        </Box>
        {image ? (
          <Box
            className={classes.image}
            style={{
              background: `url(${image})`,
            }}
            mb={3}
          ></Box>
        ) : (
          <></>
        )}
        {count && (
          <Box display="flex" justifyContent="flex-end" mr={3} mb={3}>
            <Box className={classes.numberBox} mr={1}>
              <Icon className="fas fa-comment-alt" fontSize="small" />
            </Box>
            <Box className={classes.numberBox}>
              <Typography className={classes.count}>{count}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: theme.spacing(3),
    backgroundColor: 'black',
    flexDirection: 'column',
    borderRadius: 5,
    border: '1px solid rgba(255,255,255,0.3)',
  },
  userContainer: {
    display: 'flex',
    margin: theme.spacing(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    width: 'calc(90% - 150px)',
  },
  userAvatarBox: {
    display: 'flex',
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  userInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  dateReportContainer: {
    display: 'flex',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: ' flex-end',
  },
  reportButton: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    zIndex: 30,
    width: 50,
    height: 50,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  date: {
    fontSize: 11,
    color: Colors.white_opacity[30],
  },
  discriptionContainer: {
    display: 'flex',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  image: {
    display: 'flex',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingTop: '30.27%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  discription: {
    color: Colors.white_opacity[70],
  },
  numberBox: {
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
  },
}))

export default MainTopic
