import { Box, Typography, makeStyles, Icon, ButtonBase, useTheme, useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import userProfileStore from '@store/userProfile'
import ESAvatar from '@components/Avatar'
import { useAppSelector } from '@store/hooks'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useState } from 'react'
import ButtonPrimary from '@components/ButtonPrimary'
import ESMenuItem from '@components/Menu/MenuItem'
// import ESButton from '@components/Button'
// import { Player, ControlBar } from 'video-react';
// import { useRef } from 'react'

interface LiveStreamContentProps {
  userHasViewingTicket?: boolean
}

const LiveStreamContent: React.FC<LiveStreamContentProps> = (props) => {
  const [showReportMenu, setShowReportMenu] = useState<boolean>(false)

  const { t } = useTranslation('common')
  const classes = useStyles()
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const registerChannelButton = () => (
    <ButtonBase onClick={() => ''} className={classes.register_channel_btn}>
      <Box>
        <Icon className={`far fa-heart ${classes.icon}`} fontSize="small" />
      </Box>
      <Box pl={1}>{t('live_stream_screen.channel_register')}</Box>
    </ButtonBase>
  )

  const shareButton = () => (
    <Box className={classes.shareButton}>
      <ButtonBase onClick={() => ''}>
        <Icon className={`fa fa-share-alt ${classes.icon}`} fontSize="small" />
        <Box pl={1}>{t('live_stream_screen.share_btn')}</Box>
      </ButtonBase>
    </Box>
  )

  const mobileRegisterChannelContainer = () => (
    <Box className={classes.mobileRegisterChannelContainer}>
      <ESAvatar className={classes.smallAvatar} src={'/images/avatar.png'} />
      <Typography className={classes.channelName}>{'配信者の名前がはいります'}</Typography>
      {registerChannelButton()}
    </Box>
  )

  const mediaPlayer = () => <img src="/images/live_stream/live_stream.png" height={isMobile ? '256px' : '448px'} width="100%" />

  const mediaOverlayPurchaseTicketView = () => {
    const buyTicketPrice = 2500
    return (
      <Box className={classes.overlayPurchaseContainer}>
        <ButtonPrimary className={classes.buyTicketButton}>{t('live_stream_screen.buy_ticket')}</ButtonPrimary>
        <Typography className={classes.buyTicketAmount}>{`${FormatHelper.currencyFormat(
          buyTicketPrice.toString()
        )} eXeポイント`}</Typography>
        <Typography className={classes.buyTicketNote}>{t('live_stream_screen.purchase_ticket_note')}</Typography>
      </Box>
    )
  }

  const userHasViewingTicket = () => props?.userHasViewingTicket
  return (
    <Box className={classes.container}>
      <Box className={classes.mediaPlayerContainer}>
        {mediaPlayer()}
        {!userHasViewingTicket() && mediaOverlayPurchaseTicketView()}
      </Box>
      {/* <Player
          ref={player}
          autoPlay
        >
          <source src={'http://media.w3.org/2010/05/sintel/trailer.mp4'} />
          <ControlBar autoHide={false} />
        </Player> */}
      {isMobile && mobileRegisterChannelContainer()}
      <Box className={classes.wrap_info}>
        <Box className={classes.wrap_movie_info}>
          <Box className={classes.wrap_title}>
            <Typography className={classes.movie_title}>ムービータイトルムービータイトル…</Typography>
            <Typography className={classes.device_name}>APEX Legends(PC&Console)</Typography>
          </Box>
          {!isMobile ? (
            <Box className={classes.live_stream_status}>
              <ESChip
                color={'primary'}
                className={classes.statusChip}
                label={t('live_stream_screen.live_stream_status')}
                onClick={() => ''}
              />
            </Box>
          ) : (
            shareButton()
          )}
        </Box>

        <Box className={classes.wrap_interactive_info}>
          <Box className={classes.interactive_info}>
            <Typography className={classes.view}>
              <Icon className={`fa fa-eye ${classes.icon}`} fontSize="small" /> {FormatHelper.japaneseWanFormatter(12000)}
            </Typography>
            <Typography className={classes.like}>
              <Icon className={`fa fa-thumbs-up ${classes.icon}`} fontSize="small" /> {FormatHelper.japaneseWanFormatter(121231000)}
            </Typography>
            <Typography className={classes.dislike}>
              <Icon className={`fa fa-thumbs-down ${classes.icon}`} fontSize="small" /> {FormatHelper.japaneseWanFormatter(100)}
            </Typography>
            {!isMobile && shareButton()}
          </Box>
          {!isMobile && (
            <Box className={classes.dropDownMenu}>
              <Typography
                onClick={() => {
                  setShowReportMenu(true)
                }}
                className={classes.three_dot}
              >
                <Icon className={`fa fa-ellipsis-v ${classes.icon}`} fontSize="small" />
              </Typography>
              {showReportMenu && (
                <Box className={`${classes.dropDownContent} MuiPaper-elevation8 MuiPaper-rounded`}>
                  <ESMenuItem
                    onClick={() => {
                      setShowReportMenu(false)
                    }}
                  >
                    {t('live_stream_screen.report')}
                  </ESMenuItem>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      {!isMobile && (
        <Box className={classes.wrap_streamer_info}>
          <Box className={classes.streamer_info}>
            <ESAvatar
              className={classes.avatar}
              alt={userProfile?.attributes?.nickname}
              src={userProfile ? userProfile?.attributes?.avatar_url : '/images/avatar.png'}
            />
            <Box className={classes.streamer_data}>
              <Box className={classes.streamer_name}>{t('live_stream_screen.streamer_name')}</Box>
              <Box className={classes.registration}>
                <Typography className={classes.register_person_label}>{t('live_stream_screen.register_person_label')}</Typography>
                <Typography className={classes.register_person_number}>
                  {FormatHelper.japaneseWanFormatter(123456)}
                  {t('common.man')}
                </Typography>
              </Box>
            </Box>
          </Box>
          {registerChannelButton()}
        </Box>
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // justifyContent: 'center',
    // maxWidth: 1100,
    width: '100%',
    flexWrap: 'wrap',
    background: '#000000',
  },
  dropDownMenu: {
    position: 'relative',
    display: 'inline-block',
  },
  dropDownContent: {
    overflow: 'hidden',
    position: 'absolute',
    background: 'white',
    right: 0,
    willChange: 'all',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: 'auto',
    visiblity: 'visible',
    opocity: 1,
    transition: 'all 0.5s ease',
    height: 'auto',
    display: 'block',
  },
  mediaPlayerContainer: {
    width: '100%',
    position: 'relative',
  },
  buyTicketAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '16px',
  },
  buyTicketNote: {
    marginTop: '35px',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F7F735',
    marginBottom: '91px',
  },
  buyTicketButton: {
    '&.MuiButtonBase-root.button-primary': {
      paddingLeft: '62px',
      paddingRight: '62px',
      height: '50px',
    },
  },
  overlayPurchaseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(4, 4, 4, 0.71)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  wrap_info: {
    padding: '16px 0 16px 24px',
    width: '100%',
  },
  wrap_movie_info: {
    display: 'flex',
    width: '100%',
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
    color: '#FFFFFF',
  },
  device_name: {
    fontSize: '15px',
    color: '#F7F735',
  },
  live_stream_status: {},
  wrap_interactive_info: {
    display: 'flex',
    color: '#FFFFFF',
    alignItems: 'center',
    paddingTop: '16px',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '30px',
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
      color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    height: '112px',
    display: 'flex',
    borderTop: '1px solid #212121',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streamer_info: {
    display: 'flex',
    paddingLeft: '24px',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '14px',
    width: '72px',
    height: '72px',
  },
  streamer_data: {
    color: '#FFFFFF',
  },
  streamer_name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  registration: {
    display: 'flex',
  },
  register_person_label: {
    paddingRight: '34px',
  },
  register_person_number: {},
  register_channel_btn: {
    background: Colors.primary,
    padding: '6px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: '16px',
    alignItems: 'center',
    display: 'flex',
  },
  [theme.breakpoints.down(768)]: {
    movie_title: {
      fontSize: '12px',
      maxWidth: '200px',
    },
    device_name: {
      fontSize: '8px',
    },
    shareButton: {
      '& button': {
        marginRight: '8px',
        width: '100px',
      },
    },
    wrap_title: {
      paddingRight: 0,
      flex: 1,
    },
    mobileRegisterChannelContainer: {
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: '24px',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    register_channel_btn: {
      padding: '1px 8px',
      marginRight: '8px',
    },
    icon: {
      marginRight: '11px',
    },
    smallAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: '12px',
    },
    channelName: {
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
      marginLeft: '20px',
      marginRight: '20px',
    },
    buyTicketNote: {
      marginBottom: '52px',
    },
  },
}))
export default LiveStreamContent
