import React, { useState, useEffect } from 'react'
import { paymentMethodList } from '@containers/PointManage/PurchasePoint/Step1'
import Step2 from '@containers/PointManage/PurchasePoint/Step2'
import { Box, Grid, makeStyles } from '@material-ui/core'
import usePurchasePointData from '@containers/PointManage/PurchasePoint/usePurchasePointData'
import usePointsManage from '@containers/PointManage/usePointsManage'
import { addToast } from '@store/common/actions'
import i18n from '@locales/i18n'
import { useAppDispatch } from '@store/hooks'
import ESChip from '@components/Chip'
import { GMO_PAYMENT_TYPE } from '@services/points.service'

declare global {
  interface Window {
    Multipayment: any
  }
}
interface BuyShortagePointsProps {
  lackedPoint?: number
}

const BuyShortagePoints: React.FC<BuyShortagePointsProps> = ({ lackedPoint }) => {
  const [stepSelectPayment, setStepSelectPayment] = useState(0) // 0: payment gmo, 1: is payment credit-card
  const classes = useStyles()

  const { updateNewPurchaseMethodSuccessState, requestMultiPaymentPurchase } = usePurchasePointData()
  const { getMyPointData } = usePointsManage()
  const dispatch = useAppDispatch()

  //TODO:  success thi` .....
  useEffect(() => {
    addEventListener('storage', (event) => {
      if (event?.key === 'reload_point') {
        getMyPointData({ page: 1, limit: 10 })
        updateNewPurchaseMethodSuccessState(true)
        dispatch(addToast(i18n.t('common:purchase_point_tab.mess_purchase_point_success')))
      }
    })
    return () => {
      removeEventListener('storage', () => null)
    }
  }, [])

  const openPurchaseWindow = (payload) => {
    const { access_id, start_url, token } = payload
    window
      .open(
        `../payment_process?url=${encodeURIComponent(start_url)}&AccessID=${encodeURIComponent(access_id)}&Token=${encodeURIComponent(
          token
        )}`,
        '',
        `width=550,height=400,location=no,toolbar=no,status=no,directories=no,menubar=no,scrollbars=yes,resizable=no,centerscreen=yes,chrome=yes`
      )
      ?.focus()
  }

  const handleRequestGMOPaymentSuccess = (payload) => {
    openPurchaseWindow(payload)
  }

  const onClickNext = (type: string) => {
    switch (type) {
      case GMO_PAYMENT_TYPE.D_BARAI:
        requestMultiPaymentPurchase(lackedPoint, type, handleRequestGMOPaymentSuccess)
        break
      case GMO_PAYMENT_TYPE.RAKUTEN:
        requestMultiPaymentPurchase(lackedPoint, type, handleRequestGMOPaymentSuccess)
        break
      case GMO_PAYMENT_TYPE.PAY_PAY:
        requestMultiPaymentPurchase(lackedPoint, type, handleRequestGMOPaymentSuccess)
        break
      default:
        setStepSelectPayment(1)
        break
    }
  }
  return (
    <>
      <Box className={classes.container}>
        {stepSelectPayment === 0 && (
          <Grid container>
            {paymentMethodList.map((i) => {
              return (
                <Grid item xs={12} md={6} key={i.id} className={classes.itemPaymentMethod}>
                  <ESChip
                    key={i.type}
                    isGameList={true}
                    className={classes.paymentMethod}
                    label={i.label}
                    onClick={() => onClickNext(i.type)}
                    icon={
                      <>
                        {i.icon && (
                          <Box
                            className={
                              i.type === GMO_PAYMENT_TYPE.RAKUTEN
                                ? classes.wrapperIconPaymentMethodRakuten
                                : classes.wrapperIconPaymentMethod
                            }
                          >
                            <img className={classes.iconPaymentMethod} src={i.icon} />
                          </Box>
                        )}
                      </>
                    }
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
        {stepSelectPayment === 1 && <Step2 selectedPoint={lackedPoint} />}
      </Box>
    </>
  )
}

export default BuyShortagePoints

const useStyles = makeStyles(() => ({
  container: {},
  itemPaymentMethod: {
    padding: '10px 25px',
  },
  wrapperIconPaymentMethodRakuten: {
    maxWidth: 83,
    maxHeight: 31,
  },
  wrapperIconPaymentMethod: {
    maxWidth: 51,
    maxHeight: 51,
  },
  paymentMethod: {
    width: '100%',
    height: 70,
  },
  iconPaymentMethod: {
    width: '100%',
    height: '100%',
  },
}))
