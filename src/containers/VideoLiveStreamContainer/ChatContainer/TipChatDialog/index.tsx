import usePointsManage from '@containers/PointManage/usePointsManage'
import i18n from '@locales/i18n'
import { Box, makeStyles, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { purchasePoints } from './index'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Icon from '@material-ui/core/Icon'
// import * as commonActions from '@store/common/actions'
// import { useAppDispatch } from '@store/hooks'

type TipChatDialogProps = {
  openPurchasePointModal?: (point: any) => void
  onClickOutside?: () => void
  onPressDonate?: (donatedPoint: number, purchaseComment: string, master_id?: string) => void
  normalMessHasError?: boolean
  createMess: (message: string, point?: number) => Promise<void>
}

const TipChatDialog: React.FC<TipChatDialogProps> = ({ onPressDonate, onClickOutside, normalMessHasError, openPurchasePointModal }) => {
  // const dispatch = useAppDispatch()

  const { myPointsData } = usePointsManage()
  // const getPurchasePointList = () => Object.values(purchasePoints)
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0
  const totalSteps = 3
  const [step, setStep] = useState(1)
  const [selectedMember, setSelectedMember] = useState(null)
  const [tipInfo, setTipInfo] = useState(null)
  // const onChangeStep = (new_step: number): void => {
  //   setStep(new_step)
  // }
  const onChangeStep = (newStep): void => {
    // dispatch(commonActions.addToast('success'))
    setStep(newStep)
  }

  const onChangeTipInfo = (tipInfo): void => {
    setTipInfo(tipInfo)
    // openPurchasePointModal(tipInfo?.donatedPoint)
  }

  const onChangeSelectedMember = (selectedMember = null): void => {
    setSelectedMember(selectedMember)
  }
  // eslint-disable-next-line no-console
  console.log('🚀 ~ onChangeStep ~ onChangeStep', onChangeStep)

  // const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>('p_100')
  // const [premiumChatValidationError, setPremiumChatValidationError] = useState<string>(null)
  // const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))

  const ref = useRef<any>()

  const classes = useStyles()

  useEffect(() => {
    if (onClickOutside) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  const excludeItemTriggeredHideDialog = ['btnOpenPremiumChatDialogImage', 'btnOpenPremiumChatDialog']

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickOutside = (event) => {
    if (excludeItemTriggeredHideDialog.includes(event.target.id)) {
      return
    }
    if (ref && !ref.current.contains(event.target)) {
      onClickOutside()
    }
  }

  const commonStepProps = {
    onChangeStep,
    selectedMember,
    onPressDonate,
  }

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <Step1 {...commonStepProps} onChangeSelectedMember={onChangeSelectedMember} />
      case 2:
        return <Step2 {...commonStepProps} onChangeTipInfo={onChangeTipInfo} />
      case 3:
        return <Step3 {...commonStepProps} tipInfo={tipInfo} />
      default:
        return null
    }
  }

  const style = {}

  const CustomTooltip = withStyles({
    tooltip: {
      margin: '14px 20px 14px 0',
      padding: '16px 16px 36px 16px',
      background: '#0A0A0A',
      maxWidth: '451px',
      color: '#fff',
      fontSize: '10px',
      filter: `drop-shadow(0px 0px 5px ${Colors.white_opacity[50]})`,
      borderRadius: '17px',
      whiteSpace: 'pre-line',
      ...style,
      [theme.breakpoints.down(769)]: {
        margin: '14px 20px 14px 15px',
        maxWidth: 'none',
      },
    },
    arrow: {
      color: '#0A0A0A !important',
      [theme.breakpoints.down(769)]: {
        marginLeft: '-25px !important',
      },
    },
  })(Tooltip)

  const renderMoreInfo = useMemo(() => {
    return (
      <Box flexDirection="row" display="flex" className={classes.moreInfo}>
        <CustomTooltip
          title={i18n.t('common:live_stream_screen.tooltip_tip')}
          arrow
          placement="bottom"
          enterTouchDelay={0}
          // open={true}
          // open={false}
        >
          <img src="/images/more_info.svg" />
        </CustomTooltip>
        <Typography className={classes.textMoreInfo}>{`${i18n.t('common:live_stream_screen.text_more_info')}`}</Typography>
      </Box>
    )
  }, [totalSteps])

  return (
    <div className={classes.tipChatDialogContainer} ref={ref} style={{ bottom: isMobile ? 80 : normalMessHasError ? 116 : 105 }}>
      <Box className={classes.wrapTitle}>
        <Box className={classes.closeButton} onClick={onClickOutside}>
          <Icon className={`fa fa-times`} fontSize="small" />
        </Box>
        <Typography className={classes.titleDialog}>{`${i18n.t('common:live_stream_screen.tip_title_dialog')}`}</Typography>
        {renderMoreInfo}
      </Box>
      {step === 1 && (
        <Box pt={2}>
          <Typography className={classes.textPleaseSelect}>{`${i18n.t('common:live_stream_screen.please_select_member')}`}</Typography>
        </Box>
      )}
      <Box className={classes.wrapPointInfo} pt={2}>
        <Typography className={classes.textMyPoint}>
          {`${i18n.t('common:donate_points.title_donate_point')}:${FormatHelper.currencyFormat(myPoint.toString())} ${i18n.t(
            'common:donate_points.step_one_points'
          )}`}
        </Typography>
        <Typography className={classes.purchasePointText} onClick={() => openPurchasePointModal(0)}>
          {`${i18n.t('common:live_stream_screen.purchase_tip_point')}`}
        </Typography>
      </Box>

      {renderSteps()}
      <Box className={classes.stepInfo} component="span">
        <span className={classes.currentStep}>{`${step}`}</span>
        <span className={classes.totalSteps}>{` / ${totalSteps}`}</span>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapTitle: { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  titleDialog: { lineHeight: '21px', fontSize: 16, color: '#fff', fontWeight: 400 },
  moreInfo: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
  },
  closeButton: {
    position: 'absolute',
    left: 8,
  },
  textMoreInfo: { fontSize: '10px', color: '#ffff00', marginLeft: 4 },
  textPleaseSelect: { lineHeight: '16px', fontSize: '12px', color: '#fff', fontWeight: 400, textAlign: 'center' },
  wrapPointInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textMyPoint: {
    fontSize: 12,
    color: Colors.white_opacity[70],
  },
  purchasePointText: {
    fontSize: 12,
    textDecoration: 'underline',
    cursor: 'pointer',
    marginBottom: '14px',
    color: Colors.white_opacity[70],
  },
  tipChatDialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0',
    right: '0',
    zIndex: 4,
    margin: '0 16px 13px 16px',
    padding: '13px 8px 13px',
    background: '#161616',
    borderRadius: '8px',
    filter: `drop-shadow(0px 0px 8px ${Colors.black_opacity[80]})`,
  },
  stepInfo: {
    textAlign: 'right',
    marginTop: '13px',
  },
  currentStep: { fontSize: '14px', color: '#fff' },
  totalSteps: { fontSize: '10px', color: Colors.white_opacity[70] },
  [theme.breakpoints.down(769)]: {
    tipChatDialogContainer: {
      position: 'fixed',
      margin: '0 8px',
      zIndex: 30,
      paddingBottom: 8,
    },
    titleDialog: {
      fontSize: '13px',
      lineHeight: '18px',
    },
    textMoreInfo: {
      fontSize: '8px',
    },
    textPleaseSelect: { fontSize: '9px', lineHeight: '13px' },
    textMyPoint: { fontSize: '9px', lineHeight: '13px' },
    purchasePointText: { fontSize: '9px', lineHeight: '13px', marginBottom: 8 },
  },
}))

export default TipChatDialog
