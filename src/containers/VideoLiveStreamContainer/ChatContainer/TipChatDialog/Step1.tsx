import ButtonSelectMember from '@components/ButtonSelectMember'
import GiftMember from '@components/GiftMember'
import i18n from '@locales/i18n'
import { Box, ButtonBase, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
// import Loader from '@components/Loader'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { PreloadDonationInfo } from '@containers/VideoLiveStreamContainer/PreloadContainer/PreloadDonationInfo'

type Step1Props = {
  onChangeStep?: (newStep: number) => void
  onChangeSelectedMember?: (selectedMember: any) => void
  preLoading?: boolean
}

const Step1: React.FC<Step1Props> = ({ onChangeStep, onChangeSelectedMember, preLoading }) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const { videoGiftMaster, videoGiftMasterLoading } = useDetailVideo()

  const renderMember = (item, isStreamer = false) => {
    if (!item) return <Box />
    return (
      <Box className={classes.wrapStreamer}>
        <GiftMember data={item} isStreamer={isStreamer} isCutTextOverflow />
        <ButtonSelectMember
          memberId={item.id}
          onClick={() => {
            onChangeStep(2)
            onChangeSelectedMember(item)
          }}
        ></ButtonSelectMember>
      </Box>
    )
  }

  const streamerGiftData = () => {
    if (!videoGiftMaster) return null
    return {
      image: videoGiftMaster?.user_avatar,
      name: videoGiftMaster?.user_nickname,
      id: videoGiftMaster?.user_id,
    }
  }

  const giftMasterData = () =>
    (videoGiftMaster?.group_item ?? []).map((item) => ({
      ...item,
    }))

  return (
    <Box>
      <Box className={classes.wrapGiftMemberList}>
        <Box className={`scroll_common ${classes.giftMemberList}`}>
          {!preLoading ? (
            <>
              <Box className={classes.streamerTitle}>{`${i18n.t('common:live_stream_screen.streamer_title')}`}</Box>
              {renderMember(streamerGiftData(), true)}
            </>
          ) : null}

          {giftMasterData().length > 0 && !preLoading ? (
            <Box className={classes.streamerTitle}>{`${i18n.t('common:live_stream_screen.receiver_title')}`}</Box>
          ) : null}
          <Box display={'flex'} style={{ gap: '16px' }} flexDirection={'column'}>
            {videoGiftMasterLoading || preLoading ? (
              //  true
              // <Box height="100px" display="flex" justifyContent="center" alignItems="center">
              //   <Loader />
              // </Box>
              <Box className={`${classes.loadingContainer}`}>
                <PreloadDonationInfo />
                <Box>
                  <ButtonBase className={`${classes.btnChoiceMember}`}>{i18n.t('common:live_stream_screen.text_select_member')}</ButtonBase>
                </Box>
              </Box>
            ) : (
              giftMasterData().map((item) => {
                return renderMember(item)
              })
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

interface StyleProps {
  isLandscape: boolean
}

const useStyles = makeStyles((theme) => ({
  giftMemberList: {
    maxHeight: '362px',
    overflow: 'auto',
    paddingRight: 4,
    gap: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btnChoiceMember: {
    minWidth: '70px',
    height: '28px',
    borderRadius: '3px',
    background: '#767676',
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: 600,
  },
  [theme.breakpoints.down(769)]: {
    btnChoiceMember: {
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 'bold',
      minWidth: 57,
      height: 22,
    },
  },
  wrapGiftMemberList: {
    background: Colors.white_opacity[10],
    borderRadius: '5px',
    padding: '16px 0 16px 24px',
  },
  streamerTitle: {
    margin: '0px',
    flexShrink: 0,
    display: 'flex',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    border: '0px',
    fontSize: 12,
    color: '#FFFFFF',
    '&:after': {
      content: "''",
      width: '100%',
      position: 'relative',
      transform: 'translateY(50%)',
      borderTop: '1px solid #fff',
      marginLeft: '8px',
      // marginRight: '4px',
    },
  },
  wrapStreamer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  [theme.breakpoints.down(1024)]: {
    [`@media (orientation: landscape)`]: {
      giftMemberList: (props: StyleProps) => {
        if (props.isLandscape) {
          return {
            maxHeight: '92px',
          }
        } else {
          return {
            maxHeight: '362px',
          }
        }
      },
    },
  },
  [theme.breakpoints.down(769)]: {
    [`@media (orientation: landscape)`]: {
      giftMemberList: (props: StyleProps) => {
        if (props.isLandscape) {
          return {
            maxHeight: '115px',
          }
        } else {
          return {
            maxHeight: '323px',
          }
        }
      },
    },

    stepInfo: { marginTop: 8 },
    streamerTitle: {
      fontSize: '9px',
      lineHeight: '13px',
    },
    streamerName: {
      fontSize: '9px',
      lineHeight: '13px',
    },
    receiverType: {
      fontSize: '8px',
      lineHeight: '11px',
      fontWeight: 'bold',
    },
  },
}))

export default Step1
