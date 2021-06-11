import React, { useEffect } from 'react'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import usePurchaseHistoryDetail from '@containers/PurchaseHistory/usePurchaseHistoryDetail'
import _ from 'lodash'
import LinkIcon from '@components/SettingsRowItem/LinkIcon'
import ESButton from '@components/Button'
import { PAYMENT_STATUS } from '@constants/common.constants'
import DialogContainer from '@containers/DialogContainer'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppDispatch } from '@store/hooks'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent'
import { ActionButtons } from '@store/common/actions/types'
import ButtonPrimary from '@components/ButtonPrimary'


interface Props {
  id: any
}

const PurchaseDetail: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = React.useState(false);
  const { purchaseHistoryDetail, fetchPurchaseHistoryDetail, clearPurchaseHistoryDetail } = usePurchaseHistoryDetail()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      fetchPurchaseHistoryDetail(id)
      // dispatch(showDialog(NG_WORD_DIALOG_CONFIG))
    }
    return function () {
      clearPurchaseHistoryDetail()
    }
  }, [id])

  const purchase_datetime = CommonHelper.staticSmartTime(_.get(purchaseHistoryDetail, 'data.attributes.purchase_datetime', ''))
  return (
    <>
      <HeaderWithButton title={t('common:notification.title')} />
      {purchaseHistoryDetail !== undefined && purchaseHistoryDetail.data !== undefined ? (
        <div>
          <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Open alert dialog
            </Button>
            <Dialog
              maxWidth={'md'}
              fullWidth
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <Box className={classes.container}>
                  <Typography className={classes.dialogTitle}>
                    注文をキャンセルします
                  </Typography>
                  <Typography className={classes.message} gutterBottom>
                    キャンセルを行なった後に再利用する場合は再度ご購入が必要です。
                  </Typography>
                </Box>
                <Box className={classes.actionBox}>
                  <ButtonPrimary size="small" className={classes.actionBtn} gradient={false}>戻る</ButtonPrimary>
                  <ButtonPrimary size="small" className={classes.actionBtn}>キャンセルする</ButtonPrimary>
                </Box>
              </DialogContent>
            </Dialog>
          </div>
          <DialogContainer/>
          <Box padding={2} margin={2} className={classes.wrap}>
            <Typography variant={'caption'}>{purchase_datetime}</Typography>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.order_id')}</Typography>
              <Typography>{purchaseHistoryDetail.data.attributes.order_id}</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.vendor')}</Typography>
              <Typography>{t('common:purchase_history.vendor_name')}</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.status')}</Typography>
              <Typography>
                {purchaseHistoryDetail.data.attributes.history_status == PAYMENT_STATUS.CANCELLED
                  ? `${t('common:purchase_history.canceled')}`
                  : purchaseHistoryDetail.data.attributes.history_status == PAYMENT_STATUS.CANCEL_REQUESTED
                  ? `${t('common:purchase_history.cancel_requested')}`
                  : `${t('common:purchase_history.purchased')}`}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.payment_method')}</Typography>
              <Typography>-</Typography>
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
                <Typography className={classes.title}>{t('common:purchase_history.price')}</Typography>
                <Typography>¥{purchaseHistoryDetail.data.attributes.price}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.quantity')}</Typography>
                <Typography>1</Typography>
              </Box>
            </Box>
            <Box padding={2} my={2} className={classes.detailWrap}>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.total_fee')}</Typography>
                <Typography>¥{purchaseHistoryDetail.data.attributes.price}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.tax')}</Typography>
                <Typography>¥{purchaseHistoryDetail.data.attributes.tax}</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>{t('common:purchase_history.payment')}</Typography>
                <Typography color="primary">
                  ¥{purchaseHistoryDetail.data.attributes.price + purchaseHistoryDetail.data.attributes.tax}
                  {purchaseHistoryDetail.data.attributes.history_status == PAYMENT_STATUS.CANCELLED
                    ? `(${t('common:purchase_history.canceled')})`
                    : purchaseHistoryDetail.data.attributes.history_status == PAYMENT_STATUS.CANCEL_REQUESTED
                    ? `(${t('common:purchase_history.cancel_requested')})`
                    : ''}
                </Typography>
              </Box>
            </Box>
            {purchaseHistoryDetail.data.attributes.is_cancellable &&
            !purchaseHistoryDetail.data.attributes.cancel_req_datetime &&
            !purchaseHistoryDetail.data.attributes.cancelled_datetime && (
            <>
              <Box my={4} display="flex" justifyContent="center">
                <ESButton variant="outlined">{t('common:purchase_history.cancel_request')}</ESButton>
              </Box>
            </>
            )}
          </Box>
          <Box margin={2} my={4}>
            <Typography className={classes.questionsTitle}>{t('common:purchase_history.questions')}</Typography>
            <Box>
              <Typography className={classes.questions}>
                {t('common:purchase_history.about_purchase_status')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.questions}>
                {t('common:purchase_history.about_cancellation')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.questions}>
                {t('common:purchase_history.help_purchase')}{' '}
                <div className={classes.link}>
                  <LinkIcon />
                </div>
              </Typography>
            </Box>
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
    fontWeight: 'bold'
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center'
  },
  actionBtn: {
    width: 200,
    margin: 16
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
    width: 127,
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
