import GiftMember from '@components/GiftMember'
import i18n from '@locales/i18n'
import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'
import TipButtonGroup from './TipButtonGroup'

type Step3Props = {
  onChangeStep?: (newStep: number) => void
  selectedMember?: any
  tipInfo: any
}

const Step3: React.FC<Step3Props> = ({ tipInfo, onChangeStep, selectedMember }) => {
  const classes = useStyles()

  const onCancel = () => {
    onChangeStep(2)
  }
  const onClick = () => {
    onChangeStep(2)
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
            <Box className={classes.message}>{tipInfo?.message || `${i18n.t('common:live_stream_screen.no_mess')}`}</Box>
          </Box>

          <Box mt={'11px'}>
            <TipButtonGroup
              onClick={onClick}
              onCancel={onCancel}
              textAgree={`${i18n.t('common:live_stream_screen_chat.send')}`}
            ></TipButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  )
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
  },
  [theme.breakpoints.down(769)]: {
    selectedPoint: {
      fontSize: '10px',
    },
    message: {
      fontSize: '10px',
    },
  },
}))

export default Step3
