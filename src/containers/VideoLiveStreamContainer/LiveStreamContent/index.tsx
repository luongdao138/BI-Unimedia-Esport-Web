import { Box, Typography, makeStyles, Icon, ButtonBase } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
// import ESButton from '@components/Button'

const LiveStreamContent: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
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
          <Typography className={classes.view}>
            <Icon className={`fa fa-eye ${classes.icon}`} fontSize="small" /> 10000
          </Typography>
          <Typography className={classes.like}>
            <Icon className={`fa fa-thumbs-up ${classes.icon}`} fontSize="small" /> 10{t('common.ten_thousand')}
          </Typography>
          <Typography className={classes.dislike}>
            <Icon className={`fa fa-thumbs-down ${classes.icon}`} fontSize="small" /> 10{t('common.ten_thousand')}
          </Typography>
          <Box className={classes.shareButton}>
            <ButtonBase onClick={() => ''}>
              <Icon className={`fa fa-share-alt ${classes.icon}`} fontSize="small" /> {t('live_stream_screen.share_btn')}
            </ButtonBase>
            {/* <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="small" onClick={() => ('')}>
              {t('live_stream_screen.share_btn')}
            </ESButton> */}
          </Box>
        </Box>
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
    padding: '21px 0 16px 24px',
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
    '& > p': {
      paddingRight: '24px',
    },
  },
  view: {},
  like: {},
  dislike: {},
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
  cancelBtn: {},
}))
export default LiveStreamContent
