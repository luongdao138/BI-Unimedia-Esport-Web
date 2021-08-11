import React, { useEffect } from 'react'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import { Link, Box, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import usePurchaseHistoryDetail from '@containers/PurchaseHistory/usePurchaseHistoryDetail'
import _ from 'lodash'
import LinkIcon from '@components/SettingsRowItem/LinkIcon'
import ESButton from '@components/Button'
import { PAYMENT_STATUS } from '@constants/common.constants'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import ButtonPrimary from '@components/ButtonPrimary'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'

const PurchaseDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = React.useState(false)
  const { purchaseHistoryDetail, fetchPurchaseHistoryDetail, clearPurchaseHistoryDetail, cancelPurchase, meta } = usePurchaseHistoryDetail()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (purchaseHistoryDetail.data && purchaseHistoryDetail.data.id) {
      cancelPurchase(`${purchaseHistoryDetail.data.id}`)
    }
    setOpen(false)
  }

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
      display: 'block',
      background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
      width: '100%',
      '&:first-child': {
        padding: theme.spacing(3),
      },
    },
  }))(MuiDialogContent)

  useEffect(() => {
    if (id) {
      fetchPurchaseHistoryDetail(String(id))
    }
    return function () {
      clearPurchaseHistoryDetail()
    }
  }, [router])

  const price = _.get(purchaseHistoryDetail, 'data.attributes.price')
  const tax = _.get(purchaseHistoryDetail, 'data.attributes.tax')

  const purchase_status = _.get(purchaseHistoryDetail, 'data.attributes.status')
  const purchase_datetime = _.get(purchaseHistoryDetail, 'data.attributes.purchase_datetime')
  const cancelled_datetime = _.get(purchaseHistoryDetail, 'data.attributes.cancelled_datetime')
  const cancel_req_datetime = _.get(purchaseHistoryDetail, 'data.attributes.cancel_req_datetime')

  const time = CommonHelper.staticSmartTime(
    purchase_status == PAYMENT_STATUS.PURCHASED
      ? purchase_datetime
      : purchase_status == PAYMENT_STATUS.CANCELLED
      ? cancelled_datetime
      : purchase_status == PAYMENT_STATUS.CANCEL_REQUESTED
      ? cancel_req_datetime
      : purchase_datetime
  )

  const ticket_price = CommonHelper.formatCurrency(price)
  const ticket_tax = CommonHelper.formatCurrency(tax)
  const total = CommonHelper.formatCurrency(price + tax)

  const renderError = () => {
    return (
      !!meta.error && (
        <Box my={4} display="flex" justifyContent="center">
          <Typography color="secondary">{t('common:purchase_history.period_expired')}</Typography>
        </Box>
      )
    )
  }

  return (
    <>
      <HeaderWithButton title={t('common:purchase_history.detail')} />
      {purchaseHistoryDetail !== undefined && purchaseHistoryDetail.data !== undefined ? (
        <div>
          <div>
            <Dialog
              maxWidth={'md'}
              fullWidth
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              BackdropProps={{
                onTouchMove: (e) => {
                  e.preventDefault()
                },
                onTouchStart: (e) => {
                  e.preventDefault()
                },
                onTouchEnd: (e) => {
                  e.preventDefault()
                },
              }}
            >
              <DialogContent>
                <Box className={classes.container}>
                  <Typography className={classes.dialogTitle}>{t('common:purchase_history.cancel_order_title')}</Typography>
                  <Typography className={classes.message} gutterBottom>
                    {t('common:purchase_history.cancel_order_msg')}
                  </Typography>
                </Box>
                <Box className={classes.actionBox}>
                  <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
                    {t('common:purchase_history.dialog_close')}
                  </ButtonPrimary>
                  <ButtonPrimary size="small" className={classes.actionBtnConfirm} onClick={handleSubmit}>
                    {t('common:purchase_history.cancel_submit')}
                  </ButtonPrimary>
                </Box>
              </DialogContent>
            </Dialog>
          </div>
          <Box padding={2} margin={2} className={classes.wrap}>
            <Typography variant={'caption'}>{time}</Typography>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.order_id')}</Typography>
              <Typography>{purchaseHistoryDetail.data.attributes.order_id}</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.vendor')}</Typography>
              <Typography>{purchaseHistoryDetail.data.attributes.vendor_name}</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.status')}</Typography>
              <Typography>
                {purchaseHistoryDetail.data.attributes.status == PAYMENT_STATUS.CANCELLED
                  ? `${t('common:purchase_history.canceled')}`
                  : purchaseHistoryDetail.data.attributes.status == PAYMENT_STATUS.CANCEL_REQUESTED
                  ? `${t('common:purchase_history.cancel_requested')}`
                  : `${t('common:purchase_history.purchased')}`}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.payment_method')}</Typography>
              <Typography>
                {price === 0 ? t('common:purchase_history.payment_type_none') : t('common:purchase_history.payment_type_gmo')}
              </Typography>
            </Box>
            <Box padding={2} my={2} className={classes.detailWrap}>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.item')}</Typography>
                <Typography>{purchaseHistoryDetail.data.attributes.description}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.classification')}</Typography>
                <Typography>{t('common:purchase_history.ticket')}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.unit_price')}</Typography>
                <Typography>{ticket_price}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.quantity')}</Typography>
                <Typography>1</Typography>
              </Box>
            </Box>
            <Box padding={2} my={2} className={classes.detailWrap}>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.total_fee')}</Typography>
                <Typography>{ticket_price}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.tax')}</Typography>
                <Typography>{ticket_tax}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.payment')}</Typography>
                <Typography color="primary">
                  {total}
                  {purchaseHistoryDetail.data.attributes.status == PAYMENT_STATUS.CANCELLED
                    ? `(${t('common:purchase_history.canceled')})`
                    : purchaseHistoryDetail.data.attributes.status == PAYMENT_STATUS.CANCEL_REQUESTED
                    ? `(${t('common:purchase_history.cancel_requested')})`
                    : ''}
                </Typography>
              </Box>
            </Box>
            {purchaseHistoryDetail.data.attributes.is_cancellable &&
              !purchaseHistoryDetail.data.attributes.cancel_req_datetime &&
              !purchaseHistoryDetail.data.attributes.cancelled_datetime && (
                <>
                  {renderError()}
                  <Box my={4} display="flex" justifyContent="center">
                    <ESButton variant="outlined" onClick={handleClickOpen}>
                      {t('common:purchase_history.cancel_request')}
                    </ESButton>
                  </Box>
                </>
              )}
          </Box>
          <Box margin={2} my={4}>
            <Typography className={classes.questionsTitle}>{t('common:purchase_history.questions')}</Typography>
            <Link href="https://support.exelab.jp/hc/ja/articles/900004907626" underline={'none'} target="_blank">
              <Typography className={classes.questions}>
                {t('common:purchase_history.about_purchase_status')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Link>
            <Link href="https://support.exelab.jp/hc/ja/articles/900005549443" underline={'none'} target="_blank">
              <Typography className={classes.questions}>
                {t('common:purchase_history.about_cancellation')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Link>
            <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
              <Typography className={classes.questions}>
                {t('common:purchase_history.help_purchase')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Link>
          </Box>
        </div>
      ) : (
        <span></span>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 56,
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  actionBtnClose: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  actionBtnConfirm: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  wrap: {
    color: Colors.white_opacity[70],
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: Colors.white_opacity[30],
  },
  title: {
    minWidth: 127,
  },
  questionsTitle: {
    fontWeight: 'bold',
    color: Colors.white_opacity[70],
    marginBottom: theme.spacing(2.5),
  },
  questions: {
    display: 'flex',
    color: Colors.white_opacity[70],
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    cursor: 'pointer',
  },
  link: {
    color: Colors.white,
    marginTop: 1,
    marginLeft: 8,
  },
  detailWrap: {
    color: Colors.white_opacity[70],
    backgroundColor: Colors.white_opacity[10],
    borderRadius: 4,
  },
}))

export default PurchaseDetail
