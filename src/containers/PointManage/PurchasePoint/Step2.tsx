import { Box, Typography, makeStyles, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import ButtonPrimary from '@components/ButtonPrimary'
import ESInput from '@components/Input'
import ESSwitchIOS from '@components/Switch'
import ESButton from '@components/Button'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { calValueFromTax, formatCardNumber, detectCardType } from '@utils/helpers/CommonHelper'
import { CardAddParams } from '@services/purchasePoints.service'
import Radio from '@material-ui/core/Radio'
import { RadioProps } from '@material-ui/core/Radio'
import usePurchasePointData from './usePurchasePointData'
import PointPurchaseConfirmModal from './PointPurchaseConfirmModal'
import CardDeleteConfirmModal from './CardDeleteConfirmModal'
import ESLoader from '@components/FullScreenLoader'
import { validationPurchasePointScheme } from './ValidationPurchasePointScheme'
import _ from 'lodash'
interface Step2Props {
  selectedPoint: any
}

const Step2: React.FC<Step2Props> = ({ selectedPoint }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const {
    metaSavedCardsMeta,
    deleteSavedCard,
    metaDeleteCardMeta,
    purchasePointUseNewCard,
    purchasePointUseOldCard,
    purchasePointInfo,
    metaPurchaseUseNewCardMeta,
    metaPurchaseUseOldCardMeta,
    resetErrorMess,
  } = usePurchasePointData()

  const [selectedCardId, setSelectedCardId] = React.useState<any>('')
  const [isShowPurchasePointModal, setIsShowPurchasePointModal] = useState(false)
  const [isShowDeleteCardModal, setIsShowDeleteCardModal] = useState(false)
  const [isPurchasingPoint, setIsPurchasingPoint] = useState(false)
  const [deletedCard, setDeletedCard] = useState({})
  // const [deletedCard, setDeletedCard] = useState({card_number: '1234'})
  const [hasError, setHasError] = useState(false)

  const closeModalPurchasePoint = () => {
    setIsPurchasingPoint(false)
    setIsShowPurchasePointModal(false)
  }

  useEffect(() => {
    if (metaDeleteCardMeta.loaded) {
      setIsShowDeleteCardModal(false)
    }
    if (metaDeleteCardMeta.error) {
      setHasError(true)
    }
  }, [metaDeleteCardMeta])

  useEffect(() => {
    if (purchasePointInfo.purchase_success) {
      closeModalPurchasePoint()
    }
  }, [purchasePointInfo.purchase_success])

  useEffect(() => {
    if (metaPurchaseUseOldCardMeta.error || metaPurchaseUseNewCardMeta.error) {
      setIsPurchasingPoint(false)
      setHasError(true)
    }
  }, [metaPurchaseUseNewCardMeta, metaPurchaseUseOldCardMeta])

  const isLoading =
    metaDeleteCardMeta.pending || isPurchasingPoint || metaPurchaseUseNewCardMeta.pending || metaPurchaseUseOldCardMeta.pending

  const initialValues = {
    card_name: '',
    card_number: '',
    card_expire_date: '',
    card_cvc: '',
    is_saved_card: false,
    // card_name: 'DANG THANH SON', card_number: '371449635398433',
    // card_expire_date: '2112', card_cvc: '1405',
    // is_saved_card: true
  }

  const formik = useFormik<CardAddParams>({
    initialValues: { ...initialValues },
    validationSchema: validationPurchasePointScheme(),
    onSubmit: () => {
      // onSubmitClicked(values)
    },
  })
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, resetForm, validateForm } = formik

  const isExceedCard = purchasePointInfo.saved_cards.length >= 5 && values.is_saved_card

  useEffect(() => {
    validateForm()
  }, [])

  const confirmPurchasePoint = () => {
    // reset error and open modal confirm
    setHasError(false)
    setIsShowPurchasePointModal(true)
  }

  const deleteCard = (card): void => {
    setDeletedCard(card)
    // reset error and open modal confirm
    setHasError(false)
    setIsShowDeleteCardModal(true)
  }

  const handlePurchasePoint = (): void => {
    // purchase point use new card
    if (selectedCardId === '') {
      resetErrorMess()
      const Multipayment = window.Multipayment
      Multipayment.init(purchasePointInfo.GMO_SHOP_ID)
      setIsPurchasingPoint(true)
      Multipayment.getToken(
        {
          cardno: values.card_number.replace(/\s/g, ''),
          // send expire date with format year + month
          expire: values.card_expire_date.slice(-2) + values.card_expire_date.substring(0, 2),
          securitycode: values.card_cvc,
          holdername: values.card_name,
          tokennumber: '1',
        },
        (response) => {
          if (response.resultCode == '000') {
            purchasePointUseNewCard({
              token: response.tokenObject.token[0],
              point: selectedPoint,
              card_type: detectCardType(values.card_number),
              is_save_card: values.is_saved_card,
            })
          } else {
            setHasError(true)
            setIsPurchasingPoint(false)
          }
        }
      )
    } else {
      // purchase point use saved card
      purchasePointUseOldCard({
        card_seq: selectedCardId,
        point: selectedPoint,
      })
    }
  }

  const handleChangeCardNumber = (e) => {
    const card_number = e.target.value.replace(/\s/g, '')
    // replace space and check is numeric
    if (/^[0-9]+$/g.test(card_number) || !e.target.value) {
      setSelectedCardId('')
      if (card_number.length <= 16) {
        setFieldValue('card_number', formatCardNumber(e.target.value))
      }
    }
  }

  const handleChangeCardExpireDate = (e) => {
    // replace space and slash and check is numeric
    let card_expire_date = e.target.value.replace(/[\s/]/g, '')
    if (/^[0-9]+$/g.test(card_expire_date) || !e.target.value) {
      setSelectedCardId('')
      if (card_expire_date.length <= 4) {
        // only add slash after second element
        if (card_expire_date.length >= 3) card_expire_date = card_expire_date.match(new RegExp('.{1,2}', 'g')).join(' / ')
        setFieldValue('card_expire_date', card_expire_date)
      }
    }
  }

  const handleChangeCardCvc = (e) => {
    const card_cvc = e.target.value
    // check is numeric
    if (/^[0-9]+$/g.test(card_cvc) || !card_cvc) {
      setSelectedCardId('')
      if (card_cvc.length <= 4) {
        setFieldValue('card_cvc', card_cvc)
      }
    }
  }

  const changeFieldAndResetSelectedCardId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedCardId('')
    handleChange(e)
  }

  return (
    <Box>
      <Box className={classes.title}>
        <ESLabel label={t('purchase_point_tab.purchase_goods')} />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className={classes.container}>
          <Box className={classes.wrap_point}>
            <Typography className={classes.point}>{FormatHelper.currencyFormat(selectedPoint.toString())}</Typography>
            <Typography className={classes.exe_point}>{t('common.eXe_points')}</Typography>
          </Box>
          <Box className={classes.wrap_money}>
            <Typography className={classes.money}>
              {FormatHelper.currencyFormat(calValueFromTax(selectedPoint).toString())}
              {t('common.money_included_tax')}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.title}>
          <ESLabel label={t('purchase_history.payment_method')} />
        </Box>
        <Box className={classes.card_info_wrap}>
          <Box className={classes.card_wrap + ' ' + classes.first_card_wrap}>
            <Box className={classes.card_info_title}>{t('purchase_point_tab.card_info_title')}</Box>
            <Box className={classes.card_info_container}>
              <Box>
                <ESInput
                  id="card_name"
                  name="card_name"
                  required={true}
                  value={values.card_name}
                  placeholder={t('purchase_point_tab.card_name_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_name')}
                  fullWidth
                  onChange={changeFieldAndResetSelectedCardId}
                  onBlur={handleBlur}
                  helperText={touched.card_name && errors?.card_name}
                  error={touched.card_name && !!errors?.card_name}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_number"
                  name="card_number"
                  required={true}
                  value={values.card_number}
                  placeholder={t('purchase_point_tab.card_number_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_number')}
                  fullWidth
                  onChange={handleChangeCardNumber}
                  onBlur={handleBlur}
                  helperText={touched.card_number && errors?.card_number}
                  error={touched.card_number && !!errors?.card_number}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_expire_date"
                  name="card_expire_date"
                  required={true}
                  value={values.card_expire_date}
                  placeholder={t('purchase_point_tab.card_expire_date_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_expire_date')}
                  fullWidth
                  onChange={handleChangeCardExpireDate}
                  onBlur={handleBlur}
                  helperText={touched.card_expire_date && errors?.card_expire_date}
                  error={touched.card_expire_date && !!errors?.card_expire_date}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_cvc"
                  name="card_cvc"
                  required={true}
                  value={values.card_cvc}
                  placeholder=""
                  labelPrimary={t('purchase_point_tab.card_cvc')}
                  fullWidth
                  onChange={handleChangeCardCvc}
                  onBlur={handleBlur}
                  helperText={touched.card_cvc && errors?.card_cvc}
                  error={touched.card_cvc && !!errors?.card_cvc}
                  size="big"
                />
              </Box>
              <Box className={classes.toggle} pt={2}>
                <ESSwitchIOS
                  key={'is_saved_card'}
                  handleChange={changeFieldAndResetSelectedCardId}
                  name={'is_saved_card'}
                  checked={values.is_saved_card}
                />
                <Box>
                  <Box className={classes.toggle_name}>{t('purchase_point_tab.register_toggle_name')}</Box>
                  {isExceedCard && <Box className={classes.mess_exceed_card}>{t('purchase_point_tab.mess_exceed_card')}</Box>}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.card_wrap}>
            <Box className={classes.card_info_title}>{t('purchase_point_tab.card_title')}</Box>
            <Box className={classes.card_info_container + ' ' + classes.second_card_info_container}>
              <Box className={classes.wrap_all_cards} style={purchasePointInfo.saved_cards.length >= 3 ? { height: 288 } : null}>
                {purchasePointInfo.saved_cards.map((card, key) => {
                  return (
                    <>
                      <Box className={classes.wrap_all_card}>
                        <Box className={classes.wrap_check_box}>
                          <CustomRadio
                            checked={selectedCardId === Number(card.card_seq)}
                            onChange={(e) => {
                              resetForm()
                              setSelectedCardId(Number(e.target.value))
                            }}
                            value={card.card_seq}
                            name="radio-button"
                            size="small"
                          />
                        </Box>
                        <Box>
                          <Box className={classes.wrap_card_number}>{formatCardNumber(card.card_number.replace(/\*/g, 'x'))}</Box>
                        </Box>
                      </Box>
                      <Box textAlign="right">
                        <Box
                          className={
                            classes.title_delete_card +
                            ' ' +
                            (key + 1 === purchasePointInfo.saved_cards.length ? classes.last_title_delete_card : '')
                          }
                          onClick={() => deleteCard(card)}
                        >
                          {t('purchase_point_tab.title_delete_card')}
                        </Box>
                      </Box>
                    </>
                  )
                })}
              </Box>
              {purchasePointInfo.saved_cards.length === 0 ? (
                <Box className={classes.wrap_all_card + ' ' + classes.wrap_no_card}>{t('purchase_point_tab.no_card')}</Box>
              ) : (
                <Box textAlign="center" pb={1}>
                  <ESButton
                    onClick={() => {
                      setSelectedCardId('')
                      validateForm()
                    }}
                    className={classes.clear_section_btn}
                    variant="outlined"
                    round
                    fullWidth
                    size="large"
                  >
                    {t('purchase_point_tab.clear_section')}
                  </ESButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </form>
      <Box pb={3} pt={2} justifyContent="center" display="flex" className={classes.actionButton}>
        <ButtonPrimary
          // disable button if has error when use new card and no use old card
          disabled={(!_.isEmpty(errors) && selectedCardId === '') || isExceedCard}
          type="submit"
          round
          fullWidth
          onClick={confirmPurchasePoint}
        >
          {t('purchase_point_tab.btn_buy')}
        </ButtonPrimary>
      </Box>
      {isShowPurchasePointModal && (
        <PointPurchaseConfirmModal
          errorMess={purchasePointInfo.mess_error_purchase_point}
          isLoading={isLoading}
          handlePurchasePoint={handlePurchasePoint}
          open={isShowPurchasePointModal}
          selectedPoint={selectedPoint}
          hasError={hasError}
          handleClose={() => {
            setIsShowPurchasePointModal(false)
          }}
        />
      )}
      {isShowDeleteCardModal && (
        <CardDeleteConfirmModal
          isLoading={isLoading}
          deleteSavedCard={deleteSavedCard}
          deletedCard={deletedCard}
          open={isShowDeleteCardModal}
          hasError={hasError}
          handleClose={() => {
            setIsShowDeleteCardModal(false)
          }}
        />
      )}
      {metaSavedCardsMeta.pending && <ESLoader open={metaSavedCardsMeta.pending} />}
    </Box>
  )
}

export default Step2

const CustomRadio = withStyles({
  root: {
    color: Colors.white_opacity[30],
    background: '#212121',
    padding: 0,
    '&$checked': {
      color: Colors.primary,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
  title: {
    // paddingLeft: 24,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 28,
    color: Colors.white_opacity['70'],
    paddingBottom: 16,
  },
  container: {
    height: 38,
    width: 366,
    backgroundColor: Colors.black,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity['30'],
    alignItems: 'center',
    color: '#4D4D4D',
    padding: '0 9px 0 0',
  },
  actionButton: {
    '& .MuiButtonBase-root.button-primary.full-width': {
      width: 220,
    },
  },
  wrap_point: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  point: {
    paddingLeft: 16,
    fontSize: 18,
    color: Colors.white_opacity['70'],
    width: 110,
  },
  exe_point: {
    fontSize: 12,
  },
  wrap_money: {},
  money: {
    fontSize: 12,
  },
  card_info_title: {
    color: Colors.white_opacity[30],
    paddingBottom: '16px',
  },
  card_info_wrap: {
    display: 'flex',
    fontSize: '14px',
    flex: 1,
  },
  card_wrap: {
    width: '50%',
  },
  first_card_wrap: {
    paddingRight: 28,
  },
  card_info_container: {
    borderRadius: 4,
    background: '#4D4D4D',
    padding: '16px 40px 16px 16px',
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
  },
  toggle_name: {
    fontSize: '12px',
    color: Colors.white,
    paddingLeft: 16,
  },
  mess_exceed_card: {
    fontSize: '12px',
    color: '#F7F735',
    paddingLeft: 16,
  },
  second_card_info_container: {
    padding: '16px 0 16px 16px',
  },
  wrap_all_card: {
    borderRadius: 4,
    background: '#000',
    display: 'flex',
    padding: '16px',
    alignItems: 'center',
    '& .MuiCheckbox-root': {
      marginRight: 27,
      marginTop: 15,
    },
    '& .MuiIconButton-label span': {
      borderRadius: '50%',
    },
  },
  wrap_no_card: {
    padding: 16,
    height: '100%',
    marginRight: '16px',
  },
  wrap_card_number: {
    fontSize: '14px',
    color: Colors.white_opacity[30],
  },
  title_delete_card: {
    fontSize: '10px',
    color: '#FF4786',
    marginTop: 8,
    marginBottom: 22,
    cursor: 'pointer',
    display: 'inline-block',
  },
  last_title_delete_card: {
    marginBottom: 17,
  },
  clear_section_btn: {
    width: 108,
    height: 36,
    fontSize: '14px',
    padding: 0,
    color: Colors.white,
    borderColor: Colors.white,
  },
  wrap_check_box: {
    marginRight: '24px',
    display: 'flex',
  },
  wrap_all_cards: {
    height: 'auto',
    overflow: 'auto',
    paddingRight: '16px',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgb(0 0 0)',
      borderRadius: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#898989',
      borderRadius: 6,
    },
  },
  [theme.breakpoints.down('lg')]: {
    card_info_wrap: {
      flexWrap: 'wrap',
      paddingRight: 0,
    },
    card_wrap: {
      width: '100%',
      paddingRight: 0,
      marginBottom: 24,
    },
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      width: '100%',
    },
    point: {
      width: 100,
    },
    card_info_container: {
      '& label': {
        fontSize: 15,
      },
    },
  },
}))
