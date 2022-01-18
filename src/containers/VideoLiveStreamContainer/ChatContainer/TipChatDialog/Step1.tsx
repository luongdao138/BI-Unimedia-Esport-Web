import ButtonSelectMember from '@components/ButtonSelectMember'
import GiftMember from '@components/GiftMember'
import i18n from '@locales/i18n'
import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'

type Step1Props = {
  onChangeStep?: (newStep: number) => void
  onChangeSelectedMember?: (selectedMember: any) => void
}

const Step1: React.FC<Step1Props> = ({ onChangeStep, onChangeSelectedMember }) => {
  const classes = useStyles()

  const members = Array(9)
    .fill('')
    .map((_, key) => {
      return {
        key: key,
        src: 'https://s3-ap-northeast-1.amazonaws.com/cowell-dev-avatar-media/users/cover/366/1632934543-366.jpg',
        name: 'user ' + key,
        receiverType: i18n.t('common:live_stream_screen.team_receiver_type'),
      }
    })

  const renderMember = (item, isStreamer = false) => {
    return (
      <Box className={classes.wrapStreamer}>
        <GiftMember data={item} isStreamer={isStreamer} />
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

  return (
    <Box>
      <Box className={classes.wrapGiftMemberList}>
        <Box className={`scroll_common ${classes.giftMemberList}`}>
          <Box className={classes.streamerTitle}>{`${i18n.t('common:live_stream_screen.streamer_title')}`}</Box>
          {renderMember(members[0], true)}
          <Box className={classes.streamerTitle}>{`${i18n.t('common:live_stream_screen.receiver_title')}`}</Box>
          <Box display={'flex'} style={{ gap: '16px' }} flexDirection={'column'}>
            {members.map((item) => {
              return renderMember(item)
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  giftMemberList: { maxHeight: '421px', overflow: 'auto', paddingRight: 4, gap: '8px', display: 'flex', flexDirection: 'column' },
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
    color: '#fff',
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
  [theme.breakpoints.down(769)]: {
    giftMemberList: { maxHeight: 323 },
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
