import GiftMember from '@components/GiftMember'
import i18n from '@locales/i18n'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useContext, useRef } from 'react'
import TipButtonGroup from './TipButtonGroup'
import { sanitizeMess } from '../index'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'

type Step3Props = {
  onChangeStep?: (newStep: number) => void
  selectedMember?: any
  tipInfo: any
  errorMsgDonatePoint?: string
  createMessAfterDonate: any
}

const Step3: React.FC<Step3Props> = ({ tipInfo, onChangeStep, selectedMember, errorMsgDonatePoint, createMessAfterDonate }) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const { confirmDonatePointRef } = useContext(VideoContext)

  const canDonateRef = useRef<boolean>(true)

  const onCancel = () => {
    onChangeStep(2)
  }
  const onClick = () => {
    if (!canDonateRef.current) {
      return
    }
    if (confirmDonatePointRef.current) {
      if (selectedMember?.master_uuid) {
        // tip for member in list gift
        confirmDonatePointRef.current(
          tipInfo?.donatedPoint,
          sanitizeMess(tipInfo?.message),
          selectedMember.master_uuid,
          createMessAfterDonate
        )
      } else {
        // tip for streamer
        confirmDonatePointRef.current(tipInfo?.donatedPoint, sanitizeMess(tipInfo?.message), undefined, createMessAfterDonate)
      }
    }
    canDonateRef.current = false
    setTimeout(() => {
      canDonateRef.current = true
    }, 1000)
  }

  return (
    <Box className={classes.container}>
      <Box>
        <Box pl={'12px'}>
          <GiftMember data={selectedMember} />
        </Box>
        <Box pl={'22px'}>
          <Box className={classes.selectedPoint}>
            {`${i18n.t('common:live_stream_screen.point_to_donate')}:${FormatHelper.currencyFormat(
              tipInfo?.donatedPoint?.toString()
            )}${i18n.t('common:donate_points.step_one_points')}`}
          </Box>
          <Box className={classes.wrapMessage} style={{ padding: tipInfo?.message ? '38px 7px' : '28px 7px' }}>
            <Box className={`${classes.message} ${tipInfo?.message ? '' : classes.noMessage}`}>
              {tipInfo?.message || `${i18n.t('common:live_stream_screen.no_mess')}`}
            </Box>
          </Box>

          <Box mt={'11px'}>
            <TipButtonGroup
              onClick={onClick}
              onCancel={onCancel}
              textAgree={`${i18n.t('common:live_stream_screen_chat.send')}`}
            ></TipButtonGroup>
          </Box>
          {!!errorMsgDonatePoint && (
            <Box className={classes.errorMessage}>
              <Typography>{errorMsgDonatePoint}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

interface StyleProps {
  isLandscape: boolean
}

const useStyles = makeStyles((theme) => ({
  container: { background: `${Colors.white_opacity[10]}`, borderRadius: '5px', padding: '11px 22px 16px 0' },
  selectedPoint: {
    marginTop: '21px',
    background: '#000000',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: Colors.white_opacity[70],
    fontSize: '12px',
    fontWeight: 500,
  },
  wrapMessage: {
    marginTop: '11px',
    background: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: Colors.white_opacity[70],
    fontSize: '12px',
    fontWeight: 500,
  },
  message: {
    maxHeight: 68,
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    width: '100%',
    '&$noMessage': {
      textAlign: 'center',
    },
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222222',
      borderRadius: 6,
    },
  },
  noMessage: {},
  errorMessage: {
    color: '#F7F735',
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  },
  [theme.breakpoints.down(769)]: {
    selectedPoint: {
      fontSize: '10px',
    },
    message: {
      fontSize: '10px',
    },
    [`@media (orientation: landscape)`]: {
      container: (props: StyleProps) => {
        if (props.isLandscape) {
          return {
            maxHeight: 160,
            overflow: 'auto',
          }
        }
      },
    },
  },
}))

export default Step3
