import ESButton from '@components/Button'
import ESTable from '@components/Table'
import Pagination from '@containers/Community/Partials/Pagination'
import { Box, makeStyles, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'

import { Colors } from '@theme/colors'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const rows = [1, 2, 3, 4, 5]

const DetailReport: React.FC = () => {
  // const { t } = useTranslation('common')
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('common')

  const [page, setPage] = useState(10)
  const [count] = useState(10)

  const renderBtnCSV = () =>
    matches ? (
      <ESButton variant={'contained'} className={classes.btnCSV}>
        {t('streaming_gift_report_screen.csv')}
      </ESButton>
    ) : (
      <ESButton variant={'contained'} className={classes.btnCSV}>
        {t('streaming_gift_report_screen.csv_download')}
      </ESButton>
    )

  const renderPagination = () =>
    matches ? <Pagination page={page} pageNumber={2} setPage={setPage} /> : <Pagination page={page} pageNumber={count} setPage={setPage} />

  return (
    <Box mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={2}>
        <Box alignItems="center" width="100%">
          <Box mb={3} display="flex" justifyContent="center">
            {renderPagination()}
          </Box>
        </Box>
        {renderBtnCSV()}
      </Box>
      <ESTable
        classTable={classes.table}
        tableHeader={
          <TableRow className={classes.rowHeader}>
            <TableCell style={{ width: '10%' }} align="center">
              <Typography>{t('streaming_gift_report_screen.no')}</Typography>
            </TableCell>
            <TableCell style={{ width: '20%' }} align="center">
              <Typography> {t('point_management_tab.purchase_date')}</Typography>
            </TableCell>
            <TableCell style={{ width: '20%' }} align="center">
              <Typography> {t('streaming_gift_report_screen.eXeLAB_ID')}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="center">
              <Typography> {t('common.eXe_points')}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="center">
              <Typography> {t('streaming_gift_report_screen.kinds')}</Typography>
            </TableCell>
            <TableCell style={{ width: '20%' }} align="center">
              <Typography> {t('streaming_gift_report_screen.tip_target')}</Typography>
            </TableCell>
          </TableRow>
        }
      >
        {rows.map((row) => (
          <TableRow key={row} className={classes.text}>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2021/11/22_12:41</TableCell>
            <TableCell align="center">@aiueoあいうえお</TableCell>
            <TableCell align="center">100</TableCell>
            <TableCell align="center">チケット</TableCell>
            <TableCell align="center">どりでん</TableCell>
          </TableRow>
        ))}
      </ESTable>
    </Box>
  )
}
export default DetailReport

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    borderCollapse: 'inherit',
  },
  headerTable: {
    background: Colors.black_card,
    borderBottom: 0,
    padding: 5,
    '& tr': {
      '& th': {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        color: Colors.white,
      },
    },
  },
  bodyTable: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    background: '#161616',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    '& tr': {
      '& td': {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        borderBottom: 'none',
      },
    },
  },
  wrapBtn: {
    textAlign: 'right',
  },
  btnCSV: {
    backgroundColor: '#FF4786',
    color: Colors.white,
    '&:hover': {
      color: '#FF4786',
      backgroundColor: Colors.white,
    },
  },
  paginationStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 32,
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
    '& .MuiPaginationItem-ellipsis': {
      borderRadius: 4,
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
  },
  [theme.breakpoints.down('sm')]: {
    rowHeader: {
      '& td': {
        fontSize: 10,
      },
    },
    text: {
      '& td': {
        fontsize: 8,
      },
    },
  },

  [theme.breakpoints.down(961)]: {
    paginationStyle: {
      marginRight: '0px',
    },
  },
  [theme.breakpoints.down(375)]: {
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        fontSize: '11px',
      },
    },
  },
  [theme.breakpoints.down('xs')]: {
    table: {
      width: '150%',
    },
  },
}))
