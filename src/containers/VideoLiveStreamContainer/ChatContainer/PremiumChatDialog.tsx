import { Box, Button, makeStyles, Typography, InputAdornment, useTheme } from '@material-ui/core'
import i18n from '@locales/i18n'
import React, { useEffect, useRef, useState } from 'react'
import { purchasePoints, sanitizeMess } from './index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePurchaseTicketSuperChat from '../usePurchaseTicket'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'

type PremiumChatBoxProps = {
  handleChatInputOnFocus?: () => void
  handleChatInputOnBlur?: () => void
  onClickOutside?: () => void
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  myPoint: number
  isEnabledChat: boolean
  createMess: (message: string, point?: number) => Promise<void>
  openPurchasePointModal?: (point: any) => void
}

type PremiumMessageValidationType = {
  message: string
}

const PremiumChatBox: React.FC<PremiumChatBoxProps> = ({
  handleChatInputOnFocus,
  handleChatInputOnBlur,
  onClickOutside,
  onPressDonate,
  myPoint,
  createMess,
  openPurchasePointModal,
  isEnabledChat,
}) => {
  const getPurchasePointList = () => Object.values(purchasePoints)
  const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>('p_100')
  const [premiumChatValidationError, setPremiumChatValidationError] = useState<string>(null)
  const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  const theme = useTheme()
  const isDownMd = theme.breakpoints.down('md')

  const ref = useRef<any>()
  const premiumMessageRef = useRef<any>()

  const classes = useStyles()
  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .required(i18n.t('common:live_stream_screen.chat_premium_text_validate_msg_empty'))
      .max(
        purchasePoints[purchaseValueSelected].maxLengthInput,
        `${i18n.t('common:live_stream_screen.premium_message_too_long_pre')}${purchasePoints[purchaseValueSelected].maxLengthInput}${i18n.t(
          'common:live_stream_screen.premium_message_too_long_post'
        )}`
      )
      .trim(),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<PremiumMessageValidationType>({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.message) {
        const donatedPoint = purchasePoints[purchaseValueSelected].value
        onPressDonate(donatedPoint, sanitizeMess(values.message))
      }
    },
  })

  useEffect(() => {
    document.getElementById('premium_message').focus()
  }, [])

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200 && values.message) {
      createMess(sanitizeMess(values.message), purchasePoints[purchaseValueSelected].value)
      values.message = ''
    }
  }, [dataPurchaseTicketSuperChat])

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

  const DonatedPointItem = ({ item, isLast }) => {
    const itemSelected = item.id === purchaseValueSelected
    return (
      <Box
        onClick={() => {
          setPurchaseValueSelected(item.id)
        }}
        className={`${classes[item.id]} ${classes.purchaseItem} ${itemSelected ? '' : classes.purchaseItemUnselected}`}
        style={isLast ? {} : { marginRight: '8px' }}
      >
        <Typography className={classes.purchaseItemText}>{item.value?.toString()}</Typography>
      </Box>
    )
  }

  const handlePremiumChatClick = () => {
    if (!purchaseValueSelected) {
      setPremiumChatValidationError(i18n.t('common:live_stream_screen.chat_premium_text_validate_no_donate_selected'))
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const sanitizedContent = sanitizeHtml(content, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // })

    // Submit chat message
    setPremiumChatValidationError(null)
    handleSubmit()
  }

  return (
    <div className={classes.purchaseDialogContainer} ref={ref}>
      <Box className={classes.purchaseDialogContent}>
        <Typography className={classes.dialogTitle}>{i18n.t('common:live_stream_screen.premium_comment')}</Typography>
        <Box className={classes.purchaseCommentInputContainer}>
          <ESInput
            ref={premiumMessageRef}
            id="premium_message"
            name="message"
            multiline
            rows={5}
            placeholder={i18n.t('common:live_stream_screen.please_enter_a_comment')}
            fullWidth
            value={values.message}
            onChange={handleChange}
            classes={{
              root: classes.purchaseCommentRoot,
              input: classes.purchaseCommentInput,
              adornedEnd: classes.end,
            }}
            onFocus={handleChatInputOnFocus}
            onBlur={handleChatInputOnBlur}
            error={touched.message && !!errors?.message}
            size="big"
            endAdornment={
              <InputAdornment position="end">
                <Typography className={classes.purchaseCommentTextLimit}>
                  {`${values.message.length} / ${purchasePoints[purchaseValueSelected].maxLengthInput}`}
                </Typography>
              </InputAdornment>
            }
          />
        </Box>
        <Box className={classes.pointList}>
          <Box className={classes.pointListRow}>
            {getPurchasePointList()
              .slice(0, 4)
              .map((item, index) => (
                <DonatedPointItem key={item.id} item={item} isLast={index === 3} />
              ))}
          </Box>
          <Box className={classes.pointListRow}>
            {getPurchasePointList()
              .slice(4, 7)
              .map((item, index) => (
                <DonatedPointItem key={item.id} item={item} isLast={index === 2} />
              ))}
          </Box>
        </Box>
        <Button onClick={handlePremiumChatClick} className={classes.purchaseButton} disabled={!isEnabledChat}>
          <Typography className={classes.purchaseButtonText}>{i18n.t('common:live_stream_screen.send')}</Typography>
        </Button>
        {(premiumChatValidationError || errors.message) && (
          <Typography className={classes.premiumChatError}>{premiumChatValidationError ?? errors.message}</Typography>
        )}
        <Box className={classes.dialogFooter}>
          <Typography className={classes.totalPointText}>
            {`${i18n.t('common:live_stream_screen.owned_points')}: ${FormatHelper.currencyFormat(myPoint.toString())} ${i18n.t(
              'common:common.eXe_points'
            )}`}
          </Typography>
          <Typography
            className={classes.purchasePointText}
            onClick={() => openPurchasePointModal(purchasePoints[purchaseValueSelected].value)}
          >
            {i18n.t('common:live_stream_screen.purchase_points')}
          </Typography>
        </Box>
      </Box>
      {!isDownMd && <img src="/images/ic_down_triangle.svg" className={classes.downTriangle} />}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  end: {},
  purchaseCommentInput: {
    fontSize: '12px',
    color: '#FFFFFF',
    '&::placeholder': {
      color: '#FFFFFF',
      opacity: 1,
    },
  },
  purchaseCommentRoot: {
    backgroundColor: '#212121',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: Colors.white_opacity['30'],
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        padding: 0,
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      padding: 0,
      paddingBottom: theme.spacing(1),
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
    '& .MuiInputAdornment-root ': {
      position: 'absolute',
      bottom: 6,
      right: 14,
      alignItems: 'flex-end',
    },
    '& .MuiOutlinedInput-inputMultiline': {
      marginBottom: '14px',
    },
  },
  purchasePointText: {
    fontSize: 10,
    textDecoration: 'underline',
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  totalPointText: {
    fontSize: 10,
    color: '#FFFFFF',
    whiteSpace: 'pre',
  },
  dialogFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  premiumChatError: {
    marginTop: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#F7F735',
  },
  purchaseButton: {
    backgroundColor: '#FF4786',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  purchaseItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  purchaseItem: {
    height: 28,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  purchaseItemUnselected: {
    backgroundColor: 'transparent !important',
  },
  pointList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  },
  pointListRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  purchaseDialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  purchaseCommentTextLimit: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  purchaseDialogContent: {
    padding: '16px',
    backgroundColor: '#4D4D4D',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  downTriangle: {
    width: '20px',
    height: '14px',
    marginLeft: '10px',
    marginTop: '-2px',
  },
  dialogTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  purchaseCommentInputContainer: {
    width: '100%',
    marginTop: '10px',
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRadius: '4px',
  },
  ...purchasePoints,
  [theme.breakpoints.down(769)]: {
    purchaseDialogContainer: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 5,
      marginBottom: 0,
    },
  },
}))

export default PremiumChatBox
