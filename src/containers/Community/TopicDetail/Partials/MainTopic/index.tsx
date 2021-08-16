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
  isConfirm?: boolean
}
const MainTopic: React.FC<CommunityHeaderProps> = ({ username, mail, discription, date, image, count, isConfirm }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.container}>
        <Box m={2}>
          <Box className={classes.userContainer}>
            <Box className={classes.userInfoContainer} ml={isConfirm ? 3 : 0}>
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

          <Box className={classes.discriptionContainer} mb={3} mt={3}>
            <Typography className={classes.discription}>{discription}</Typography>
          </Box>
          {image ? (
            <Box
              className={classes.image}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></Box>
          ) : (
            <></>
          )}
          {count ? (
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Box display="flex" justifyContent="flex-end">
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-comment-alt" fontSize="small" />
                </Box>
                <Box className={classes.numberBox} mr={1} ml={1}>
                  <Typography className={classes.count}>{count}</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-comment-alt" fontSize="small" />
                </Box>
                <Box className={classes.numberBox} mr={1} ml={1}>
                  <Typography className={classes.count}>{count}</Typography>
                </Box>
                <Box className={classes.numberBox}>
                  <Icon className="fas fa-share" fontSize="small" style={{ transform: 'scaleX(-1)' }} />
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
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
    fontSize: 16,
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 12,
  },
  date: {
    fontSize: 11,
    color: Colors.white_opacity[30],
  },
  discriptionContainer: {
    display: 'flex',
  },
  image: {
    display: 'flex',

    paddingTop: '30.27%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  discription: {
    color: Colors.grey[300],
    fontSize: 14,
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
