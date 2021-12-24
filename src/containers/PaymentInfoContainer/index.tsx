import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React, { useCallback, useEffect, useState } from 'react'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'
import useFinancialStatement from './useFinancialStatement'
import { FINANCIAL_STATUS_TITLE, FORMAT_TIME_SAFARI, FORMAT_YEAR_MONTH, FORMAT_YEAR_MONTH_FILTER } from '@constants/common.constants'
import ESLoader from '@components/FullScreenLoader'
import { DateHelper } from '@utils/helpers/DateHelper'
import moment from 'moment'

const PaymentInfoContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(576))
  const { financialStatementData, meta_financial_statement, fetchFinancialStatement } = useFinancialStatement()
  const [page, setPage] = useState<number>(1)
  const totalPages = Math.ceil(financialStatementData?.total / 1)
  const data = financialStatementData?.points

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }

  useEffect(() => {
    fetchFinancialStatement({ page: page, limit: 1 })
  }, [page])

  const navigateToDetail = (id) => () => {
    router.push(
      ESRoutes.PAYMENT_INFO_DETAIL.replace(
        /:id/gi,
        DateHelper.formatMonthFinancial(moment(id, FORMAT_TIME_SAFARI).format(FORMAT_TIME_SAFARI))
      )
    )
  }

  const tableHeader = useCallback(() => {
    return (
      <Box className={classes.headerContainer}>
        <Typography className={`${classes.yearMonthRow}`}>{t('payment_information_screen.time')}</Typography>
        <Typography className={`${classes.statusRow}`}>{t('payment_information_screen.status')}</Typography>
        <Typography className={`${classes.amountOfMoney}`}>{t('payment_information_screen.moneyAmount')}</Typography>
      </Box>
    )
  }, [])

  const paging = useCallback(() => {
    return (
      <Box className={classes.paginationContainer}>
        <Pagination
          defaultPage={1}
          page={page}
          count={totalPages}
          variant="outlined"
          shape="rounded"
          className={classes.paginationStyle}
          siblingCount={1}
          size={isMobile ? 'small' : 'medium'}
          onChange={onChangePage}
        />
      </Box>
    )
  }, [page, totalPages])

  const tableRow = useCallback(() => {
    return (
      <Box className={classes.tableContentContainer}>
        {data?.length > 0 &&
          data?.map((item, index) => {
            const backgroundColor = index % 2 === 0 ? '#323232' : '#606060'
            const displayDate = moment(item?.date, FORMAT_TIME_SAFARI).format(FORMAT_YEAR_MONTH)
            const displayStatus =
              item?.date === DateHelper.formatMonth(moment(new Date()).format(FORMAT_YEAR_MONTH_FILTER))
                ? FINANCIAL_STATUS_TITLE.SCHEDULE
                : FINANCIAL_STATUS_TITLE.CONFIRM
            const displayAmount = `${FormatHelper.currencyFormat(item?.point.toString())} ${t('common.money')}`
            return (
              <Box key={item?.date} onClick={navigateToDetail(item?.date)} style={{ backgroundColor }} className={classes.row}>
                <Typography className={`${classes.yearMonthRow}`}>{displayDate}</Typography>
                <Typography className={`${classes.statusRow}`}>{displayStatus}</Typography>
                <Typography className={`${classes.amountOfMoney}`}>{displayAmount}</Typography>
              </Box>
            )
          })}
        {data?.length === 0 && (
          <Box className={classes.tableContentContainer}>
            <Typography component="span">{t('payment_information_screen.no_deposit_information')}</Typography>
          </Box>
        )}
      </Box>
    )
  }, [data])
  return (
    <div style={{ height: '100%' }}>
      <HeaderWithButton title={t('payment_information_screen.title')} />
      {totalPages > 1 && paging()}
      {tableHeader()}
      {tableRow()}
      {totalPages > 1 && paging()}
      <ESLoader open={meta_financial_statement.pending} />
    </div>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  row: {
    cursor: 'pointer',
    padding: '16px',
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
    paddingTop: '24px',
    paddingBottom: '24px',
    marginLeft: '24px',
    marginRight: '24px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '56px',
    paddingRight: '56px',
    position: 'relative',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid #4c4c4c',
  },
  yearMonthRow: {
    flex: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  statusRow: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: '8px',
    marginRight: '8px',
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
    marginTop: '16px',
    marginBottom: '8px',
  },
  [theme.breakpoints.down(576)]: {
    tableContentContainer: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    headerContainer: {
      paddingLeft: '40px',
      paddingRight: '40px',
    },
    row: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    yearMonthRow: {
      flex: 1.5,
    },
    paginationContainer: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
}))

export default PaymentInfoContainer
