import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'

const PaymentInfoContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(576))

  const data = [
    {
      date: '2021年7月',
      status: '予定',
      amount: 3000,
    },
    {
      date: '2021年8月',
      status: '予定',
      amount: 3000,
    },
    {
      date: '2021年9月',
      status: '予定',
      amount: 3000,
    },
    {
      date: '2021年10月',
      status: '予定',
      amount: 3000,
    },
    {
      date: '2021年11月',
      status: '予定',
      amount: 3000,
    },
  ]

  const tableHeader = useCallback(() => {
    return (
      <Box className={classes.headerContainer}>
        <Typography className={`${classes.yearMonthRow}`}>{t('payment_information_screen.time')}</Typography>
        <Typography className={`${classes.statusRow}`}>{t('payment_information_screen.status')}</Typography>
        <Typography className={`${classes.amountOfMoney}`}>{t('payment_information_screen.moneyAmount')}</Typography>
      </Box>
    )
  }, [])

  const navigateToDetail = (id) => () => {
    router.push(ESRoutes.PAYMENT_INFO_DETAIL.replace(/:id/gi, id))
  }

  const paging = useCallback(() => {
    return (
      <Box className={classes.paginationContainer}>
        <Pagination
          defaultPage={1}
          page={1}
          count={10}
          variant="outlined"
          shape="rounded"
          className={classes.paginationStyle}
          siblingCount={1}
          size={isMobile ? 'small' : 'medium'}
        />
      </Box>
    )
  }, [])

  const tableRow = useCallback(() => {
    return (
      <Box className={classes.tableContentContainer}>
        {data.map((item, index) => {
          const backgroundColor = index % 2 === 0 ? '#323232' : '#606060'
          const displayDate = item?.date
          const displayStatus = item?.status
          const displayAmount = `${FormatHelper.currencyFormat(item?.amount.toString())} ${t('common.money')}`
          const key = item?.date
          return (
            <Box key={key} onClick={navigateToDetail(123)} style={{ backgroundColor }} className={classes.row}>
              <Typography className={`${classes.yearMonthRow}`}>{displayDate}</Typography>
              <Typography className={`${classes.statusRow}`}>{displayStatus}</Typography>
              <Typography className={`${classes.amountOfMoney}`}>{displayAmount}</Typography>
            </Box>
          )
        })}
      </Box>
    )
  }, [data])
  return (
    <div>
      <HeaderWithButton title={t('payment_information_screen.title')} />
      {paging()}
      {tableHeader()}
      {tableRow()}
    </div>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  row: {
    cursor: 'pointer',
    paddingTop: '17px',
    paddingBottom: '17px',
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid #707070',
    borderRight: '1px solid #707070',
    '&:first-child': {
      borderTop: '1px solid #707070',
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
    },
    '&:last-child': {
      borderBottom: '1px solid #707070',
      borderBottomRightRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
  },
  tableContentContainer: {
    backgroundColor: '#000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '23px',
    paddingBottom: '28px',
    marginLeft: '24px',
    marginRight: '24px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '40px',
    paddingRight: '24px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid #4c4c4c',
  },
  yearMonthRow: {
    flex: 2,
    paddingLeft: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  statusRow: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: '10px',
    marginRight: '10px',
  },
  amountOfMoney: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  paginationStyle: {
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
      maxWidth: '32px',
      maxHeight: '32px',
      width: 'calc((100vw - 48px) / 15)',
      height: 'calc((100vw - 48px) / 15)',
      minWidth: 'unset',
      minHeight: 'unset',
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '17px',
    marginBottom: '3px',
  },
  [theme.breakpoints.down(576)]: {
    yearMonthRow: {
      flex: 1,
    },
  },
}))

export default PaymentInfoContainer
