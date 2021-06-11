import React, { useEffect } from 'react'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import usePurchaseHistoryDetail from '@containers/PurchaseHistory/usePurchaseHistoryDetail'
import _ from 'lodash'
import LinkIcon from '@components/SettingsRowItem/LinkIcon'
import ESButton from '@components/Button'

interface Props {
  id: any
}

const PurchaseDetail: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { purchaseHistoryDetail, fetchPurchaseHistoryDetail, clearPurchaseHistoryDetail } = usePurchaseHistoryDetail()

  useEffect(() => {
    if (id) {
      fetchPurchaseHistoryDetail(id)
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
          <Box padding={2} margin={2} className={classes.wrap}>
            <Typography variant={'caption'}>{purchase_datetime}</Typography>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.order_id')}</Typography>
              <Typography>{purchaseHistoryDetail.data.attributes.order_id}</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.vendor')}</Typography>
              <Typography>NTTe-Sports</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.status')}</Typography>
              <Typography>購入済み</Typography>
            </Box>
            <Box display="flex">
              <Typography className={classes.title}>{t('common:purchase_history.payment_method')}</Typography>
              <Typography>-</Typography>
            </Box>
            <Box padding={2} my={2} className={classes.detailWrap}>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>アイテム</Typography>
                <Typography>動画配信サービス</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>区分</Typography>
                <Typography>チケット</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>金額</Typography>
                <Typography>¥0</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>数量</Typography>
                <Typography>1</Typography>
              </Box>
            </Box>
            <Box padding={2} my={2} className={classes.detailWrap}>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>合計金額</Typography>
                <Typography>¥0</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>消費税</Typography>
                <Typography>¥0</Typography>
              </Box>
              <Box display="flex" my={1}>
                <Typography className={classes.title}>支払金額</Typography>
                <Typography>¥0</Typography>
              </Box>
            </Box>
            <Box my={4} display="flex" justifyContent="center">
              <ESButton variant="outlined">注文をキャンセル</ESButton>
            </Box>
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
