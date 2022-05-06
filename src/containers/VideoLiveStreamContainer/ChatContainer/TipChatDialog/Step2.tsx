import GiftMember from '@components/GiftMember'
import i18n from '@locales/i18n'
import { Box, InputAdornment, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { useFormik } from 'formik'
import React, { useRef, useEffect } from 'react'
// import * as Yup from 'yup'
import { purchasePoints, sanitizeMess } from '..'
import FastChatInput from '../FastChatInput'
import TipButtonGroup from './TipButtonGroup'

type Step2Props = {
  onChangeTipInfo?: (tipInfo: any) => void
  onChangeStep?: (newStep: number) => void
  selectedMember?: any
  tipInfo?: any
  purchaseValueSelected: string
  onChangePurchaseValueSelected: (id: string) => void
  isNoHaveListUsers?: boolean
  preLoading?: boolean
}

const Step2: React.FC<Step2Props> = ({
  onChangeStep,
  selectedMember,
  onChangeTipInfo,
  tipInfo,
  purchaseValueSelected,
  onChangePurchaseValueSelected,
  isNoHaveListUsers,
  preLoading,
}) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const getPurchasePointList = () => Object.values(purchasePoints)
  const commentRef = useRef<string>(tipInfo?.message || '')
  // const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>('p_100')

  const premiumMessageRef = useRef<any>()

  const DonatedPointItem = ({ item, isLast }) => {
    const itemSelected = item.id === purchaseValueSelected
    return (
      <Box
        onClick={() => {
          onChangePurchaseValueSelected(item.id)
          // setPurchaseValueSelected(item.id)
        }}
        className={`${classes[item.id]} ${classes.purchaseItem} ${itemSelected ? classes.purchaseItemSelected : ''}`}
        style={isLast ? {} : { marginRight: '12px' }}
      >
        <Typography className={classes.purchaseItemText} style={{ color: itemSelected ? item.backgroundColor : '#FFFFFF' }}>
          {FormatHelper.currencyFormat(item?.value?.toString())}
        </Typography>
      </Box>
    )
  }

  // const validationSchema = Yup.object().shape({
  //   message: Yup.string()
  //     .max(
  //       purchasePoints[purchaseValueSelected].maxLengthInput,
  //       `${i18n.t('common:live_stream_screen.premium_message_too_long_pre')}${purchasePoints[purchaseValueSelected].maxLengthInput}${i18n.t(
  //         'common:live_stream_screen.premium_message_too_long_post'
  //       )}`
  //     )
  //     .trim(),
  // })
  const { handleChange, values, handleSubmit, errors, touched, setValues, setFieldValue } = useFormik({
    initialValues: {
      message: tipInfo?.message || '',
    },
    // validationSchema,
    onSubmit: (values) => {
      if (!formHasError) {
        const donatedPoint = purchasePoints[purchaseValueSelected].value

        // onPressDonate(donatedPoint, sanitizeMess(values.message))
        onChangeTipInfo({ donatedPoint, message: sanitizeMess(values.message || commentRef.current) })
        onChangeStep(3)
      }
    },
  })
  564
  const formHasError = values.message.length > purchasePoints[purchaseValueSelected].maxLengthInput

  const handlePremiumChatClick = async () => {
    // if (!purchaseValueSelected) {
    //   setPremiumChatValidationError(i18n.t('common:live_stream_screen.chat_premium_text_validate_no_donate_selected'))
    //   return
    // }
    // // Submit chat message
    // setPremiumChatValidationError(null)
    await setFieldValue('message', commentRef.current)
    handleSubmit()
  }

  const onCancel = () => {
    onChangeStep(1)
  }

  const characterLimitExceed = () => {
    const limit = purchasePoints[purchaseValueSelected].maxLengthInput
    return i18n.t('common:live_stream_screen.tip_message_limit').replace('%d', limit)
  }

  useEffect(() => {
    setValues({ message: tipInfo?.message || '' })
  }, [])

  if (preLoading) {
    return <p>Loading...</p>
  }

  return (
    <Box>
      <Box className={classes.dialogPanel}>
        <Box className={`${classes.selectedMemberInfo}`}>
          <GiftMember data={selectedMember} />
        </Box>
        <Box className={classes.pointList} mt={2}>
          <Box className={`${classes.pointListRow} ${classes.pointListFirstRow}`}>
            {getPurchasePointList()
              .slice(0, 4)
              .map((item, index) => (
                <DonatedPointItem key={item.id} item={item} isLast={index === 3} />
              ))}
          </Box>
          <Box className={`${classes.pointListRow}`}>
            {getPurchasePointList()
              .slice(4, 7)
              .map((item, index) => (
                <DonatedPointItem key={item.id} item={item} isLast={index === 2} />
              ))}
          </Box>
          <Box className={classes.purchaseCommentInputContainer}>
            <FastChatInput
              ref={premiumMessageRef}
              id="premium_message"
              name="message"
              multiline
              rows={5}
              placeholder={i18n.t('common:live_stream_screen.place_holder_tip')}
              fullWidth
              classes={{
                root: classes.purchaseCommentRoot,
                input: classes.purchaseCommentInput,
                adornedEnd: classes.end,
              }}
              initialValue={tipInfo?.message || values.message}
              error={touched.message && !!errors?.message}
              size="big"
              endAdornment={
                <InputAdornment position="end">
                  <Typography className={`${classes.purchaseCommentTextLimit} ${formHasError ? 'formHasError' : ''}`}>
                    {`${values.message.length} / ${purchasePoints[purchaseValueSelected].maxLengthInput}`}
                  </Typography>
                </InputAdornment>
              }
              onChange={handleChange}
              valueRef={commentRef}
            />
          </Box>
          <Box mt={2} display="flex" flexDirection="column">
            {formHasError && <Typography className={classes.characterLimitError}>{characterLimitExceed()}</Typography>}
            <TipButtonGroup
              onClick={handlePremiumChatClick}
              onCancel={onCancel}
              formHasError={formHasError}
              isNoHaveListUsers={isNoHaveListUsers}
            ></TipButtonGroup>
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
  dialogPanel: { background: `${Colors.white_opacity[10]}`, borderRadius: '5px', padding: '8px 20px 20px 30px' },
  selectedMemberInfo: {},
  end: {},
  purchaseCommentInput: {
    fontSize: '12px',
    color: Colors.white_opacity[87],
    '&::placeholder': {
      color: Colors.white_opacity[30],
      opacity: 1,
    },
    maxHeight: 'calc(100vh - 495px)',
    // maxHeight: '83px',
  },
  [theme.breakpoints.up(769)]: {
    purchaseCommentInput: {
      maxHeight: 'calc(100vh - 580px)',
    },
  },
  [theme.breakpoints.down(769)]: {
    [`@media (orientation: landscape)`]: {
      purchaseCommentInput: (props: StyleProps) => {
        if (props.isLandscape) {
          return {
            maxHeight: '83px',
            height: 'unset',
          }
        } else {
          return {
            height: '83px',
          }
        }
      },
    },
  },
  purchaseCommentRoot: {
    backgroundColor: '#212121',
    padding: '9px 9px 13px !important',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
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
      bottom: 12,
      right: 9,
      alignItems: 'flex-end',
    },
    '& .MuiOutlinedInput-inputMultiline': {
      marginBottom: '16px',
    },
  },
  pointList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  pointListRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  purchaseItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: '20px',
  },
  purchaseItem: {
    height: 32,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pointListFirstRow: {
    '& $purchaseItem': {
      height: 24,
    },
  },
  purchaseItemSelected: {
    backgroundColor: '#fff !important',
    borderColor: 'transparent !important',
  },
  ...purchasePoints,
  purchaseCommentTextLimit: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: Colors.white_opacity['30'],
    lineHeight: '16px',
    '&.formHasError': {
      color: '#FFFF00',
    },
  },
  characterLimitError: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#F7F735',
    lineHeight: '18px',
    alignSelf: 'center',
    marginBottom: '15px',
  },
  purchaseCommentInputContainer: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRadius: '4px',
  },
  [theme.breakpoints.down(769)]: {
    purchaseItem: {
      height: 22,
    },
    pointListFirstRow: {
      '& $purchaseItem': {
        height: 17,
      },
    },
    purchaseItemText: {
      fontSize: '10px',
      lineHeight: '13px',
    },
    [`@media (orientation: landscape)`]: {
      dialogPanel: (props: StyleProps) => {
        if (props.isLandscape) {
          return {
            padding: 16,
            maxHeight: 160,
            overflow: 'auto',
          }
        } else {
          return {
            padding: 16,
          }
        }
      },
    },
  },
}))

export default Step2
