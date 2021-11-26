import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { Pagination } from '@material-ui/lab'
import { Colors } from '@theme/colors'

const PaymentInfoDetailContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const classes = useStyles()
  const { time } = router.query
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(576))
  const data = [
    {
      date: '2021年7月21日 16:00',
      status: '予定',
      amount: 3000,
      title: 'テキストテキストテキストテキ',
    },
    {
      date: '2021年7月11日 5:00',
      status: '予定',
      amount: 3000,
      title: 'テキストテキストテキストテキ',
    },
    {
      date: '2021年7月5日 16:00',
      status: '予定',
      amount: 3000,
      title: 'テキストテキストテキストテキ',
    },
    {
      date: '2021年7月2日 17:00',
      status: '予定',
      amount: 3000,
      title: 'テキストテキストテキストテキ',
    },
    {
      date: '2021年7月3日 17:00',
      status: '予定',
      amount: 3000,
      title: 'テキストテキストテキストテキ',
    },
  ]

  const getBackTitle = () => {
    return time?.toString() ?? ''
  }

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
          <Typography className={`${classes.rowText} ${classes.statusRow}`}>{t('payment_information_screen.status')}</Typography>
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
        {data.map((item, index) => {
          const backgroundColor = index % 2 === 0 ? '#323232' : '#606060'
          const displayDate = item?.date
          const displayStatus = item?.status
          const displayAmount = `${FormatHelper.currencyFormat(item?.amount.toString())} ${t('common.money')}`
          const displayTitle = item?.title
          const key = item?.date
          return (
            <Box key={key} style={{ backgroundColor }} className={classes.row}>
              <Box className={classes.rowUpper}>
                <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>{displayDate}</Typography>
                {!isMobile && <Typography className={`${classes.rowText} ${classes.streamTitleRow}`}>{displayTitle}</Typography>}
                <Typography className={`${classes.rowText} ${classes.statusRow}`}>{displayStatus}</Typography>
                <Typography className={`${classes.rowText} ${classes.amountOfMoneyRow}`}>{displayAmount}</Typography>
              </Box>
              {isMobile && <Typography className={`${classes.rowText} ${classes.yearMonthRow}`}>{displayTitle}</Typography>}
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

  return (
    <div>
      <HeaderWithButton title={getBackTitle()} />
      {paging()}
      {tableHeader()}
      {tableRow()}
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
    paddingTop: '17px',
    paddingBottom: '17px',
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
    statusRow: {
      marginLeft: '10px',
    },
    yearMonthRow: {
      flex: 1.8,
    },
  },
}))

export default PaymentInfoDetailContainer
