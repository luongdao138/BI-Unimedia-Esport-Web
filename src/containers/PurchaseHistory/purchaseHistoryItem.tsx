import { Box, makeStyles, Typography } from '@material-ui/core'
import { PurchaseHistory } from '@services/settings.service'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
interface Props {
  data: PurchaseHistory
}
const PurchaseHistoryItem: React.FC<Props> = ({ data }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('common')
  const date = _.get(data.attributes, 'purchase_datetime', +data.attributes.purchase_datetime)
  const time = CommonHelper.staticSmartTime(date)
  return (
    <Box
      padding={2}
      margin={2}
      className={classes.wrap}
      onClick={() => {
        router.push(`${ESRoutes.PURCHASE_HISTORY}/${data.attributes.order_id}`)
      }}
    >
      <Typography variant={'caption'}>{time}</Typography>
      <Box display="flex">
        <Typography className={classes.title}>{t('purchase_history.order_id')}</Typography>
        <Typography>{data.attributes.order_id}</Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.title}>{t('purchase_history.vendor')}</Typography>
        <Typography>{data.attributes.vendor_name}</Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.title}>{t('purchase_history.ticket_name')}</Typography>
        <Typography>{data.attributes.title}</Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.title}>{t('purchase_history.type')}</Typography>
        <Typography>チケット</Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.title}>{t('purchase_history.price')}</Typography>
        <Typography>¥{data.attributes.price}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  wrap: {
    color: Colors.white_opacity[70],
    cursor: 'pointer',
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: Colors.white_opacity[30],
    '&:hover': {
      boxShadow: 'none',
      background: Colors.black_opacity[70],
    },
  },
  title: {
    width: 127,
  },
}))

export default PurchaseHistoryItem
