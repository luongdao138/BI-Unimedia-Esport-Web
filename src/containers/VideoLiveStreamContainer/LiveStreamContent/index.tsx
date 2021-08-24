import { Box, Typography, makeStyles, Icon, ButtonBase } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import userProfileStore from '@store/userProfile'
import ESAvatar from '@components/Avatar'
import { useAppSelector } from '@store/hooks'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
// import ESButton from '@components/Button'

const LiveStreamContent: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)

  return (
    <Box className={classes.container}>
      <img src="/images/live_stream/live_stream.png" height="448px" width="100%" />
      <Box className={classes.wrap_info}>
        <Box className={classes.wrap_movie_info}>
          <Box className={classes.wrap_title}>
            <Typography className={classes.movie_title}>ムービータイトルムービータイトル…</Typography>
            <Typography className={classes.device_name}>APEX Legends(PC&Console)</Typography>
          </Box>
          <Box className={classes.live_stream_status}>
            <ESChip
              color={'primary'}
              className={classes.statusChip}
              label={t('live_stream_screen.live_stream_status')}
              onClick={() => ''}
            />
          </Box>
        </Box>

        <Box className={classes.wrap_interactive_info}>
          <Box className={classes.interactive_info}>
            <Typography className={classes.view}>
              <Icon className={`fa fa-eye ${classes.icon}`} fontSize="small" /> {FormatHelper.currencyFormat('10000')}
            </Typography>
            <Typography className={classes.like}>
              <Icon className={`fa fa-thumbs-up ${classes.icon}`} fontSize="small" /> {FormatHelper.currencyFormat('10')}{t('common.ten_thousand')}
            </Typography>
            <Typography className={classes.dislike}>
              <Icon className={`fa fa-thumbs-down ${classes.icon}`} fontSize="small" /> {FormatHelper.currencyFormat('10')}{t('common.ten_thousand')}
            </Typography>
            <Box className={classes.shareButton}>
              <ButtonBase onClick={() => ''}>
                <Icon className={`fa fa-share-alt ${classes.icon}`} fontSize="small" /> 
                <Box pl={1}>{t('live_stream_screen.share_btn')}</Box>
              </ButtonBase>
            </Box>
          </Box>
          <Typography className={classes.three_dot}>
            <Icon className={`fa fa-ellipsis-v ${classes.icon}`} fontSize="small" />
          </Typography>
        </Box>
      </Box>
      <Box className={classes.wrap_streamer_info}>
        <Box className={classes.streamer_info}>
          <ESAvatar
            className={classes.avatar}
            alt={userProfile?.attributes?.nickname}
            src={userProfile ? userProfile?.attributes?.avatar_url : '/images/avatar.png'}
          />
          <Box className={classes.streamer_data}>
            <Box className={classes.streamer_name}>
              {t('live_stream_screen.streamer_name')}
            </Box>
            <Box className={classes.registration}>
              <Typography className={classes.register_person_label}>
                {t('live_stream_screen.register_person_label')}
              </Typography>
              <Typography className={classes.register_person_number}>
                {FormatHelper.currencyFormat('10000')}{t('common.man')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <ButtonBase onClick={() => ''} className={classes.register_channel_btn}>
          <Box>
            <Icon className={`far fa-heart ${classes.icon}`} fontSize="small" /> 
          </Box>
          <Box pl={1}>{t('live_stream_screen.channel_register')}</Box>
        </ButtonBase>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    // justifyContent: 'center',
    // maxWidth: 1100,
    width: '100%',
    flexWrap: 'wrap',
    background: '#000',
  },
  wrap_info: {
    padding: '16px 0 16px 24px',
    width: "100%"
  },
  wrap_movie_info: {
    display: 'flex',
  },
  wrap_title: {
    paddingRight: '110px',
  },
  movie_title: {
    maxWidth: '254px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
  },
  device_name: {
    fontSize: '15px',
    color: '#F7F735',
  },
  live_stream_status: {},
  wrap_interactive_info: {
    display: 'flex',
    color: '#fff',
    alignItems: 'center',
    paddingTop: '16px',
    justifyContent: "space-between", 
    width: "100%",
    paddingRight: "30px"
  },
  interactive_info: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      paddingRight: '24px',
    },
  },
  view: {},
  three_dot: {
    cursor: 'pointer',
  },
  like: {
    cursor: 'pointer',
  },
  dislike: {
    cursor: 'pointer',
  },
  shareButton: {
    '& button': {
      background: '#323234',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '4px',
      padding: '6px',
      width: '80px',
      height: '30px',
      justifyContent: 'flex-start',
    },
  },
  statusChip: {
    width: '84px',
    height: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: '2px',
    maxWidth: 'none',
    justifyContent: 'flex-start',
    '& .MuiChip-label': {
      paddingLeft: '6px',
      paddingRight: 0,
    },
  },
  icon: {},
  wrap_streamer_info: {
    height: "112px", 
    display: "flex", 
    borderTop: "1px solid #212121", 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "space-between",
  },
  streamer_info: {
    display: "flex", 
    paddingLeft: "24px", 
    alignItems: "center",
  },
  avatar: {
    marginRight: "14px", 
    width: "72px", 
    height: "72px"
  },
  streamer_data: {
    color: "#fff"
  },
  streamer_name: {
    fontSize: "18px", 
    fontWeight: "bold"
  },
  registration: {
    display: "flex", 
  },
  register_person_label: {
    paddingRight: "34px"
  },
  register_person_number: {},
  register_channel_btn: {
    background: Colors.primary,
    padding: "6px 10px", 
    borderRadius: "5px", 
    fontSize: "14px", 
    color: "#fff", 
    fontWeight: "bold", 
    marginRight: "16px", 
    alignItems: "center", 
    display: "flex"
  },
}))
export default LiveStreamContent
