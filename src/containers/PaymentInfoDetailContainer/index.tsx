import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'
import ESTooltip from '@components/ESTooltip'
import useFinancialStatementDetail from './useFinancialStatementDetail'
import { LIMIT_FINANCIAL_STATEMENT } from '@constants/common.constants'
import { DateHelper } from '@utils/helpers/DateHelper'
import ESLoader from '@components/FullScreenLoader'
import { toNumber } from 'lodash'

const PaymentInfoDetailContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const classes = useStyles()
  const { time } = router.query
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(576))

  const { financialStatementDetailData, meta_financial_statement_detail, fetchFinancialStatementDetail } = useFinancialStatementDetail()
  const [page, setPage] = useState<number>(1)
  const data = financialStatementDetailData?.points
  const totalPages = Math.ceil(financialStatementDetailData?.total / LIMIT_FINANCIAL_STATEMENT)
  const titleHeader = DateHelper.formatMonthFilter(time) + t('payment_information_screen.header_title') ?? ''
  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }

  useEffect(() => {
    fetchFinancialStatementDetail({ page: page, limit: LIMIT_FINANCIAL_STATEMENT, period: DateHelper.formatMonth(time) })
  }, [page, time])

  const tableHeader = useCallback(() => {
    return (
      <Box className={classes.headerContainer}>
        <Box className={classes.rowUpper}>
          <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>{t('payment_information_screen.date_and_time')}</Typography>
          {!isMobile && (
            <Typography className={`${classes.rowText} ${classes.streamTitleRow}`}>
              {t('payment_information_screen.stream_title')}
            </Typography>
          )}
          <Typography className={`${classes.rowText} ${classes.statusRow}`}>
            {t('payment_information_screen.payment_detail_status')}
          </Typography>
          <Typography className={`${classes.rowText} ${classes.amountOfMoneyRow}`}>
            {t('payment_information_screen.moneyAmount')}
          </Typography>
        </Box>
        {isMobile && (
          <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>{t('payment_information_screen.stream_title')}</Typography>
        )}
      </Box>
    )
  }, [isMobile])

  const tableRow = useCallback(() => {
    return (
      <Box className={classes.tableContentContainer}>
        {data?.map((item, index) => {
          const backgroundColor = index % 2 === 0 ? '#323232' : '#606060'
          return (
            <Box key={item?.id.toString()} style={{ backgroundColor }} className={classes.row}>
              <Box className={classes.rowUpper}>
                <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>
                  {DateHelper.formatFullDateTime(item?.created_at)}
                </Typography>
                {!isMobile && (
                  <ESTooltip title={item?.title}>
                    <Typography className={`${classes.rowText} ${classes.streamTitleRow}`}>{item?.title}</Typography>
                  </ESTooltip>
                )}
                <Typography className={`${classes.rowText} ${classes.statusRow}`}>{item?.type}</Typography>
                <Typography className={`${classes.rowText} ${classes.amountOfMoneyRow}`}>
                  {`${FormatHelper.currencyFormat(Math.floor(toNumber(item?.point)).toString())} ${t('common.money')}`}
                </Typography>
              </Box>
              {isMobile && <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>{item?.title}</Typography>}
            </Box>
          )
        })}
      </Box>
    )
  }, [data, isMobile])

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

  return (
    <div>
      <HeaderWithButton title={titleHeader} />
      {totalPages > 1 && paging()}
      {tableHeader()}
      {tableRow()}
      {totalPages > 1 && paging()}
      <ESLoader open={meta_financial_statement_detail.pending} />
    </div>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '40px',
    paddingRight: '24px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid #4c4c4c',
  },
  rowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#FFFFFFB3',
    fontSize: '14px',
  },
  yearMonthRow: {
    flex: 1.2,
    paddingLeft: '16px',
  },
  streamTitleRow: {
    flex: 1.2,
    marginLeft: '10px',
    marginRight: '10px',
  },
  statusRow: {
    flex: 1,
    marginRight: '10px',
  },
  amountOfMoneyRow: {
    flex: 1,
  },
  rowUpper: {
    display: 'flex',
    flexDirection: 'row',
  },
  row: {
    paddingTop: '16px',
    paddingBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
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
    headerContainer: {
      paddingLeft: '32px',
      paddingRight: '32px',
    },
    tableContentContainer: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    statusRow: {},
    yearMonthRow: {
      flex: 1.8,
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    amountOfMoneyRow: {
      paddingRight: '8px',
    },
    paginationContainer: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
}))

export default PaymentInfoDetailContainer
